'use client'

import { LogOut, UserCircle } from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export const AccountMenu = () => {
  const { data: session, isPending } = authClient.useSession()

  if (isPending || !session?.user) return null

  const initials = session.user.name?.trim().slice(0, 2).toUpperCase() || session.user.email?.slice(0, 2).toUpperCase() || 'ME'

  const handleSignOut = async () => {
    await authClient.signOut()
    window.location.assign('/')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10" aria-label="Ouvrir le menu du compte">
        <Avatar className="size-8">
          <AvatarFallback className="bg-cyan-300 text-xs font-semibold text-[#081522]">{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="truncate">{session.user.name || session.user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => window.location.assign('/compte')}><UserCircle data-icon="inline-start" /> Mon compte</DropdownMenuItem>
        <DropdownMenuItem onClick={() => window.location.assign('/compte/abonnement')}>Mon abonnement</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive"><LogOut data-icon="inline-start" /> Déconnexion</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
