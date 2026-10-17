'use client'

import { MessageCircle, Send, X } from 'lucide-react'
import { useState } from 'react'

export const WeatherBot = () => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const ask = async () => { if (!message.trim() || loading) return; setLoading(true); const response = await fetch('/api/weatherbot', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message }) }); const data = await response.json(); setAnswer(data.text ?? data.error ?? 'Réponse indisponible'); setLoading(false); setMessage('') }
  return <><button type="button" aria-label="Ouvrir MétéoBot" onClick={() => setOpen(true)} className="fixed bottom-5 right-5 z-20 grid size-12 place-items-center rounded-full bg-cyan-300 text-[#081522] shadow-xl shadow-cyan-950/30"><MessageCircle className="size-5" /></button>{open && <div className="fixed bottom-20 right-5 z-30 w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-white/10 bg-[#0a1b2a] p-4 shadow-2xl"><div className="flex items-center justify-between"><div><p className="font-semibold text-white">MétéoBot</p><p className="text-xs text-slate-500">Prévisions expliquées simplement</p></div><button type="button" aria-label="Fermer MétéoBot" onClick={() => setOpen(false)}><X className="size-4 text-slate-400" /></button></div>{answer && <p className="mt-4 rounded-xl bg-white/[0.05] p-3 text-sm leading-6 text-slate-200">{answer}</p>}<div className="mt-4 flex gap-2"><input aria-label="Votre question météo" value={message} onChange={(event) => setMessage(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.nativeEvent.isComposing && event.keyCode !== 229) void ask() }} placeholder="Dois-je prendre un parapluie ?" className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600" /><button type="button" aria-label="Envoyer la question" onClick={() => void ask()} disabled={loading} className="grid size-10 place-items-center rounded-xl bg-cyan-300 text-[#081522] disabled:opacity-50"><Send className="size-4" /></button></div></div>}</>
}
