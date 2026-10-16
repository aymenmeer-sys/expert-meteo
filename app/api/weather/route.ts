import { NextRequest, NextResponse } from 'next/server'

const geocodeUrl = 'https://geocoding-api.open-meteo.com/v1/search'
const forecastUrl = 'https://api.open-meteo.com/v1/forecast'

export async function GET(request: NextRequest) {
  const city = request.nextUrl.searchParams.get('city')?.trim() || 'Paris'
  const geoResponse = await fetch(`${geocodeUrl}?name=${encodeURIComponent(city)}&count=1&language=fr&format=json`, { next: { revalidate: 900 } })
  if (!geoResponse.ok) return NextResponse.json({ error: 'Ville introuvable' }, { status: 404 })
  const geo = await geoResponse.json()
  const place = geo.results?.[0]
  if (!place) return NextResponse.json({ error: 'Ville introuvable' }, { status: 404 })
  const response = await fetch(`${forecastUrl}?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,surface_pressure&hourly=temperature_2m,precipitation_probability,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset&timezone=auto&forecast_days=7`, { next: { revalidate: 900 } })
  if (!response.ok) return NextResponse.json({ error: 'Service météo indisponible' }, { status: 502 })
  const weather = await response.json()
  return NextResponse.json({ place: { name: place.name, country: place.country, latitude: place.latitude, longitude: place.longitude }, ...weather })
}
