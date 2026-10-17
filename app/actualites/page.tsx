import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Actualités météo | MétéoExpert',
  description: 'Guides pratiques et analyses pour mieux comprendre la météo, la qualité de l’air et les alertes.',
  alternates: { canonical: '/actualites' },
}

const stories = [
  { title: 'Comprendre les niveaux de vigilance météo', excerpt: 'Les bons réflexes pour lire une vigilance et adapter ses déplacements.', tag: 'Sécurité' },
  { title: 'Qualité de l’air : les indicateurs utiles', excerpt: 'PM2.5, ozone, pollen : les mesures qui comptent au quotidien.', tag: 'Air' },
  { title: 'Préparer une sortie selon la tendance météo', excerpt: 'Une méthode simple pour croiser température, vent, pluie et visibilité.', tag: 'Conseils' },
]

const ActualitesPage = () => (
  <main id="main-content" className="min-h-screen bg-[#081522] px-6 py-12 text-slate-100 sm:px-10">
    <div className="mx-auto max-w-6xl">
      <a href="/" className="text-sm text-cyan-200 hover:text-white">← Retour au tableau de bord</a>
      <header className="mt-12 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">MétéoExpert / Actualités</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">La météo expliquée clairement.</h1>
        <p className="mt-5 text-lg leading-8 text-slate-400">Des contenus courts et utiles pour décider plus sereinement, sans bruit ni dramatisation.</p>
      </header>
      <section aria-label="Articles météo" className="mt-12 grid gap-4 md:grid-cols-3">
        {stories.map((story) => <article key={story.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-cyan-300/40"><span className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">{story.tag}</span><h2 className="mt-8 text-2xl font-semibold">{story.title}</h2><p className="mt-3 leading-7 text-slate-400">{story.excerpt}</p><a href="/" className="mt-8 inline-flex text-sm font-semibold text-white underline decoration-cyan-300 underline-offset-4">Lire sur le dashboard</a></article>)}
      </section>
    </div>
  </main>
)

export default ActualitesPage
