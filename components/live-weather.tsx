'use client'

import useSWR from 'swr'

const fetcher = async (url: string) => {
  const response = await fetch(url)
  const payload = await response.json()
  if (!response.ok || payload.error) throw new Error(payload.error || 'Weather request failed')
  return payload
}

export function LiveWeather({ city }: { city: string }) {
  const { data, error, isLoading } = useSWR(`/api/weather?city=${encodeURIComponent(city.split(',')[0])}`, fetcher, { refreshInterval: 900000 })
  if (isLoading) return <span role="status" aria-live="polite" className="text-xs text-slate-500">Synchronisation météo…</span>
  if (error || data?.error) return <span role="status" aria-live="assertive" className="text-xs text-rose-300">Données indisponibles</span>
  return <span role="status" aria-live="polite" className="text-xs text-emerald-300">Données réelles · {Math.round(data.current.temperature_2m)}°C</span>
}
