import type { Metadata } from 'next'

const cities: Record<string, { name: string; region: string }> = { paris: { name: 'Paris', region: 'Île-de-France' }, lyon: { name: 'Lyon', region: 'Auvergne-Rhône-Alpes' }, marseille: { name: 'Marseille', region: 'Provence-Alpes-Côte d’Azur' }, bordeaux: { name: 'Bordeaux', region: 'Nouvelle-Aquitaine' } }

export const generateStaticParams = () => Object.keys(cities).map((city) => ({ city }))

export const generateMetadata = async ({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> => {
  const { city } = await params
  const place = cities[city] ?? { name: city, region: 'France' }
  return { title: `Météo ${place.name} | MétéoExpert`, description: `Prévisions météo, qualité de l’air et vigilance pour ${place.name}, ${place.region}.`, alternates: { canonical: `/villes/${city}` } }
}

const CityPage = async ({ params }: { params: Promise<{ city: string }> }) => {
  const { city } = await params
  const place = cities[city] ?? { name: city, region: 'France' }
  return <main id="main-content" className="min-h-screen bg-[#081522] px-6 py-12 text-slate-100 sm:px-10"><div className="mx-auto max-w-4xl"><a href="/" className="text-sm text-cyan-200 hover:text-white">← Retour aux prévisions</a><p className="mt-16 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Prévisions locales</p><h1 className="mt-4 text-5xl font-semibold tracking-tight">Météo à {place.name}</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">Consultez les prévisions, le radar pluie, la qualité de l’air et les alertes pour {place.name}, en {place.region}.</p><div className="mt-10 grid gap-4 sm:grid-cols-3"><a href={`/?city=${encodeURIComponent(place.name)}`} className="rounded-2xl border border-cyan-300/30 bg-cyan-300/10 p-5 font-semibold text-cyan-100 hover:bg-cyan-300/20">Voir les prévisions</a><a href="/actualites" className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 font-semibold hover:border-white/30">Guides météo</a><a href="/status" className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 font-semibold hover:border-white/30">État des services</a></div></div></main>
}

export default CityPage
