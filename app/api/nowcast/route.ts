import { NextRequest, NextResponse } from 'next/server'

export const revalidate = 300

export async function GET(request: NextRequest) {
  const latitude = Number(request.nextUrl.searchParams.get('lat') ?? 48.8566)
  const longitude = Number(request.nextUrl.searchParams.get('lon') ?? 2.3522)
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude) || latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) return NextResponse.json({ error: 'Coordonnées invalides' }, { status: 400 })
  const params = new URLSearchParams({ latitude: String(latitude), longitude: String(longitude), minutely_15: 'precipitation,precipitation_probability,rain,showers,snowfall', forecast_minutely_15: '8', timezone: 'auto' })
  try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`, { next: { revalidate: 300 } })
    if (!response.ok) return NextResponse.json({ error: 'Nowcast indisponible' }, { status: 502 })
    const payload = await response.json()
    return NextResponse.json({ timezone: payload.timezone, times: payload.minutely_15?.time ?? [], precipitation: payload.minutely_15?.precipitation ?? [], probability: payload.minutely_15?.precipitation_probability ?? [], rain: payload.minutely_15?.rain ?? [], showers: payload.minutely_15?.showers ?? [], snowfall: payload.minutely_15?.snowfall ?? [] })
  } catch { return NextResponse.json({ error: 'Nowcast indisponible' }, { status: 503 }) }
}
