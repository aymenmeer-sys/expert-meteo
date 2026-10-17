import Link from 'next/link'
import { RoutePlanner } from '@/components/route-planner'

const RoutePage = () => <main className="min-h-screen bg-[#081522] px-6 py-16 text-slate-100"><div className="mx-auto max-w-5xl"><Link href="/" className="text-sm text-cyan-300">← Retour à MétéoExpert</Link><h1 className="mt-8 text-4xl font-semibold">Planificateur météo d&apos;itinéraire</h1><p className="mt-3 max-w-2xl text-slate-400">Un itinéraire OSRM enrichi de points de passage, prêt à recevoir les prévisions horaires.</p><div className="mt-10"><RoutePlanner /></div></div></main>
export default RoutePage
