'use client'

import Link from 'next/link'
import { ArrowUpRight, CloudSun, LockKeyhole, UserPlus, LayoutDashboard } from 'lucide-react'

const previews = [
  { href: '/', title: 'Tableau météo', description: 'Dashboard principal avec météo en direct, prévisions, graphiques, carte Leaflet, radar et modules experts.', icon: LayoutDashboard, accent: 'text-cyan-300' },
  { href: '/sign-in', title: 'Connexion', description: 'Parcours de connexion email et mot de passe avec validation et messages d’erreur.', icon: LockKeyhole, accent: 'text-violet-300' },
  { href: '/sign-up', title: 'Créer un compte', description: 'Inscription utilisateur pour tester l’authentification et accéder au dashboard.', icon: UserPlus, accent: 'text-emerald-300' },
]

export default function PreviewGallery() {
  return (
    <main className="min-h-screen bg-[#081522] px-5 py-10 text-slate-100 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">MétéoExpert</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Toutes les interfaces</h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400">Ouvrez chaque écran dans le preview pour vérifier les parcours principaux de l’application.</p>
          </div>
          <CloudSun className="hidden text-cyan-300/70 sm:block" size={46} strokeWidth={1.2} />
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {previews.map(({ href, title, description, icon: Icon, accent }) => (
            <Link key={href} href={href} className="group rounded-3xl border border-white/[0.08] bg-[#0d2132] p-6 transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-[#102a3e]">
              <div className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.06] ${accent}`}><Icon size={22} /></div>
              <div className="mt-8 flex items-start justify-between gap-4">
                <h2 className="text-lg font-semibold">{title}</h2>
                <ArrowUpRight className="text-slate-500 transition group-hover:text-cyan-300" size={18} />
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
              <p className="mt-6 text-xs font-semibold text-cyan-300">Ouvrir {href}</p>
            </Link>
          ))}
        </div>
        <div className="mt-8 rounded-2xl border border-amber-300/15 bg-amber-300/[0.05] p-5 text-sm leading-6 text-slate-400">
          <strong className="text-amber-200">Test conseillé :</strong> commencez par créer un compte, reconnectez-vous, puis revenez au tableau météo pour vérifier la session.
        </div>
      </div>
    </main>
  )
}
