import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch('https://api.rainviewer.com/public/weather-maps.json', { next: { revalidate: 600 }, signal: AbortSignal.timeout(6000) })
    if (!response.ok) return NextResponse.json({ error: 'Radar indisponible' }, { status: 502 })
    const data = await response.json()
    const latest = data.radar?.past?.at(-1)
    return NextResponse.json({ host: data.host, path: latest?.path ?? null, generated: latest?.time ?? null })
  } catch {
    return NextResponse.json({ error: 'Radar indisponible' }, { status: 502 })
  }
}
