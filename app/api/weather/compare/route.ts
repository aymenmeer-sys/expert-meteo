import { NextResponse } from 'next/server'

const models = ['best_match', 'ecmwf_ifs025', 'gfs_seamless', 'icon_seamless'] as const

export const GET = async (request: Request) => {
  const url = new URL(request.url)
  const cities = (url.searchParams.get('cities') || 'Paris,Lyon,Bordeaux').split(',').map((city) => city.trim()).filter(Boolean).slice(0, 4)
  const results = await Promise.all(cities.map(async (city) => {
    const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=fr&format=json`)
    const geo = await geoResponse.json() as { results?: Array<{ name: string; latitude: number; longitude: number }> }
    const place = geo.results?.[0]
    if (!place) return { city, models: [] }
    const values = await Promise.all(models.map(async (model) => {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m&models=${model}&timezone=auto`, { next: { revalidate: 900 } })
      const data = await response.json() as { current?: { temperature_2m?: number } }
      return { model, temperature: data.current?.temperature_2m ?? null }
    }))
    return { city: place.name, models: values }
  }))
  return NextResponse.json({ cities: results })
}
