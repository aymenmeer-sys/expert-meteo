'use client'

import useSWR from 'swr'
import { useEffect, useRef } from 'react'

type Report = { id: string; type: string; description: string; latitude: string; longitude: string; photoPathname?: string | null }
const fetcher = (url: string) => fetch(url).then((response) => response.json() as Promise<Report[]>)

export const CommunityReportMap = () => {
  const node = useRef<HTMLDivElement>(null)
  const { data } = useSWR('/api/reports', fetcher)
  useEffect(() => {
    let map: { remove: () => void } | undefined
    let cancelled = false
    import('maplibre-gl').then((maplibre) => {
      if (cancelled || !node.current) return
      const instance = new maplibre.Map({ container: node.current, center: [2.35, 48.85], zoom: 4, style: { version: 8, sources: { osm: { type: 'raster', tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'], tileSize: 256 } }, layers: [{ id: 'osm', type: 'raster', source: 'osm' }] } })
      map = instance
      instance.on('load', () => data?.forEach((report) => { const popup = new maplibre.Popup({ offset: 18 }).setHTML(`<strong>${report.type}</strong><p>${report.description.replace(/[<>]/g, '')}</p>${report.photoPathname ? `<img alt="Photo du signalement" src="/api/reports/file?pathname=${encodeURIComponent(report.photoPathname)}" style="max-width:180px" />` : ''}`); new maplibre.Marker({ color: '#fbbf24' }).setLngLat([Number(report.longitude), Number(report.latitude)]).setPopup(popup).addTo(instance) }))
    })
    return () => { cancelled = true; map?.remove() }
  }, [data])
  return <section aria-label="Signalements citoyens" className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a1b2a]"><div className="border-b border-white/10 px-4 py-3"><p className="font-semibold text-white">Observations citoyennes</p><p className="text-xs text-slate-500">Signalements validés par la communauté</p></div><div ref={node} className="h-64" /></section>
}
