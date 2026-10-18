import { NextResponse } from 'next/server'
import { z } from 'zod'
import { clientKey, limitRequest, tooManyRequests } from '@/lib/rate-limit'

const querySchema = z.object({ latitude: z.coerce.number().min(-90).max(90), longitude: z.coerce.number().min(-180).max(180) })

export const revalidate = 86400

export async function GET(request: Request) {
  const rate = await limitRequest(`climate:${clientKey(request)}`)
  if (!rate.success) return tooManyRequests(rate)
  const parsed = querySchema.safeParse(Object.fromEntries(new URL(request.url).searchParams))
  if (!parsed.success) return NextResponse.json({ error: 'Coordonnées invalides' }, { status: 400 })
  const end = new Date(); const start = new Date(end); start.setUTCFullYear(end.getUTCFullYear() - 50)
  const params = new URLSearchParams({ latitude: String(parsed.data.latitude), longitude: String(parsed.data.longitude), start_date: start.toISOString().slice(0, 10), end_date: end.toISOString().slice(0, 10), daily: 'temperature_2m_mean', timezone: 'auto' })
  let response: Response
  try { response = await fetch(`https://archive-api.open-meteo.com/v1/archive?${params}`, { next: { revalidate: 86400 }, signal: AbortSignal.timeout(20000) }) } catch { return NextResponse.json({ error: 'Historique indisponible' }, { status: 502 }) }
  if (!response.ok) return NextResponse.json({ error: 'Historique indisponible' }, { status: 502 })
  const data = await response.json() as { daily?: { time: string[]; temperature_2m_mean: Array<number | null> } }
  const buckets = new Map<number, number[]>()
  data.daily?.time.forEach((date, index) => { const year = Number(date.slice(0, 4)); const value = data.daily?.temperature_2m_mean[index]; if (typeof value === 'number') buckets.set(year, [...(buckets.get(year) ?? []), value]) })
  const history = [...buckets.entries()].map(([year, values]) => ({ year, average: Math.round(values.reduce((sum, value) => sum + value, 0) / values.length * 10) / 10 }))
  return NextResponse.json({ history })
}
