import { AccountMenu } from '@/components/account-menu'

export const SiteHeader = () => (
  <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-4 py-3 text-white sm:px-6">
    <div className="mx-auto flex max-w-7xl justify-end">
      <div className="pointer-events-auto"><AccountMenu /></div>
    </div>
  </header>
)
