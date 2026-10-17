import Link from 'next/link'
import { CloudSun } from 'lucide-react'
import { AccountMenu } from '@/components/account-menu'

export const SiteHeader = () => (
  <header className="sticky top-0 z-40 border-b border-white/10 bg-[#081522]/95 px-4 py-3 text-white backdrop-blur-md sm:px-6">
    <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
      <Link href="/" className="flex min-w-0 items-center gap-2 font-semibold" aria-label="MétéoExpert, accueil">
        <CloudSun className="size-5 shrink-0 text-cyan-300" aria-hidden="true" />
        <span className="truncate">MétéoExpert</span>
      </Link>
      <AccountMenu />
    </div>
  </header>
)
