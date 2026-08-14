import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { NextRequest } from 'next/server'

const WINDOW_MS = 60 * 1000
const MAX_REQUESTS = 10

let upstashRatelimit: Ratelimit | null = null

function getUpstashRatelimit(): Ratelimit | null {
  if (upstashRatelimit) return upstashRatelimit

  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null
  }

  upstashRatelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(MAX_REQUESTS, `${WINDOW_MS} ms`),
    prefix: 'ratelimit',
  })

  return upstashRatelimit
}

const inMemoryMap = new Map<string, { count: number; resetTime: number }>()

function checkInMemory(identifier: string): { allowed: boolean; remaining: number; reset: number } {
  const now = Date.now()
  const record = inMemoryMap.get(identifier)

  if (!record || now > record.resetTime) {
    inMemoryMap.set(identifier, { count: 1, resetTime: now + WINDOW_MS })
    return { allowed: true, remaining: MAX_REQUESTS - 1, reset: now + WINDOW_MS }
  }

  if (record.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0, reset: record.resetTime }
  }

  record.count++
  return { allowed: true, remaining: MAX_REQUESTS - record.count, reset: record.resetTime }
}

export async function checkRateLimit(identifier: string): Promise<{
  allowed: boolean
  remaining: number
  reset: number
}> {
  const ratelimit = getUpstashRatelimit()

  if (!ratelimit) {
    return checkInMemory(identifier)
  }

  try {
    const { success, remaining, reset } = await ratelimit.limit(identifier)
    return { allowed: success, remaining, reset: reset - Date.now() }
  } catch {
    return checkInMemory(identifier)
  }
}

const IP_REGEX = /^(?:\d{1,3}\.){3}\d{1,3}$|^[0-9a-fA-F:]{2,45}$/

export function getClientIp(request: NextRequest): string {
  const xVercelForwarded = request.headers.get('x-vercel-forwarded-for')
  const forwardedFor = request.headers.get('x-forwarded-for')
  const rawIp = xVercelForwarded ?? forwardedFor?.split(',')[0]

  if (rawIp && IP_REGEX.test(rawIp.trim())) {
    return rawIp.trim()
  }

  return 'unknown'
}