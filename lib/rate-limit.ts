import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Vercel's Upstash integration injects KV_REST_API_*; accept both naming schemes.
const redisUrl = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN
const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null
const LIMIT = 60
const WINDOW_MS = 60_000
const limiter = redis ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(LIMIT, '1 m'), prefix: 'meteoexpert:api' }) : null

type RateLimitResult = { success: boolean; limit?: number; remaining?: number; reset?: number }

// Per-instance fallback used when Redis is not configured or unreachable.
const memory = new Map<string, { count: number; reset: number }>()

export const limitInMemory = (key: string, now = Date.now(), limit = LIMIT, windowMs = WINDOW_MS): RateLimitResult => {
  if (memory.size > 5000) for (const [k, v] of memory) if (v.reset <= now) memory.delete(k)
  const entry = memory.get(key)
  if (!entry || entry.reset <= now) {
    memory.set(key, { count: 1, reset: now + windowMs })
    return { success: true, limit, remaining: limit - 1, reset: now + windowMs }
  }
  entry.count += 1
  return { success: entry.count <= limit, limit, remaining: Math.max(0, limit - entry.count), reset: entry.reset }
}

export const clientKey = (request: Request) => request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown'

export const limitRequest = async (key: string): Promise<RateLimitResult> => {
  if (!limiter) return limitInMemory(key)
  try {
    const result = await limiter.limit(key)
    return { success: result.success, limit: result.limit, remaining: result.remaining, reset: result.reset }
  } catch {
    return limitInMemory(key)
  }
}

export const tooManyRequests = (rate: RateLimitResult) => Response.json(
  { error: 'Trop de requêtes, réessayez dans un instant.' },
  { status: 429, headers: { 'Retry-After': String(Math.max(1, Math.ceil(((rate.reset ?? Date.now()) - Date.now()) / 1000))) } },
)
