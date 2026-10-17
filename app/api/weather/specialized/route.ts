import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const latitude = Number(request.nextUrl.searchParams.get('latitude'))
  const longitude = Number(request.nextUrl.searchParams.get('longitude'))
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return NextResponse.json({ error: 'Coordonnées invalides' }, { status: 400 })
  const params = `latitude=${latitude}&longitude=${longitude}&timezone=auto`
  const [marineResponse, pollenResponse, forecastResponse] = await Promise.all([
    fetch(`https://marine-api.open-meteo.com/v1/marine?${params}&current=wave_height,wave_direction,wave_period,wind_wave_height&hourly=wave_height,wave_period`, { next: { revalidate: 900 } }),
    fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?${params}&current=alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen`, { next: { revalidate: 1800 } }),
    fetch(`https://api.open-meteo.com/v1/forecast?${params}&current=wind_speed_10m,wind_gusts_10m,precipitation,relative_humidity_2m&hourly=precipitation,wind_speed_10m,soil_moisture_0_to_1cm,freezing_level_height,snowfall`, { next: { revalidate: 900 } }),
  ])
  const marine = marineResponse.ok ? await marineResponse.json() : null
  const pollen = pollenResponse.ok ? await pollenResponse.json() : null
  const forecast = forecastResponse.ok ? await forecastResponse.json() : null
  return NextResponse.json({ marine: marine?.current ?? null, pollen: pollen?.current ?? null, agriculture: { current: forecast?.current ?? null, hourly: forecast?.hourly ?? null } })
}
