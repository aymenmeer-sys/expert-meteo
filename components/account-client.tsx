'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

type AccountUser = {
  id: string
  name: string
  email: string
}

type AccountClientProps = {
  initialUser: AccountUser
}

export const AccountClient = ({ initialUser }: AccountClientProps) => {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()
  const user = session?.user ?? initialUser

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace('/sign-in')
    }
  }, [isPending, router, session?.user])

  if (isPending && !session?.user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#081522] px-4 text-white" aria-busy="true">
        <div className="flex items-center gap-3 text-slate-300">
          <span className="size-5 animate-spin rounded-full border-2 border-cyan-300 border-t-transparent" aria-hidden="true" />
          <span>Chargement de votre compte…</span>
        </div>
      </main>
    )
  }

  return (
    <main id="main-content" className="min-h-screen bg-[#081522] px-4 py-12 text-white sm:px-6">
      <section className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
        <p className="text-sm text-cyan-300">Mon compte</p>
        <h1 className="mt-2 text-3xl font-semibold">Bienvenue, {user.name || 'membre'}.</h1>
        <p className="mt-3 text-slate-300">{user.email}</p>
        <p className="mt-8 text-sm text-slate-400">Gérez votre abonnement depuis votre espace abonnement.</p>
        <Link href="/compte/abonnement" className="mt-5 inline-flex rounded-xl bg-cyan-300 px-4 py-3 font-semibold text-[#081522]">Mon abonnement</Link>
      </section>
    </main>
  )
}
