import { toNextJsHandler } from 'better-auth/next-js'
import { auth } from '@/lib/auth'

const handlers = toNextJsHandler(auth)

const logAuthError = (method: string, error: unknown) => {
  console.error('[auth] Better Auth request failed', {
    method,
    error: error instanceof Error ? { name: error.name, message: error.message, stack: error.stack } : error,
  })
}

export const GET = async (request: Request) => {
  try {
    return await handlers.GET(request)
  } catch (error) {
    logAuthError('GET', error)
    throw error
  }
}

export const POST = async (request: Request) => {
  try {
    return await handlers.POST(request)
  } catch (error) {
    logAuthError('POST', error)
    throw error
  }
}
