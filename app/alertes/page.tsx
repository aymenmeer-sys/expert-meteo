'use client'

import { useCallback, useState } from 'react'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((response) => response.json())
type Alert = { id: string; city: string; threshold: string; type: string; active: boolean }

export default function AlertsPage() {
  const { data, mutate } = useSWR<Alert[]>('/api/alerts', fetcher)
  const [city, setCity] = useState('Paris')
  const [type, setType] = useState('rain')
  const [threshold, setThreshold] = useState('60')
  const addAlert = useCallback(async () => { await fetch('/api/alerts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ city, type, threshold: Number(threshold) }) }); await mutate() }, [city, threshold, type, mutate])
  const toggle = useCallback(async (alert: Alert) => { await fetch('/api/alerts', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: alert.id, active: !alert.active }) }); await mutate() }, [mutate])
  const remove = useCallback(async (id: string) => { await fetch(`/api/alerts?id=${encodeURIComponent(id)}`, { method: 'DELETE' }); await mutate() }, [mutate])
  return <main className="min-h-screen bg-[#081522] px-5 py-10 text-slate-100 sm:px-10"><div className="mx-auto max-w-3xl"><a href="/" className="text-sm text-cyan-300">← MétéoExpert</a><h1 className="mt-8 text-3xl font-semibold">Alertes météo</h1><p className="mt-2 text-sm text-slate-400">Configurez des seuils persistants par ville.</p><section className="mt-8 grid gap-3 rounded-2xl border border-white/10 bg-[#0d2132] p-5 sm:grid-cols-4"><input aria-label="Ville" value={city} onChange={(event) => setCity(event.target.value)} className="rounded-lg bg-white/10 px-3 py-2" /><select aria-label="Type" value={type} onChange={(event) => setType(event.target.value)} className="rounded-lg bg-white/10 px-3 py-2"><option value="rain">Pluie</option><option value="temperature">Température</option><option value="wind">Vent</option></select><input aria-label="Seuil" type="number" value={threshold} onChange={(event) => setThreshold(event.target.value)} className="rounded-lg bg-white/10 px-3 py-2" /><button onClick={addAlert} className="rounded-lg bg-cyan-300 px-4 py-2 font-semibold text-[#081522]">Ajouter</button></section><div className="mt-5 space-y-3">{data?.map((alert) => <article key={alert.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0d2132] p-4"><div><p className="font-medium">{alert.city} · {alert.type}</p><p className="text-xs text-slate-400">Seuil {alert.threshold} · {alert.active ? 'Active' : 'Inactive'}</p></div><div className="flex gap-2"><button onClick={() => toggle(alert)} className="rounded-lg bg-white/10 px-3 py-2 text-xs">{alert.active ? 'Désactiver' : 'Activer'}</button><button onClick={() => remove(alert.id)} className="rounded-lg bg-rose-400/10 px-3 py-2 text-xs text-rose-200">Supprimer</button></div></article>)}</div></div></main>
}
