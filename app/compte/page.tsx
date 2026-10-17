'use client'

import { useSession } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'

export default function ComptePage() {
  const { data: session, isPending } = useSession()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !isPending && !session) {
      router.replace('/sign-in')
    }
  }, [mounted, isPending, session, router])

  if (!mounted || isPending) {
    return (
      <main className="flex h-screen items-center justify-center bg-[#081522] text-white">
        <Loader2 className="h-8 w-8 animate-spin" aria-label="Chargement" />
      </main>
    )
  }

  if (!session) return null

  return (
    <main className="min-h-screen bg-[#081522] p-8 text-white">
      <h1 className="text-2xl font-bold">Mon Compte</h1>
      <p>Email : {session.user.email}</p>
    </main>
  )
}
