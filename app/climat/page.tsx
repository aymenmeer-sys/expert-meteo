import Link from 'next/link'
import { ClimateHistoryChart } from '@/components/climate-history-chart'

const ClimatePage = () => <main className="min-h-screen bg-[#081522] px-6 py-16 text-slate-100"><div className="mx-auto max-w-5xl"><Link href="/" className="text-sm text-cyan-300">← Retour à MétéoExpert</Link><h1 className="mt-8 text-4xl font-semibold">Climat et tendances</h1><p className="mt-3 max-w-2xl text-slate-400">Comparez les normales historiques et les évolutions récentes pour mieux comprendre votre climat local.</p><div className="mt-10"><ClimateHistoryChart /></div></div></main>
export default ClimatePage
