'use client'

import 'maplibre-gl/dist/maplibre-gl.css'
import { Pause, Play, Wind } from 'lucide-react'
import useSWR from 'swr'
import { useEffect, useRef, useState } from 'react'

type Layer = 'wind' | 'rain' | 'temperature' | 'snow' | 'pressure'
type CommunityReport = { id: string; type: string; description: string; latitude: string; longitude: string; photoPathname?: string | null }
const fetcher = (url: string) => fetch(url).then((response) => response.json() as Promise<CommunityReport[]>)

const layerLabels: Record<Layer, string> = { wind: 'Vent', rain: 'Radar', temperature: 'Température', snow: 'Neige', pressure: 'Pression' }

export const RainRadar = ({ latitude = 48.8566, longitude = 2.3522 }: { latitude?: number; longitude?: number }) => {
  const mapNode = useRef<HTMLDivElement>(null)
  const mapRef = useRef<{ remove: () => void; jumpTo: (options: { center: [number, number]; zoom: number }) => void } | null>(null)
  const [layer, setLayer] = useState<Layer>('wind')
  const [offset, setOffset] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    let cancelled = false
    import('maplibre-gl').then((maplibre) => {
      if (cancelled || !mapNode.current) return
      const map = new maplibre.Map({
        container: mapNode.current,
        center: [longitude, latitude],
        zoom: 5,
        attributionControl: false,
        style: { version: 8, sources: { osm: { type: 'raster', tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'], tileSize: 256, attribution: '© OpenStreetMap contributors' } }, layers: [{ id: 'osm', type: 'raster', source: 'osm' }] },
      })
      mapRef.current = map
    })
    return () => { cancelled = true; mapRef.current?.remove(); mapRef.current = null }
  }, [latitude, longitude])

  useEffect(() => {
    if (!playing) return
    const timer = window.setInterval(() => setOffset((value) => value >= 24 ? -3 : value + 1), 900)
    return () => window.clearInterval(timer)
  }, [playing])

  const timeLabel = offset === 0 ? 'Maintenant' : offset > 0 ? `+${offset} h` : `${offset} h`

  return <section aria-label="Carte météo avancée" className="overflow-hidden rounded-2xl border border-cyan-300/15 bg-[#0a1b2a] shadow-2xl shadow-cyan-950/20">
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-3">
      <div><p className="text-sm font-semibold text-white">Carte météo avancée</p><p className="text-xs text-slate-500">MapLibre · couches animées · {timeLabel}</p></div>
      <div className="flex flex-wrap gap-1" role="group" aria-label="Couches météo">{(Object.keys(layerLabels) as Layer[]).map((key) => <button key={key} type="button" aria-pressed={layer === key} onClick={() => setLayer(key)} className={`rounded-lg px-2.5 py-1.5 text-xs transition ${layer === key ? 'bg-cyan-300 text-[#081522]' : 'text-slate-400 hover:bg-white/[0.06] hover:text-white'}`}>{layerLabels[key]}</button>)}</div>
    </div>
    <div className="relative h-72 overflow-hidden">
      <div ref={mapNode} className="absolute inset-0" />
      <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${layer === 'wind' ? 'weather-map__wind' : layer === 'rain' ? 'weather-map__rain' : ''}`} />
      <div className="pointer-events-none absolute bottom-3 left-3 rounded-lg border border-white/10 bg-[#081522]/85 px-3 py-2 text-xs text-slate-300 backdrop-blur">{layer === 'wind' && <><Wind className="mr-1 inline size-3" /> Particules de vent · 12 km/h</>}{layer === 'rain' && 'Radar RainViewer · précipitations'}{layer === 'temperature' && 'Gradient température · 18°C'}{layer === 'snow' && 'Couche neige · 0 cm'}{layer === 'pressure' && 'Isobares · 1015 hPa'}</div>
      <div className="absolute right-3 top-3 rounded-lg border border-white/10 bg-[#081522]/85 px-3 py-2 text-xs text-slate-300 backdrop-blur">Paris · 18°C</div>
    </div>
    <div className="border-t border-white/[0.06] px-4 py-3">
      <div className="flex items-center gap-3"><button type="button" aria-label={playing ? 'Pause animation' : 'Lire animation'} onClick={() => setPlaying((value) => !value)} className="grid size-8 place-items-center rounded-full bg-cyan-300 text-[#081522]">{playing ? <Pause className="size-3" /> : <Play className="ml-0.5 size-3" />}</button><input aria-label="Position temporelle de la carte" type="range" min="-3" max="24" value={offset} onChange={(event) => setOffset(Number(event.target.value))} className="h-1 flex-1 accent-cyan-300" /><span className="w-12 text-right text-xs text-slate-400">{timeLabel}</span></div>
      <div className="mt-2 flex justify-between text-[10px] text-slate-600"><span>-3 h</span><span>Maintenant</span><span>+24 h</span></div>
    </div>
  </section>
}
