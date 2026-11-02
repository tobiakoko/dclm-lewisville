import { RECENT_DAYS, chooseFeatured, latestHqMessage, parseLivePage, parseYouTubeFeed, type Video } from '@/lib/sermons'

const FEED = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns:yt="http://www.youtube.com/xml/schemas/2015" xmlns="http://www.w3.org/2005/Atom">
  <title>Channel</title>
  <published>2025-09-07T15:05:28+00:00</published>
  <entry>
    <yt:videoId>aaaaaaaaaaa</yt:videoId>
    <title>Older service</title>
    <published>2026-06-29T05:06:17+00:00</published>
  </entry>
  <entry>
    <yt:videoId>bbbbbbbbbbb</yt:videoId>
    <title>Sunday Worship Service|| Praise&amp;Worship&#39;s day</title>
    <published>2026-07-06T04:20:53+00:00</published>
  </entry>
  <entry>
    <title>No id, skipped</title>
    <published>2026-07-07T00:00:00+00:00</published>
  </entry>
</feed>`

const NOW = new Date('2026-11-02T12:00:00Z')

function video(id: string, published: string, source: Video['source'] = 'lewisville', title = id): Video {
  return { id, title, published, source }
}

describe('parseYouTubeFeed', () => {
  it('reads entries newest first, decodes entities and skips incomplete entries', () => {
    const videos = parseYouTubeFeed(FEED, 'lewisville')
    expect(videos.map((v) => v.id)).toEqual(['bbbbbbbbbbb', 'aaaaaaaaaaa'])
    expect(videos[0].title).toBe("Sunday Worship Service|| Praise&Worship's day")
    expect(videos[0].source).toBe('lewisville')
  })

  it('returns nothing for a feed without entries', () => {
    expect(parseYouTubeFeed('<feed></feed>', 'hq')).toEqual([])
  })
})

describe('parseLivePage', () => {
  const canonical = '<link rel="canonical" href="https://www.youtube.com/watch?v=ccccccccccc">'

  it('detects a stream that is live now', () => {
    expect(parseLivePage(`${canonical}<meta name="title" content="Sunday &amp; Worship">"isLiveNow":true`)).toEqual({
      id: 'ccccccccccc',
      title: 'Sunday & Worship',
    })
  })

  it('ignores a scheduled stream that has not started', () => {
    expect(parseLivePage(`${canonical}"isLive":true,"isUpcoming":true`)).toBeNull()
  })

  it('ignores a channel page with no stream', () => {
    expect(parseLivePage('<link rel="canonical" href="https://www.youtube.com/channel/UCx">')).toBeNull()
  })
})

describe('chooseFeatured (top slot of Sermons and Home)', () => {
  const recent = video('recent', '2026-10-26T15:00:00Z')
  const old = video('old', '2026-07-06T04:20:53Z')
  const hqChoir = video('choir', '2026-11-01T13:00:00Z', 'hq', 'Global Choir || November 1st, 2026')
  const hqService = video('service', '2026-11-01T12:00:00Z', 'hq', 'Worship Service || November 1, 2026')

  it('shows the live stream first', () => {
    const featured = chooseFeatured({ live: { id: 'live1234567', title: 'Live' }, lewisville: [recent], hq: [hqService], now: NOW })
    expect(featured).toEqual({ kind: 'live', video: { id: 'live1234567', title: 'Live', source: 'lewisville' } })
  })

  it(`shows the latest Lewisville service from the last ${RECENT_DAYS} days`, () => {
    expect(chooseFeatured({ live: null, lewisville: [recent, old], hq: [hqService], now: NOW })).toEqual({ kind: 'latest', video: recent })
  })

  it('falls to the latest headquarters service when Lewisville has nothing recent, skipping choir items', () => {
    expect(chooseFeatured({ live: null, lewisville: [old], hq: [hqChoir, hqService], now: NOW })).toEqual({ kind: 'hq', video: hqService })
  })

  it('still shows a real older Lewisville service if headquarters is unavailable', () => {
    expect(chooseFeatured({ live: null, lewisville: [old], hq: null, now: NOW })).toEqual({ kind: 'latest', video: old })
  })

  it('reports unavailable rather than inventing a sermon', () => {
    expect(chooseFeatured({ live: null, lewisville: null, hq: null, now: NOW })).toEqual({ kind: 'unavailable' })
    expect(chooseFeatured({ live: null, lewisville: [], hq: [], now: NOW })).toEqual({ kind: 'unavailable' })
  })

  it('uses the newest headquarters upload when none looks like a service', () => {
    expect(latestHqMessage([hqChoir])).toBe(hqChoir)
    expect(latestHqMessage([])).toBeNull()
  })
})
