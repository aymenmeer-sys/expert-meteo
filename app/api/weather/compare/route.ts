import { NextResponse } from 'next/server'
import { clientKey, limitRequest, tooManyRequests } from '@/lib/rate-limit'
import { fetchJson } from '@/lib/http'

const models = ['best_match', 'ecmwf_ifs025', 'gfs_seamless', 'icon_seamless'] as const

export const GET = async (request: Request) => {
  const rate = await limitRequest(`compare:${clientKey(request)}`)
  if (!rate.success) return tooManyRequests(rate)
  const url = new URL(request.url)
  const cities = (url.searchParams.get('cities') || 'Paris,Lyon,Bordeaux').split(',').map((city) => city.trim().slice(0, 80)).filter(Boolean).slice(0, 4)
  const results = await Promise.all(cities.map(async (city) => {
    try {
      const geo = await fetchJson<{ results?: Array<{ name: string; latitude: number; longitude: number }> }>(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=fr&format=json`, { next: { revalidate: 86400 } })
      const place = geo.results?.[0]
      if (!place) return { city, models: [] }
      const values = await Promise.all(models.map(async (model) => {
        try {
          const data = await fetchJson<{ current?: { temperature_2m?: number } }>(`https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m&models=${model}&timezone=auto`, { next: { revalidate: 900 } })
          return { model, temperature: data.current?.temperature_2m ?? null }
        } catch { return { model, temperature: null } }
      }))
      return { city: place.name, models: values }
    } catch { return { city, models: [] } }
  }))
  return NextResponse.json({ cities: results })
}
