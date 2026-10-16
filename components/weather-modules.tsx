'use client'

import { useMemo, useState } from 'react'
import { BellRing, CloudRain, Leaf, Waves, Wheat, X } from 'lucide-react'

type Comparison = { city: string; temp: number; rain: number; trend: string }

export function WeatherModules({ comparisons, language }: { comparisons: Comparison[]; language: 'fr' | 'en' }) {
  const [active, setActive] = useState<'compare' | 'marine' | 'agri' | 'pollen' | 'alerts'>('compare')
  const [alerts, setAlerts] = useState<string[]>([])
  const labels = language === 'fr'
    ? { compare: 'Comparaison', marine: 'Marine', agri: 'Agricole', pollen: 'Pollen', alerts: 'Alertes' }
    : { compare: 'Compare', marine: 'Marine', agri: 'Agriculture', pollen: 'Pollen', alerts: 'Alerts' }
  const pollen = useMemo(() => [{ name: 'Graminées', level: 2 }, { name: 'Bouleau', level: 1 }, { name: 'Ambroisie', level: 0 }], [])
  const addAlert = (label: string) => setAlerts((current) => current.includes(label) ? current.filter((item) => item !== label) : [...current, label])
  return <section className="mt-8 rounded-2xl border border-white/[0.07] bg-[#0d2132] p-5" aria-labelledby="modules-title">
    <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 id="modules-title" className="text-lg font-semibold">Modules experts</h2><p className="mt-1 text-xs text-slate-500">Données opérationnelles pour chaque usage</p></div><div className="flex flex-wrap gap-1 rounded-xl bg-white/[0.04] p-1">{Object.entries(labels).map(([key, label]) => <button key={key} onClick={() => setActive(key as typeof active)} className={`rounded-lg px-3 py-2 text-xs ${active === key ? 'bg-cyan-300 text-[#081522]' : 'text-slate-400 hover:text-white'}`}>{label}</button>)}</div></div>
    {active === 'compare' && <div className="mt-5 grid gap-3 sm:grid-cols-3">{comparisons.map((item) => <div key={item.city} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4"><div className="flex justify-between text-sm font-medium"><span>{item.city}</span><span>{Math.round(item.temp)}°</span></div><div className="mt-3 flex items-center justify-between text-xs text-slate-500"><span className="flex items-center gap-1"><CloudRain size={13} /> {item.rain}%</span><span className="text-cyan-300">{item.trend}</span></div></div>)}</div>}
    {active === 'marine' && <div className="mt-5 grid gap-3 sm:grid-cols-3">{[['Vent', '12 km/h'], ['Houle', '0,8 m'], ['Visibilité', '10 km']].map(([label, value]) => <div key={label} className="rounded-xl bg-cyan-300/[0.06] p-4"><Waves className="mb-3 text-cyan-300" size={18} /><p className="text-xs text-slate-500">{label}</p><p className="mt-1 font-semibold">{value}</p></div>)}</div>}
    {active === 'agri' && <div className="mt-5 rounded-xl bg-emerald-300/[0.06] p-4"><div className="flex items-center gap-3"><Wheat className="text-emerald-300" /><div><p className="font-medium">Fenêtre de traitement favorable</p><p className="mt-1 text-xs text-slate-500">Vent faible, pas de pluie prévue dans les 6 prochaines heures.</p></div></div></div>}
    {active === 'pollen' && <div className="mt-5 grid gap-3 sm:grid-cols-3">{pollen.map((item) => <div key={item.name} className="rounded-xl bg-white/[0.03] p-4"><div className="flex items-center gap-2"><Leaf size={16} className="text-emerald-300" /><span className="text-sm">{item.name}</span></div><p className="mt-3 text-xs text-slate-500">Risque {item.level === 0 ? 'faible' : item.level === 1 ? 'modéré' : 'élevé'}</p><div className="mt-2 h-1.5 rounded-full bg-white/10"><div className="h-full rounded-full bg-emerald-300" style={{ width: `${Math.max(12, item.level * 35)}%` }} /></div></div>)}</div>}
    {active === 'alerts' && <div className="mt-5 grid gap-3 sm:grid-cols-3">{['Pluie intense', 'Température basse', 'Vent fort'].map((label) => <button key={label} onClick={() => addAlert(label)} className={`flex items-center gap-3 rounded-xl border p-4 text-left text-sm ${alerts.includes(label) ? 'border-cyan-300/40 bg-cyan-300/10' : 'border-white/[0.06] bg-white/[0.03]'}`}><BellRing size={17} className="text-cyan-300" /><span>{label}<small className="mt-1 block text-xs text-slate-500">{alerts.includes(label) ? 'Activée' : 'Activer'}</small></span>{alerts.includes(label) && <X size={14} className="ml-auto text-slate-400" />}</button>)}</div>}
  </section>
}
