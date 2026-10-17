'use client'

import useSWR from 'swr'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const fetcher = (url: string) => fetch(url).then((response) => response.json() as Promise<{ history: Array<{ year: number; average: number }> }>)

export const ClimateHistoryChart = () => {
  const { data, isLoading } = useSWR('/api/climat/historique?latitude=48.8566&longitude=2.3522', fetcher)
  return <section className="rounded-2xl border border-white/10 bg-[#0d2132] p-6"><h2 className="text-2xl font-semibold">Climat : 50 ans d&apos;historique</h2><p className="mt-2 text-sm text-slate-400">Température moyenne annuelle à Paris, calculée depuis Open-Meteo Historical Weather.</p><div className="mt-6 h-72">{isLoading ? <p className="text-sm text-slate-400">Chargement de l&apos;historique…</p> : data?.history ? <ResponsiveContainer width="100%" height="100%"><LineChart data={data.history}><XAxis dataKey="year" stroke="#94a3b8" tickLine={false} /><YAxis stroke="#94a3b8" tickLine={false} unit="°C" /><Tooltip contentStyle={{ background: '#081522', border: '1px solid #1e4258' }} /><Line type="monotone" dataKey="average" stroke="#67e8f9" strokeWidth={2} dot={false} /></LineChart></ResponsiveContainer> : <p className="text-sm text-rose-300">Historique indisponible.</p>}</div></section>
}
