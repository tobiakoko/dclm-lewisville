import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // Verify the request is from Sanity (optional but recommended)
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { _type, slug } = body

    // Revalidate based on document type
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
        revalidatePath('/ministers')
        break

      case 'homeSections':
      case 'siteSettings':
        revalidatePath('/')
        break

      default:
        // Revalidate homepage for unknown types
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
      message: 'Error revalidating',
      error: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 })
  }
}
