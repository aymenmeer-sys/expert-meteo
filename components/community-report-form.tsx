'use client'

import { useState, type FormEvent } from 'react'

export const CommunityReportForm = () => {
  const [status, setStatus] = useState('')
  const [busy, setBusy] = useState(false)
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setBusy(true); setStatus('')
    const form = new FormData(event.currentTarget)
    const response = await fetch('/api/reports', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ type: form.get('type'), description: form.get('description'), latitude: Number(form.get('latitude')), longitude: Number(form.get('longitude')) }) })
    setBusy(false); setStatus(response.ok ? 'Merci. Votre observation sera vérifiée avant publication.' : 'Connectez-vous pour envoyer un signalement.')
    if (response.ok) event.currentTarget.reset()
  }
  return <section aria-labelledby="community-report" className="mt-8 rounded-2xl border border-white/[0.07] bg-[#0d2132] p-5"><h2 id="community-report" className="text-lg font-semibold text-white">Observation citoyenne</h2><p className="mt-1 text-sm text-slate-400">Aidez à améliorer la vigilance locale.</p><form onSubmit={submit} className="mt-4 grid gap-3 sm:grid-cols-2"><select name="type" required aria-label="Type de phénomène" className="rounded-xl border border-white/10 bg-[#081522] px-3 py-2 text-sm text-slate-200"><option value="inondation">Inondation</option><option value="neige">Neige</option><option value="vent">Vent</option><option value="orage">Orage</option><option value="pollution">Pollution</option><option value="autre">Autre</option></select><input name="latitude" type="number" step="any" min="-90" max="90" placeholder="Latitude" required className="rounded-xl border border-white/10 bg-[#081522] px-3 py-2 text-sm text-slate-200" /><input name="longitude" type="number" step="any" min="-180" max="180" placeholder="Longitude" required className="rounded-xl border border-white/10 bg-[#081522] px-3 py-2 text-sm text-slate-200" /><textarea name="description" minLength={10} maxLength={1000} required placeholder="Décrivez ce que vous observez" className="min-h-24 rounded-xl border border-white/10 bg-[#081522] px-3 py-2 text-sm text-slate-200 sm:col-span-2" /><button type="submit" disabled={busy} className="rounded-xl bg-cyan-300 px-4 py-2 text-sm font-semibold text-[#081522] disabled:opacity-60 sm:col-span-2">{busy ? 'Envoi…' : 'Envoyer l’observation'}</button></form>{status && <p role="status" aria-live="polite" className="mt-3 text-sm text-slate-300">{status}</p>}</section>
}
