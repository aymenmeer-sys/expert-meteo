'use client'

import { useEffect } from 'react'

export default function AccountError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('[v0] Account route error', error)
  }, [error])

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#081522] p-6 text-white">
      <section className="max-w-md rounded-2xl border border-white/10 bg-[#0d2132] p-8 text-center">
        <h1 className="text-2xl font-bold">Impossible de charger le compte</h1>
        <p className="mt-3 text-slate-300">La session a peut-être expiré. Recharge la page ou reconnecte-toi.</p>
        <div className="mt-6 flex justify-center gap-3">
          <button type="button" onClick={() => reset()} className="rounded-lg bg-cyan-300 px-4 py-2 font-semibold text-slate-950">Réessayer</button>
          <a href="/sign-in" className="rounded-lg border border-white/15 px-4 py-2">Connexion</a>
        </div>
      </section>
    </main>
  )
}
