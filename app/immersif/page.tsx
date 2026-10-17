import Link from 'next/link'
import { EarthGlobe } from '@/components/earth-globe'

const ImmersivePage = () => <main className="min-h-screen bg-[#081522] px-6 py-16 text-slate-100"><div className="mx-auto max-w-5xl"><Link href="/" className="text-sm text-cyan-300">← Retour à MétéoExpert</Link><h1 className="mt-8 text-4xl font-semibold">Expérience météo immersive</h1><p className="mt-3 max-w-2xl text-slate-400">Explorez la planète et préparez vos prochaines observations.</p><div className="mt-10"><EarthGlobe /></div></div></main>
export default ImmersivePage
