import { NextRequest, NextResponse } from 'next/server'
import { logEvent } from '@/lib/observability'
import { limitRequest } from '@/lib/rate-limit'

const geocodeUrl = 'https://geocoding-api.open-meteo.com/v1/search'
const forecastUrl = 'https://api.open-meteo.com/v1/forecast'

export async function GET(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const rate = await limitRequest(`weather:${forwardedFor}`)
  if (!rate.success) return NextResponse.json({ error: 'Trop de requêtes, réessayez dans un instant.' }, { status: 429, headers: { 'Retry-After': String(Math.max(1, Math.ceil(((rate.reset ?? Date.now()) - Date.now()) / 1000))) } })
  const city = request.nextUrl.searchParams.get('city')?.trim() || 'Paris'
  logEvent('weather.request', { city: city.slice(0, 80), method: request.method })
  const modelParam = request.nextUrl.searchParams.get('model') || 'best_match'
  const model = ['best_match', 'gfs_seamless', 'ecmwf_ifs025', 'icon_seamless'].includes(modelParam) ? modelParam : 'best_match'
  let place: { name: string; country: string; latitude: number; longitude: number } | undefined
  try {
    const geoResponse = await fetch(`${geocodeUrl}?name=${encodeURIComponent(city)}&count=1&language=fr&format=json`, { next: { revalidate: 900 }, signal: AbortSignal.timeout(8000) })
    if (geoResponse.ok) {
      const geo = await geoResponse.json()
      place = geo.results?.[0]
    }
  } catch {
    if (city.toLowerCase() === 'paris') place = { name: 'Paris', country: 'France', latitude: 48.8566, longitude: 2.3522 }
  }
  if (!place) return NextResponse.json({ error: 'Ville introuvable' }, { status: 404 })
  let response: Response
  try {
    response = await fetch(`${forecastUrl}?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_gusts_10m,surface_pressure,visibility,dew_point_2m,cloud_cover&hourly=temperature_2m,precipitation_probability,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,sunrise,sunset,uv_index_max&past_days=7&timezone=auto&forecast_days=30&models=${model}`, { next: { revalidate: 900 }, signal: AbortSignal.timeout(12000) })
  } catch {
    return NextResponse.json({ error: 'Service météo indisponible' }, { status: 502 })
  }
  if (!response.ok) return NextResponse.json({ error: 'Service météo indisponible' }, { status: 502 })
  const weather = await response.json()
  const airResponse = await fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${place.latitude}&longitude=${place.longitude}&current=european_aqi,pm2_5,pm10,ozone,nitrogen_dioxide&timezone=auto`, { next: { revalidate: 1800 } })
  const air = airResponse.ok ? await airResponse.json() : null
  return NextResponse.json({ place: { name: place.name, country: place.country, latitude: place.latitude, longitude: place.longitude }, air: air?.current ?? null, ...weather })
}
