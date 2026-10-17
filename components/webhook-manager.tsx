'use client'

import { useState } from 'react'

export const WebhookManager = () => {
  const [url, setUrl] = useState('')
  const [created, setCreated] = useState(false)
  const submit = async (event: React.FormEvent) => { event.preventDefault(); const response = await fetch('/api/developpeurs/webhooks', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ url, events: ['weather.alert'] }) }); setCreated(response.ok); }
  return <section className="mt-8 rounded-2xl border border-white/10 bg-[#0d2132] p-6"><h2 className="text-xl font-semibold">Webhooks domotiques</h2><p className="mt-2 text-sm text-slate-400">Recevez les alertes météo dans Home Assistant, IFTTT ou votre backend.</p><form onSubmit={submit} className="mt-4 flex gap-3"><input required type="url" value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://example.com/webhook" className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3" aria-label="URL du webhook" /><button className="rounded-xl bg-cyan-400 px-4 py-3 font-medium text-slate-950">Créer</button></form>{created && <p className="mt-3 text-sm text-emerald-300">Webhook enregistré.</p>}</section>
}
