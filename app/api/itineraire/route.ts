import { NextResponse } from 'next/server'
import { z } from 'zod'
import { clientKey, limitRequest, tooManyRequests } from '@/lib/rate-limit'
import { fetchJson, readJson } from '@/lib/http'

const inputSchema = z.object({ from: z.string().trim().min(2).max(120), to: z.string().trim().min(2).max(120) })
type Place = { lat: string; lon: string; display_name: string }
type Osrm = { routes?: Array<{ distance: number; duration: number; geometry: { coordinates: [number, number][] } }> }
const headers = { 'user-agent': 'MeteoExpert/3.0 (+https://expert-meteo.vercel.app)' }
const geocode = (q: string) => fetchJson<Place[]>(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(q)}`, { headers, next: { revalidate: 86400 } })

export async function POST(request: Request) {
  const rate = await limitRequest(`route:${clientKey(request)}`)
  if (!rate.success) return tooManyRequests(rate)
  const parsed = inputSchema.safeParse(await readJson(request))
  if (!parsed.success) return NextResponse.json({ error: 'Départ et arrivée requis' }, { status: 400 })
  try {
    const [[from], [to]] = await Promise.all([geocode(parsed.data.from), geocode(parsed.data.to)])
    if (!from || !to) return NextResponse.json({ error: 'Lieu introuvable' }, { status: 404 })
    const route = await fetchJson<Osrm>(`https://router.project-osrm.org/route/v1/driving/${from.lon},${from.lat};${to.lon},${to.lat}?overview=full&geometries=geojson`, {}, 12000)
    const firstRoute = route.routes?.[0]
    if (!firstRoute) return NextResponse.json({ error: 'Itinéraire indisponible' }, { status: 502 })
    const coords = firstRoute.geometry.coordinates
    const stride = Math.max(1, Math.floor(coords.length / 8))
    const steps = coords.filter((_, index) => index % stride === 0).slice(0, 8).map(([longitude, latitude], index, all) => ({ index, latitude, longitude, etaMinutes: Math.round((firstRoute.duration / 60) * index / Math.max(1, all.length - 1)) }))
    return NextResponse.json({ from, to, distanceKm: Math.round(firstRoute.distance / 100) / 10, durationMinutes: Math.round(firstRoute.duration / 60), geometry: firstRoute.geometry, steps })
  } catch {
    return NextResponse.json({ error: 'Service d’itinéraire indisponible' }, { status: 502 })
  }
}
