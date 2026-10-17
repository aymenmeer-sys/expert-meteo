'use client'

import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((response) => response.json())

export const NowcastCard = () => {
  const { data, isLoading } = useSWR<{ times?: string[]; probability?: number[]; precipitation?: number[] }>('/api/nowcast?lat=48.8566&lon=2.3522', fetcher, { refreshInterval: 300000 })
  const probabilities = data?.probability ?? []
  const max = Math.max(1, ...probabilities)
  const firstRain = probabilities.findIndex((value) => value >= 40)
  return <section aria-label="Nowcasting des précipitations" className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4"><div className="flex items-start justify-between"><div><p className="text-sm font-semibold text-white">Pluie dans les 60 prochaines minutes</p><p className="mt-1 text-xs text-slate-500">Prévision à 15 minutes · Open-Meteo</p></div><span className="rounded-full bg-cyan-300/10 px-2 py-1 text-xs text-cyan-200">{isLoading ? 'Analyse…' : firstRain >= 0 ? `Dans ${firstRain * 15} min` : 'Pas de pluie'}</span></div><div className="mt-5 flex h-20 items-end gap-1">{probabilities.map((value, index) => <div key={`${data?.times?.[index] ?? index}`} className="flex flex-1 flex-col items-center gap-1"><div className="w-full rounded-t-sm bg-cyan-300/70" style={{ height: `${Math.max(4, (value / max) * 58)}px` }} title={`${value}% de probabilité`} /><span className="text-[9px] text-slate-600">{index * 15}m</span></div>)}</div></section>
}
