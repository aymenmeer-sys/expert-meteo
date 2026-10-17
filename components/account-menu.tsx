'use client'

import Link from 'next/link'
import { useState } from 'react'
import { LogOut, UserCircle } from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export const AccountMenu = () => {
  const { data: session, isPending } = authClient.useSession()
  const [isSigningOut, setIsSigningOut] = useState(false)

  if (isPending || !session?.user) return <Link href="/sign-in" className="rounded-lg px-3 py-2 text-sm font-medium text-cyan-200 transition-colors hover:bg-white/10 hover:text-white">Connexion</Link>

  const initials = session.user.name?.trim().split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase() || session.user.email?.slice(0, 2).toUpperCase() || 'ME'

  const handleSignOut = async () => {
    if (isSigningOut) return

    setIsSigningOut(true)
    try {
      const result = await authClient.signOut()
      if (result.error) throw new Error('Sign-out failed')
      window.location.replace('/')
    } catch (error) {
      console.error('[v0] Sign-out failed', error)
      setIsSigningOut(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger type="button" className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300" aria-label="Ouvrir le menu du compte">
        <Avatar className="size-8">
          <AvatarFallback className="bg-cyan-300 text-xs font-semibold text-[#081522]">{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="truncate">{session.user.name || session.user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem render={<Link href="/compte" />}><UserCircle data-icon="inline-start" /> Mon compte</DropdownMenuItem>
        <DropdownMenuItem render={<Link href="/compte/abonnement" />}>Mon abonnement</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          render={<button type="button" onClick={handleSignOut} disabled={isSigningOut} />}
          className="w-full text-destructive focus:text-destructive"
        >
          <LogOut data-icon="inline-start" />
          {isSigningOut ? 'Déconnexion…' : 'Déconnexion'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
