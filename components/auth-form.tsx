'use client'

import { FormEvent, useState } from 'react'
import { authClient } from '@/lib/auth-client'

export function AuthForm({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const isSignUp = mode === 'sign-up'

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (loading) return
    setLoading(true)
    setError('')

    try {
      const result = isSignUp
        ? await authClient.signUp.email({ email, password, name })
        : await authClient.signIn.email({ email, password })

      if (result.error) {
        setError(result.error.message || 'Impossible de valider ces identifiants.')
        return
      }

      window.location.assign('/')
    } catch {
      setError('Le service de connexion est momentanément indisponible. Réessayez.')
    } finally {
      setLoading(false)
    }
  }
  return <main className="flex min-h-screen items-center justify-center bg-[#081522] px-6 text-white"><form onSubmit={submit} className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0d2132] p-8"><h1 className="text-2xl font-semibold">{isSignUp ? 'Créer un compte' : 'Se connecter'}</h1><p className="mt-2 text-sm text-slate-400">Accédez à votre météo personnalisée.</p>{isSignUp && <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Nom" className="mt-6 h-12 w-full rounded-xl bg-white/5 px-4 outline-none" />}<input aria-label="Email" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="mt-4 h-12 w-full rounded-xl bg-white/5 px-4 outline-none" /><input aria-label="Mot de passe" required minLength={8} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" className="mt-4 h-12 w-full rounded-xl bg-white/5 px-4 outline-none" />{error && <p role="alert" className="mt-3 text-sm text-rose-300">{error}</p>}<button disabled={loading} className="mt-6 h-12 w-full rounded-xl bg-cyan-300 font-semibold text-[#081522] disabled:opacity-60">{loading ? 'Chargement…' : isSignUp ? 'Créer mon compte' : 'Se connecter'}</button><a href={isSignUp ? '/sign-in' : '/sign-up'} className="mt-5 block text-center text-sm text-cyan-300">{isSignUp ? 'J’ai déjà un compte' : 'Créer un compte'}</a></form></main>
}
