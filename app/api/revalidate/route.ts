import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { timingSafeEqual } from 'crypto'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

function secretsMatch(provided: string, expected: string): boolean {
  const providedBuffer = Buffer.from(provided)
  const expectedBuffer = Buffer.from(expected)

  if (providedBuffer.length !== expectedBuffer.length) return false

  return timingSafeEqual(providedBuffer, expectedBuffer)
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)
  const rateLimit = await checkRateLimit(`revalidate:${ip}`)

  if (!rateLimit.allowed) {
    return NextResponse.json({ message: 'Too many requests' }, { status: 429 })
  }

  const expectedSecret = process.env.SANITY_REVALIDATE_SECRET
  const providedSecret =
    request.headers.get('x-revalidate-secret') ??
    request.nextUrl.searchParams.get('secret')

  if (!expectedSecret || !providedSecret || !secretsMatch(providedSecret, expectedSecret)) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { _type, slug } = body

    switch (_type) {
      case 'sermon':
        revalidatePath('/')
        revalidatePath('/sermons')
        if (slug?.current) {
          revalidatePath(`/sermons/${slug.current}`)
        }
        break

      case 'event':
        revalidatePath('/')
        revalidatePath('/events')
        break

      case 'ministry':
        revalidatePath('/')
        revalidatePath('/ministries')
        if (slug?.current) {
          revalidatePath(`/ministries/${slug.current}`)
        }
        break

      case 'person':
        revalidatePath('/')
        break

      case 'homeSections':
      case 'siteSettings':
        revalidatePath('/')
        break

      default:
        revalidatePath('/')
    }

    return NextResponse.json({
      revalidated: true,
      message: `Revalidated ${_type}`,
      now: Date.now()
    })
  } catch (err) {
    console.error('Revalidation error:', err)
    return NextResponse.json({
      message: 'Error revalidating'
    }, { status: 500 })
  }
}