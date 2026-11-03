import 'server-only'
import type { SiteConfig } from '@/lib/constants'
import {
  FEED_REVALIDATE_SECONDS,
  LIVE_REVALIDATE_SECONDS,
  chooseFeatured,
  feedUrl,
  livePageUrl,
  parseLivePage,
  parseYouTubeFeed,
  type FeaturedMessage,
  type SermonSource,
  type Video,
} from '@/lib/sermons'

const HEADERS = { 'User-Agent': 'Mozilla/5.0 (compatible; DeeperLifeLewisvilleSite/1.0)' }

/** null means the feed could not be read; callers show an honest error, never sample videos */
async function readFeed(channelId: string, source: SermonSource): Promise<Video[] | null> {
  try {
    const response = await fetch(feedUrl(channelId), { headers: HEADERS, next: { revalidate: FEED_REVALIDATE_SECONDS } })
    if (!response.ok) return null
    return parseYouTubeFeed(await response.text(), source)
  } catch {
    return null
  }
}

async function readLive(channelId: string) {
  try {
    const response = await fetch(livePageUrl(channelId), { headers: HEADERS, next: { revalidate: LIVE_REVALIDATE_SECONDS } })
    if (!response.ok) return null
    return parseLivePage(await response.text())
  } catch {
    return null
  }
}

export interface MessagesData {
  featured: FeaturedMessage
  /** Recent Lewisville uploads, or null when the feed could not be read */
  lewisville: Video[] | null
}

export async function getMessages(config: Pick<SiteConfig, 'youtube' | 'dclm'>, now = new Date()): Promise<MessagesData> {
  const [live, lewisville, hq] = await Promise.all([
    readLive(config.youtube.channelId),
    readFeed(config.youtube.channelId, 'lewisville'),
    readFeed(config.dclm.youtubeChannelId, 'hq'),
  ])
  return { featured: chooseFeatured({ live, lewisville, hq, now }), lewisville }
}
