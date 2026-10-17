import { toNextJsHandler } from 'better-auth/next-js'
import { auth } from '@/lib/auth'

const handlers = toNextJsHandler(auth)

const logAuthError = (method: string, error: unknown) => {
  console.error('[auth] Better Auth request failed', {
    method,
    error: error instanceof Error ? { name: error.name, message: error.message, stack: error.stack } : error,
  })
}

const logAuthResponse = async (method: string, response: Response) => {
  if (response.ok) return response
  const body = await response.clone().text()
  console.error('[auth] Better Auth returned an error response', {
    method,
    status: response.status,
    body: body.slice(0, 2000),
  })
  return response
}

export const GET = async (request: Request) => {
  try {
    return await logAuthResponse('GET', await handlers.GET(request))
  } catch (error) {
    logAuthError('GET', error)
    throw error
  }
}

export const POST = async (request: Request) => {
  try {
    return await logAuthResponse('POST', await handlers.POST(request))
  } catch (error) {
    logAuthError('POST', error)
    throw error
  }
}
