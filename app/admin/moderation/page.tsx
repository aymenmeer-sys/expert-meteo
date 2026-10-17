import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { ModerationClient } from '@/components/moderation-client'

export const dynamic = 'force-dynamic'

export default async function ModerationPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user || (session.user as { role?: unknown }).role !== 'admin') redirect('/')
  return <main className="mx-auto min-h-screen max-w-4xl px-6 py-12 text-white"><p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Admin</p><h1 className="mt-2 text-3xl font-semibold">Modération citoyenne</h1><p className="mt-2 text-slate-400">Validez les observations avant leur affichage public.</p><ModerationClient /></main>
}
