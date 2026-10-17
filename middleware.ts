import { NextResponse, type NextRequest } from 'next/server'
import { getSessionCookie } from 'better-auth/cookies'

export const middleware = (request: NextRequest) => {
  if (getSessionCookie(request)) return NextResponse.next()

  return NextResponse.redirect(new URL('/sign-in', request.url))
}

export const config = {
  matcher: ['/compte/:path*'],
}
