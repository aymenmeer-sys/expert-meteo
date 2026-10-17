'use client'

import { DndContext, closestCenter, type DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Moon, Move, SunMedium, Sunrise, Waves } from 'lucide-react'
import { useEffect, useState } from 'react'

type WidgetId = 'air' | 'moon' | 'sun' | 'pollen' | 'marine'
type Theme = 'clair' | 'sombre' | 'auto' | 'meteo'
const defaults: WidgetId[] = ['air', 'moon', 'sun', 'pollen', 'marine']
const labels: Record<WidgetId, string> = { air: 'Qualité de l’air', moon: 'Phase lunaire', sun: 'Lever / coucher', pollen: 'Risque pollen', marine: 'Mode marin' }

const Widget = ({ id }: { id: WidgetId }) => { const sortable = useSortable({ id }); const style = { transform: CSS.Transform.toString(sortable.transform), transition: sortable.transition }; return <article ref={sortable.setNodeRef} style={style} className="rounded-2xl border border-white/[0.07] bg-[#0d2132] p-4" {...sortable.attributes} {...sortable.listeners}><div className="flex items-center justify-between"><h3 className="text-sm font-semibold text-white">{labels[id]}</h3><Move className="size-4 text-slate-600" /></div>{id === 'air' && <><p className="mt-4 text-3xl font-light text-emerald-300">24 <span className="text-sm text-slate-500">AQI</span></p><div className="mt-3 h-2 rounded-full bg-gradient-to-r from-emerald-400 via-amber-300 to-rose-400" /></>}{id === 'moon' && <div className="mt-4 flex items-center gap-3"><Moon className="size-12 fill-slate-300 text-slate-200" /><p className="text-sm text-slate-300">Gibbeuse décroissante<br /><span className="text-xs text-slate-500">78% illuminée</span></p></div>}{id === 'sun' && <div className="mt-4 flex items-center gap-5 text-sm text-slate-300"><Sunrise className="size-9 text-amber-300" /><span>Lever 7:42<br /><span className="text-xs text-slate-500">Coucher 18:54</span></span></div>}{id === 'pollen' && <><p className="mt-4 text-3xl font-light text-amber-300">Faible</p><p className="mt-1 text-xs text-slate-500">Graminées · 12 grains/m³</p></>}{id === 'marine' && <div className="mt-4 flex items-center gap-3"><Waves className="size-9 text-cyan-300" /><p className="text-sm text-slate-300">Vagues 0,8 m<br /><span className="text-xs text-slate-500">Vent offshore 14 km/h</span></p></div>}</article> }

export const CustomizableDashboard = () => {
  const [items, setItems] = useState<WidgetId[]>(defaults)
  const [theme, setTheme] = useState<Theme>('meteo')
  useEffect(() => { const saved = window.localStorage.getItem('meteoexpert-widgets'); if (saved) { try { const parsed = JSON.parse(saved) as WidgetId[]; if (parsed.every((item) => defaults.includes(item))) setItems(parsed) } catch {} } }, [])
  useEffect(() => { window.localStorage.setItem('meteoexpert-widgets', JSON.stringify(items)) }, [items])
  const onDragEnd = ({ active, over }: DragEndEvent) => { if (!over || active.id === over.id) return; setItems((current) => { const oldIndex = current.indexOf(active.id as WidgetId); const newIndex = current.indexOf(over.id as WidgetId); return arrayMove(current, oldIndex, newIndex) }) }
  return <section aria-labelledby="personalized-dashboard" className="mt-8"><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div><h2 id="personalized-dashboard" className="text-lg font-semibold">Votre espace météo</h2><p className="mt-1 text-xs text-slate-500">Glissez les cartes pour composer votre tableau de bord</p></div><div className="flex gap-1" role="group" aria-label="Thème visuel">{(['clair', 'sombre', 'auto', 'meteo'] as Theme[]).map((value) => <button key={value} type="button" aria-pressed={theme === value} onClick={() => setTheme(value)} className={`rounded-lg px-2 py-1 text-xs ${theme === value ? 'bg-cyan-300 text-[#081522]' : 'text-slate-500 hover:text-white'}`}>{value === 'clair' && <SunMedium className="mr-1 inline size-3" />}{value === 'sombre' && <Moon className="mr-1 inline size-3" />}{value}</button>)}</div></div><DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}><SortableContext items={items} strategy={verticalListSortingStrategy}><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{items.map((id) => <Widget key={id} id={id} />)}</div></SortableContext></DndContext></section>
}
