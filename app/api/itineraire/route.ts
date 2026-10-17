import { NextResponse } from 'next/server'
import { z } from 'zod'

const inputSchema = z.object({ from: z.string().min(2), to: z.string().min(2) })

export async function POST(request: Request) {
  const parsed = inputSchema.safeParse(await request.json())
  if (!parsed.success) return NextResponse.json({ error: 'Départ et arrivée requis' }, { status: 400 })
  const [fromResponse, toResponse] = await Promise.all([fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(parsed.data.from)}`, { headers: { 'user-agent': 'MeteoExpert/3.0' } }), fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(parsed.data.to)}`, { headers: { 'user-agent': 'MeteoExpert/3.0' } })])
  const [from] = await fromResponse.json() as Array<{ lat: string; lon: string; display_name: string }>
  const [to] = await toResponse.json() as Array<{ lat: string; lon: string; display_name: string }>
  if (!from || !to) return NextResponse.json({ error: 'Lieu introuvable' }, { status: 404 })
  const routeResponse = await fetch(`https://router.project-osrm.org/route/v1/driving/${from.lon},${from.lat};${to.lon},${to.lat}?overview=full&geometries=geojson`)
  const route = await routeResponse.json() as { routes?: Array<{ distance: number; duration: number; geometry: { coordinates: [number, number][] } }> }
  const firstRoute = route.routes?.[0]
  if (!firstRoute) return NextResponse.json({ error: 'Itinéraire indisponible' }, { status: 502 })
  const steps = firstRoute.geometry.coordinates.filter((_, index) => index % Math.max(1, Math.floor(firstRoute.geometry.coordinates.length / 8)) === 0).slice(0, 8).map(([longitude, latitude], index) => ({ index, latitude, longitude, etaMinutes: Math.round((firstRoute.duration / 60) * index / 7) }))
  return NextResponse.json({ from, to, distanceKm: Math.round(firstRoute.distance / 100) / 10, durationMinutes: Math.round(firstRoute.duration / 60), geometry: firstRoute.geometry, steps })
}
