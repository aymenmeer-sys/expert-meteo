'use client'

import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((response) => response.json())

export function LiveWeather({ city }: { city: string }) {
  const { data, error, isLoading } = useSWR(`/api/weather?city=${encodeURIComponent(city.split(',')[0])}`, fetcher, { refreshInterval: 900000 })
  if (isLoading) return <span className="text-xs text-slate-500">Synchronisation météo…</span>
  if (error || data?.error) return <span className="text-xs text-rose-300">Données indisponibles</span>
  return <span className="text-xs text-emerald-300">Données réelles · {Math.round(data.current.temperature_2m)}°C</span>
}
