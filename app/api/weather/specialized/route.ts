import { NextRequest, NextResponse } from 'next/server'
import { clientKey, limitRequest, tooManyRequests } from '@/lib/rate-limit'

const parseCoord = (value: string | null) => (value === null || value.trim() === '' ? NaN : Number(value))
const safe = async (url: string, revalidate: number) => {
  try {
    const response = await fetch(url, { next: { revalidate }, signal: AbortSignal.timeout(8000) })
    return response.ok ? await response.json() : null
  } catch { return null }
}

export async function GET(request: NextRequest) {
  const rate = await limitRequest(`specialized:${clientKey(request)}`)
  if (!rate.success) return tooManyRequests(rate)
  const latitude = parseCoord(request.nextUrl.searchParams.get('latitude'))
  const longitude = parseCoord(request.nextUrl.searchParams.get('longitude'))
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude) || latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) return NextResponse.json({ error: 'Coordonnées invalides' }, { status: 400 })
  const params = `latitude=${latitude}&longitude=${longitude}&timezone=auto`
  const [marine, pollen, forecast] = await Promise.all([
    safe(`https://marine-api.open-meteo.com/v1/marine?${params}&current=wave_height,wave_direction,wave_period,wind_wave_height&hourly=wave_height,wave_period`, 900),
    safe(`https://air-quality-api.open-meteo.com/v1/air-quality?${params}&current=alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen`, 1800),
    safe(`https://api.open-meteo.com/v1/forecast?${params}&current=wind_speed_10m,wind_gusts_10m,precipitation,relative_humidity_2m&hourly=precipitation,wind_speed_10m,soil_moisture_0_to_1cm,freezing_level_height,snowfall`, 900),
  ])
  if (!marine && !pollen && !forecast) return NextResponse.json({ error: 'Données spécialisées indisponibles' }, { status: 502 })
  return NextResponse.json({ marine: marine?.current ?? null, pollen: pollen?.current ?? null, agriculture: { current: forecast?.current ?? null, hourly: forecast?.hourly ?? null } })
}
