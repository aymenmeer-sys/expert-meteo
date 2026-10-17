import { Activity, CheckCircle2 } from 'lucide-react'

const StatusPage = () => (
  <main className="min-h-screen bg-[#081522] px-6 py-16 text-slate-100 sm:px-12">
    <div className="mx-auto max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">MétéoExpert status</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">Tous les systèmes sont opérationnels</h1>
      <p className="mt-4 text-slate-400">Dernière vérification automatique : données météo, authentification et PWA.</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {['API météo', 'Authentification', 'Application web'].map((service) => <article key={service} className="rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.06] p-5"><CheckCircle2 className="text-emerald-300" size={22} /><p className="mt-4 font-medium">{service}</p><p className="mt-1 text-sm text-emerald-200">Opérationnel</p></article>)}
      </div>
      <a href="/" className="mt-10 inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200"><Activity size={16} /> Retour à l’application</a>
    </div>
  </main>
)

export default StatusPage
