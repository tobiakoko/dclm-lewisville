import { SERVICE_TIMES, SITE_CONFIG } from '@/lib/constants'
import { formatClock } from '@/lib/schedule'
import type { FeaturedMessage as Featured } from '@/lib/sermons'
import { LiteYouTube } from '@/components/site/LiteYouTube'
import { SourceBadge, formatVideoDate } from '@/components/site/SermonCard'
import { Alert } from '@/components/site/Alert'

const sundayWorship = SERVICE_TIMES.find((service) => service.id === 'sunday-worship')

/** "Next live: Sunday 9:30 AM CT on <streams link>" (SITE-CONTENT.md §7) */
export function NextLiveLine() {
  if (!sundayWorship) return null
  return (
    <p>
      Next live: {sundayWorship.day} {formatClock(sundayWorship.start)} CT on{' '}
      <a href={SITE_CONFIG.youtube.streams} className="break-all font-semibold text-emblem-sky-700 underline underline-offset-4">
        {SITE_CONFIG.youtube.streams.replace('https://www.', '')}
      </a>
    </p>
  )
}

/**
 * The top slot: live now; otherwise the latest real Lewisville service; otherwise the latest
 * headquarters message, clearly labeled. Never a placeholder sermon or speaker.
 */
export function FeaturedMessage({ featured, headingLevel = 3 }: { featured: Featured; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3'

  if (featured.kind === 'unavailable') {
    return (
      <Alert tone="info" title="We couldn’t load the latest videos right now.">
        <p>
          Watch on{' '}
          <a href={SITE_CONFIG.youtube.channel} className="font-semibold underline underline-offset-4">
            our YouTube channel
          </a>{' '}
          instead.
        </p>
      </Alert>
    )
  }

  const { video } = featured
  const title = featured.kind === 'live' ? (video.title ?? 'Live service') : featured.video.title

  return (
    <div className="grid items-start gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <LiteYouTube id={video.id} title={title} />
      </div>
      <div className="space-y-3 lg:col-span-2">
        {featured.kind === 'live' && (
          <p className="inline-flex items-center gap-2 rounded-full bg-heaven-700 px-3 py-1 font-semibold text-white">
            <span className="size-2 rounded-full bg-white" aria-hidden="true" />
            Live now
          </p>
        )}
        {featured.kind === 'hq' && <p className="font-semibold text-navy-900">From DCLM Headquarters, Lagos</p>}
        <Heading className="text-2xl">{title}</Heading>
        {featured.kind !== 'live' && (
          <>
            <SourceBadge source={featured.video.source} />
            <p className="text-ink-muted">
              <time dateTime={featured.video.published}>{formatVideoDate(featured.video.published)}</time>
            </p>
          </>
        )}
        <NextLiveLine />
      </div>
    </div>
  )
}
