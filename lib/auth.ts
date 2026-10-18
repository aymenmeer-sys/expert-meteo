import { betterAuth } from 'better-auth'
import { pool } from '@/lib/db'

const isDevelopment = process.env.NODE_ENV === 'development'
const normalizeOrigin = (value: string | undefined) => value?.replace(/\/$/, '')
const configuredAuthUrl = normalizeOrigin(process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL)
const netlifyOrigins = [
  process.env.NETLIFY_URL,
  process.env.DEPLOY_PRIME_URL,
  process.env.URL,
].map(normalizeOrigin)
const productionOrigin = configuredAuthUrl || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined)
const originValues = [
  configuredAuthUrl,
  ...netlifyOrigins,
  productionOrigin,
  ...(isDevelopment ? [
    'http://localhost:3000',
    process.env.V0_RUNTIME_URL,
    process.env.V0_DEV_APP_URL,
    process.env.V0_BUILD_URL,
    process.env.V0_SANDBOX_URL,
  ] : []),
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
  process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined,
  ...netlifyOrigins,
].filter((value): value is string => Boolean(value))

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET || (process.env.NEXT_PHASE === 'phase-production-build' ? 'build-only-invalid-secret' : (() => {
    if (process.env.NODE_ENV === 'production') throw new Error('BETTER_AUTH_SECRET is required in production')
    return 'local-development-secret-change-me'
  })()),
  database: pool,
  emailAndPassword: { enabled: true },
  baseURL: configuredAuthUrl || netlifyOrigins[0] || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined) || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) || process.env.V0_RUNTIME_URL || 'http://localhost:3000',
  trustedOrigins: originValues,
  ...(process.env.NODE_ENV === 'development' ? {
    advanced: { defaultCookieAttributes: { sameSite: 'none' as const, secure: true } },
  } : {}),
})
