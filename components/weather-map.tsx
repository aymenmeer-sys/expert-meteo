'use client'

import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet'
import { useEffect } from 'react'

function Recenter({ latitude, longitude }: { latitude: number; longitude: number }) {
  const map = useMap()
  useEffect(() => { map.setView([latitude, longitude], 11) }, [latitude, longitude, map])
  return null
}

export function WeatherMap({ latitude = 48.8566, longitude = 2.3522, city = 'Paris' }: { latitude?: number; longitude?: number; city?: string }) {
  return (
    <div className="h-[280px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d2132]" aria-label={`Carte météo de ${city}`}>
      <MapContainer center={[latitude, longitude]} zoom={11} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <CircleMarker center={[latitude, longitude]} radius={14} pathOptions={{ color: '#67e8f9', fillColor: '#22d3ee', fillOpacity: 0.55 }}>
          <Popup>{city} · conditions actuelles</Popup>
        </CircleMarker>
        <Recenter latitude={latitude} longitude={longitude} />
      </MapContainer>
    </div>
  )
}
