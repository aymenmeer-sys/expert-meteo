import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { AccountClient } from '@/components/account-client'

export const dynamic = 'force-dynamic'

const AccountPage = async () => {
  let session

  try {
    session = await auth.api.getSession({ headers: await headers() })
  } catch (error) {
    console.error('[v0] Account session lookup failed', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    })
    throw error
  }

  if (!session?.user) {
    redirect('/sign-in')
  }

  return (
    <AccountClient
      initialUser={{
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
      }}
    />
  )
}

export default AccountPage
