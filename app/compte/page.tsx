import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'

const AccountPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect('/sign-in')

  return (
    <main id="main-content" className="min-h-screen bg-[#081522] px-4 py-12 text-white sm:px-6">
      <section className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
        <p className="text-sm text-cyan-300">Mon compte</p>
        <h1 className="mt-2 text-3xl font-semibold">Bienvenue, {session.user.name || 'membre'}.</h1>
        <p className="mt-3 text-slate-300">{session.user.email}</p>
        <p className="mt-8 text-sm text-slate-400">Gérez votre abonnement depuis votre espace abonnement.</p>
        <a href="/compte/abonnement" className="mt-5 inline-flex rounded-xl bg-cyan-300 px-4 py-3 font-semibold text-[#081522]">Mon abonnement</a>
      </section>
    </main>
  )
}

export default AccountPage
