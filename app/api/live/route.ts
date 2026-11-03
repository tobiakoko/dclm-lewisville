import { NextResponse } from 'next/server'
import { getSiteData } from '@/lib/data'
import { isLiveNow } from '@/lib/sermons-data'
import { LIVE_REVALIDATE_SECONDS } from '@/lib/sermons'

// Cached for a minute, so pages stay static and YouTube is asked at most once a minute
export const revalidate = 60

/** { live } for the header's "Watch live" link (REDESIGN.md §2): true only while the stream is live */
export async function GET() {
  const { config } = await getSiteData()
  const live = await isLiveNow(config.youtube.channelId)
  return NextResponse.json({ live }, { headers: { 'Cache-Control': `public, s-maxage=${LIVE_REVALIDATE_SECONDS}` } })
}
