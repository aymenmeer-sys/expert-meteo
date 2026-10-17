'use client'

import { useState } from 'react'
import { createCheckoutSession } from '@/app/actions/billing'
import { PLANS } from '@/lib/products'

export const PricingCards = () => {
  const [loading, setLoading] = useState<string | null>(null)
  const checkout = async (planId: string) => {
    setLoading(planId)
    try {
      const url = await createCheckoutSession(planId)
      if (url) window.location.assign(url)
    } finally { setLoading(null) }
  }
  return <section className="grid gap-5 md:grid-cols-3">{PLANS.map((plan) => <article key={plan.id} className="flex flex-col rounded-2xl border border-white/10 bg-[#0d2132] p-6"><h2 className="text-xl font-semibold">{plan.name}</h2><p className="mt-2 min-h-12 text-sm text-slate-400">{plan.description}</p><p className="mt-6 text-3xl font-semibold">{plan.priceInCents === 0 ? '0 €' : `${(plan.priceInCents / 100).toFixed(2)} €`}<span className="text-sm text-slate-400">{plan.interval ? '/mois' : ''}</span></p><ul className="my-6 space-y-2 text-sm text-slate-300">{plan.features.map((feature) => <li key={feature}>✓ {feature}</li>)}</ul><button disabled={plan.id === 'free' || loading !== null} onClick={() => checkout(plan.id)} className="mt-auto rounded-xl bg-cyan-400 px-4 py-3 font-medium text-slate-950 disabled:cursor-not-allowed disabled:opacity-50">{loading === plan.id ? 'Redirection…' : plan.id === 'free' ? 'Plan actuel' : 'Choisir ce plan'}</button></article>)}</section>
}
