import { NextResponse } from 'next/server'

export async function GET() {
  const response = await fetch('https://api.rainviewer.com/public/weather-maps.json', { next: { revalidate: 600 } })
  if (!response.ok) return NextResponse.json({ error: 'Radar indisponible' }, { status: 502 })
  const data = await response.json()
  const host = data.host
  const latest = data.radar?.past?.at(-1)
  return NextResponse.json({ host, path: latest?.path ?? null, generated: latest?.time ?? null })
}
