import Link from 'next/link'
import { PricingCards } from '@/components/pricing-cards'

export const metadata = { title: 'Tarifs | MétéoExpert', description: 'Choisissez votre formule MétéoExpert.' }

const PricingPage = () => <main className="min-h-screen bg-[#081522] px-6 py-16 text-slate-100"><div className="mx-auto max-w-6xl"><Link href="/" className="text-sm text-cyan-300">← Retour à MétéoExpert</Link><h1 className="mt-8 text-4xl font-semibold">Des prévisions à votre mesure</h1><p className="mt-3 max-w-2xl text-slate-400">Passez à Premium pour débloquer les villes illimitées, les alertes et le modèle ECMWF.</p><div className="mt-10"><PricingCards /></div></div></main>
export default PricingPage
