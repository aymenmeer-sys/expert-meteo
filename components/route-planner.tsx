'use client'

import { useState } from 'react'

type RouteResult = { distanceKm: number; durationMinutes: number; steps: Array<{ index: number; latitude: number; longitude: number; etaMinutes: number }> }

export const RoutePlanner = () => {
  const [from, setFrom] = useState('Paris')
  const [to, setTo] = useState('Lyon')
  const [result, setResult] = useState<RouteResult | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const submit = async (event: React.FormEvent) => { event.preventDefault(); setLoading(true); setError(''); try { const response = await fetch('/api/itineraire', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ from, to }) }); const data = await response.json() as RouteResult & { error?: string }; if (!response.ok) throw new Error(data.error); setResult(data) } catch (routeError) { setError(routeError instanceof Error ? routeError.message : 'Erreur réseau') } finally { setLoading(false) } }
  return <section className="rounded-2xl border border-white/10 bg-[#0d2132] p-6"><h2 className="text-2xl font-semibold">Route Weather</h2><p className="mt-2 text-sm text-slate-400">Préparez votre trajet avec la météo des étapes.</p><form onSubmit={submit} className="mt-5 grid gap-3 md:grid-cols-[1fr_1fr_auto]"><input value={from} onChange={(event) => setFrom(event.target.value)} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3" aria-label="Départ" /><input value={to} onChange={(event) => setTo(event.target.value)} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3" aria-label="Arrivée" /><button className="rounded-xl bg-cyan-400 px-4 py-3 font-medium text-slate-950" disabled={loading}>{loading ? 'Calcul…' : 'Calculer'}</button></form>{error && <p className="mt-4 text-sm text-rose-300">{error}</p>}{result && <div className="mt-6"><p className="text-sm text-slate-300">{result.distanceKm} km · {Math.floor(result.durationMinutes / 60)} h {result.durationMinutes % 60} min</p><div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{result.steps.map((step) => <div key={step.index} className="rounded-xl bg-white/5 p-3 text-sm"><p className="text-cyan-300">Étape {step.index + 1}</p><p className="mt-1 text-slate-400">Passage estimé dans {step.etaMinutes} min</p></div>)}</div></div>}</section>
}
