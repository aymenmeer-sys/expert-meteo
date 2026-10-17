import Link from 'next/link'
import { createPortalSession } from '@/app/actions/billing'

export const metadata = { title: 'Mon abonnement | MétéoExpert' }

const SubscriptionPage = () => <main className="min-h-screen bg-[#081522] px-6 py-16 text-slate-100"><div className="mx-auto max-w-2xl"><Link href="/" className="text-sm text-cyan-300">← Retour</Link><h1 className="mt-8 text-4xl font-semibold">Mon abonnement</h1><p className="mt-3 text-slate-400">Gérez votre formule, vos factures et votre moyen de paiement dans le portail sécurisé Stripe.</p><form action={async () => { 'use server'; const url = await createPortalSession(); if (url) { const { redirect } = await import('next/navigation'); redirect(url) } }} className="mt-8"><button className="rounded-xl bg-cyan-400 px-5 py-3 font-medium text-slate-950">Ouvrir le portail Stripe</button></form></div></main>
export default SubscriptionPage
