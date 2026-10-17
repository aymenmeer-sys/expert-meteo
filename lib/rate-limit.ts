import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const redisUrl = process.env.UPSTASH_REDIS_REST_URL
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN
const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null
const limiter = redis ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(60, '1 m'), prefix: 'meteoexpert:api' }) : null

type RateLimitResult = { success: boolean; limit?: number; remaining?: number; reset?: number }

export const limitRequest = async (key: string): Promise<RateLimitResult> => {
  if (!limiter) return { success: true }
  try {
    const result = await limiter.limit(key)
    return { success: result.success, limit: result.limit, remaining: result.remaining, reset: result.reset }
  } catch {
    return { success: true }
  }
}
