import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'
import { tagForType } from '@/lib/sanity/revalidate'

/**
 * Sanity webhook (BUILD-PLAN 3.5): on publish, refresh the cached pages that read that
 * document type. The request must carry Sanity's `sanity-webhook-signature` header, signed with
 * SANITY_REVALIDATE_SECRET; a secret in the query string is never accepted.
 *
 * Webhook settings in Sanity: POST to /api/revalidate, filter `!(_id in path("drafts.**"))`,
 * projection `{ _type }`, and the same secret.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) {
    return NextResponse.json({ ok: false, error: 'not-configured' }, { status: 503 })
  }

  let parsed: Awaited<ReturnType<typeof parseBody<{ _type?: string }>>>
  try {
    parsed = await parseBody<{ _type?: string }>(request, secret, true)
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid-body' }, { status: 400 })
  }

  if (!parsed.isValidSignature) {
    return NextResponse.json({ ok: false, error: 'invalid-signature' }, { status: 401 })
  }

  const tag = tagForType(parsed.body?._type)
  if (!tag) {
    return NextResponse.json({ ok: false, error: 'unknown-type' }, { status: 400 })
  }

  // Expire immediately: the next visit renders fresh content
  revalidateTag(tag, { expire: 0 })
  return NextResponse.json({ ok: true, revalidated: tag })
}
