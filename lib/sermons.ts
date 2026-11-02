// Latest messages for the Sermons page and the home page (BUILD-PLAN 2.9, SITE-CONTENT.md §7).
// Lewisville uploads come from the channel's public RSS feed; no API key is involved.

export type SermonSource = 'lewisville' | 'hq'

export interface Video {
  id: string
  title: string
  /** ISO 8601 */
  published: string
  source: SermonSource
}

/** What the top slot shows, in priority order */
export type FeaturedMessage =
  | { kind: 'live'; video: Pick<Video, 'id' | 'source'> & { title: string | null } }
  | { kind: 'latest'; video: Video }
  | { kind: 'hq'; video: Video }
  | { kind: 'unavailable' }

/** A Lewisville upload older than this gives way to the latest headquarters message */
export const RECENT_DAYS = 21

export const FEED_REVALIDATE_SECONDS = 30 * 60
export const LIVE_REVALIDATE_SECONDS = 60

const ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" }

function decode(text: string): string {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, entity: string) => {
    if (entity[0] === '#') {
      const code = entity[1] === 'x' || entity[1] === 'X' ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10)
      return Number.isFinite(code) ? String.fromCodePoint(code) : match
    }
    return ENTITIES[entity.toLowerCase()] ?? match
  })
}

function tag(xml: string, name: string): string | null {
  const match = new RegExp(`<${name}>([\\s\\S]*?)</${name}>`).exec(xml)
  return match ? decode(match[1].trim()) : null
}

/** Entries of a YouTube channel Atom feed, newest first */
export function parseYouTubeFeed(xml: string, source: SermonSource): Video[] {
  const videos: Video[] = []
  for (const [, entry] of xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)) {
    const id = tag(entry, 'yt:videoId')
    const title = tag(entry, 'title')
    const published = tag(entry, 'published')
    if (!id || !title || !published || Number.isNaN(Date.parse(published))) continue
    videos.push({ id, title, published, source })
  }
  return videos.sort((a, b) => Date.parse(b.published) - Date.parse(a.published))
}

/**
 * Reads the HTML of youtube.com/channel/<id>/live. YouTube points that page at the current or
 * next scheduled stream; it is live only when the page says so and the stream isn't upcoming.
 */
export function parseLivePage(html: string): { id: string; title: string | null } | null {
  const canonical = /<link rel="canonical" href="https:\/\/www\.youtube\.com\/watch\?v=([A-Za-z0-9_-]{11})"/.exec(html)
  if (!canonical) return null
  const liveNow = html.includes('"isLiveNow":true')
  const liveNotUpcoming = html.includes('"isLive":true') && !html.includes('"isUpcoming":true')
  if (!liveNow && !liveNotUpcoming) return null
  const title = /<meta name="title" content="([^"]*)"/.exec(html)
  return { id: canonical[1], title: title ? decode(title[1]) : null }
}

/** Headquarters uploads include choir and other items; prefer an actual service or message */
export function latestHqMessage(videos: Video[]): Video | null {
  return videos.find((video) => /service|message|bible study|revival|sermon|teaching/i.test(video.title)) ?? videos[0] ?? null
}

export function chooseFeatured(input: {
  live: { id: string; title: string | null } | null
  lewisville: Video[] | null
  hq: Video[] | null
  now: Date
}): FeaturedMessage {
  if (input.live) return { kind: 'live', video: { ...input.live, source: 'lewisville' } }

  const latest = input.lewisville?.[0]
  const recentSince = input.now.getTime() - RECENT_DAYS * 24 * 60 * 60 * 1000
  if (latest && Date.parse(latest.published) >= recentSince) return { kind: 'latest', video: latest }

  const hq = input.hq ? latestHqMessage(input.hq) : null
  if (hq) return { kind: 'hq', video: hq }

  // An older Lewisville recording is still real; show it rather than nothing
  if (latest) return { kind: 'latest', video: latest }
  return { kind: 'unavailable' }
}

export function feedUrl(channelId: string): string {
  return `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`
}

export function livePageUrl(channelId: string): string {
  return `https://www.youtube.com/channel/${channelId}/live`
}

export function videoUrl(id: string): string {
  return `https://www.youtube.com/watch?v=${id}`
}

export function thumbnailUrl(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
}
