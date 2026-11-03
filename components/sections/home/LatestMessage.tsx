import { nextLiveText } from '@/lib/schedule'
import type { ServiceTime, SiteConfig } from '@/lib/constants'
import { videoUrl, type FeaturedMessage, type Video } from '@/lib/sermons'
import { HOME } from '@/lib/content/interface'
import { Section } from '@/components/site/Section'
import { LiteYouTube } from '@/components/site/LiteYouTube'
import { MiniSermonRow, SOURCE_CHIP, formatVideoDate } from '@/components/site/SermonCard'
import { Alert } from '@/components/site/Alert'
import { ArrowLink } from '@/components/ui/arrow-link'
import { Chip } from '@/components/ui/chip'
import { buttonVariants } from '@/components/ui/button'

/**
 * The page's one navy band (REDESIGN.md §3.6): the live, latest or headquarters message, and up to
 * three recent Lewisville services from the RSS feed. Never a placeholder video.
 */
export function LatestMessage({
  featured,
  recent,
  config,
  schedule,
}: {
  featured: FeaturedMessage
  recent: Video[] | null
  config: SiteConfig
  schedule: ServiceTime[]
}) {
  const nextLive = nextLiveText(schedule)
  const featuredId = featured.kind === 'unavailable' ? null : featured.video.id
  const more = (recent ?? []).filter((video) => video.id !== featuredId).slice(0, 3)

  return (
    <Section
      id="latest-message"
      tone="navy"
      eyebrow={HOME.eyebrows.sermons}
      title="Latest message"
      action={
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {nextLive && <Chip tone="dark" className="h-10 px-4 text-[0.9375rem]">{nextLive}</Chip>}
          <ArrowLink href="/sermons">All sermons</ArrowLink>
        </div>
      }
    >
      {featured.kind === 'unavailable' ? (
        <Alert tone="info" title="We couldn’t load the latest videos right now.">
          <p>
            Watch on{' '}
            <a href={config.youtube.channel} className="font-semibold underline underline-offset-4">
              our YouTube channel
            </a>{' '}
            instead.
          </p>
        </Alert>
      ) : (
        <div className="grid items-start gap-10 wide:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] wide:gap-14">
          <LiteYouTube id={featured.video.id} title={featured.video.title ?? 'Live service'} />
          <div>
            {featured.kind === 'live' ? (
              <Chip tone="red">
                <span aria-hidden="true" className="size-2 rounded-full bg-heaven-600 motion-safe:animate-pulse" />
                Live now
              </Chip>
            ) : (
              <Chip tone="dark">{SOURCE_CHIP[featured.video.source]}</Chip>
            )}
            <h3 className="mt-5 text-[clamp(1.625rem,2.4vw,2rem)] leading-tight">{featured.video.title ?? 'Live service'}</h3>
            {featured.kind !== 'live' && (
              <p className="mt-3 text-base">
                <time dateTime={featured.video.published}>{formatVideoDate(featured.video.published)}</time>
              </p>
            )}
            <a href={videoUrl(featured.video.id)} className={`${buttonVariants({ variant: 'light' })} mt-6`}>
              Watch message
            </a>
            {more.length > 0 && (
              <div className="mt-8 border-t border-white/14 pt-8">
                <h3 className="type-h5">Recent from Lewisville</h3>
                <ul className="mt-5 flex list-none flex-col gap-4">
                  {more.map((video) => (
                    <li key={video.id}>
                      <MiniSermonRow video={video} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </Section>
  )
}
