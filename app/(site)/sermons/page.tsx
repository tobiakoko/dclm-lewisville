import type { Metadata } from 'next'
import { PageHero } from '@/components/site/PageHero'
import { Section } from '@/components/site/Section'
import { LiteYouTube } from '@/components/site/LiteYouTube'
import { NextLiveCard } from '@/components/site/NextLiveCard'
import { SermonCard, SourceChip, formatVideoDate } from '@/components/site/SermonCard'
import { Alert } from '@/components/site/Alert'
import { ArrowLink } from '@/components/ui/arrow-link'
import { Chip } from '@/components/ui/chip'
import { buttonVariants } from '@/components/ui/button'
import { SERMONS } from '@/lib/content/interface'
import { getMessages } from '@/lib/sermons-data'
import { getSiteData } from '@/lib/data'

export async function generateMetadata(): Promise<Metadata> {
  const { config } = await getSiteData()
  return {
    title: 'Sermons',
    description: `Watch ${config.name} services live on YouTube on Sundays, and catch up on recent messages.`,
    alternates: { canonical: '/sermons' },
  }
}

export default async function SermonsPage() {
  const { config, schedule } = await getSiteData()
  const { featured, lewisville } = await getMessages(config)
  const featuredId = featured.kind === 'unavailable' ? null : featured.video.id
  const recent = (lewisville ?? []).filter((video) => video.id !== featuredId).slice(0, 6)

  // The top slot: live now, the latest Lewisville service, or the latest headquarters message;
  // never a placeholder video
  const media =
    featured.kind === 'unavailable' ? (
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
      <figure id="latest">
        <LiteYouTube id={featured.video.id} title={featured.video.title ?? 'Live service'} sizes="(min-width: 960px) 560px, 100vw" />
        <figcaption className="mt-4 flex flex-col items-start gap-2">
          {featured.kind === 'live' ? (
            <Chip tone="red">Live now</Chip>
          ) : (
            <SourceChip source={featured.video.source} />
          )}
          <span className="type-h4 text-navy-900">{featured.video.title ?? 'Live service'}</span>
          {featured.kind !== 'live' && (
            <time dateTime={featured.video.published} className="text-base text-ink-muted">
              {formatVideoDate(featured.video.published)}
            </time>
          )}
        </figcaption>
      </figure>
    )

  return (
    <>
      <PageHero eyebrow={SERMONS.eyebrow} title={SERMONS.title} lead={SERMONS.lead} media={media}>
        <NextLiveCard schedule={schedule} streamsUrl={config.youtube.streams} />
      </PageHero>

      <Section
        id="recent"
        title="Recent services from Lewisville"
        action={
          <a href={config.youtube.channel} className={buttonVariants({ variant: 'secondary' })}>
            All videos on YouTube
          </a>
        }
      >
        {lewisville === null ? (
          <Alert tone="info" title="We couldn’t load our recent services right now.">
            <p>
              They are all on{' '}
              <a href={config.youtube.channel} className="font-semibold underline underline-offset-4">
                our YouTube channel
              </a>
              .
            </p>
          </Alert>
        ) : (
          <ul className="grid list-none gap-6 sm:grid-cols-2 wide:grid-cols-3">
            {recent.map((video) => (
              <li key={video.id}>
                <SermonCard video={video} churchName={config.name} />
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section id="headquarters" tone="sky" size="md" title="From DCLM Headquarters, Lagos">
        <ul className="flex list-none flex-wrap gap-x-8 gap-y-2">
          <li>
            <ArrowLink href={config.dclm.webcast}>webcast.dclm.org</ArrowLink>
          </li>
          <li>
            <ArrowLink href={config.dclm.followUs}>dclm.org/followus</ArrowLink>
          </li>
        </ul>
      </Section>
    </>
  )
}
