import type { Metadata } from 'next'
import { PageHero } from '@/components/site/PageHero'
import { Section } from '@/components/site/Section'
import { FeaturedMessage } from '@/components/site/FeaturedMessage'
import { SermonCard } from '@/components/site/SermonCard'
import { Alert } from '@/components/site/Alert'
import { buttonVariants } from '@/components/ui/button'
import { getMessages } from '@/lib/sermons-data'
import { SITE_CONFIG } from '@/lib/constants'
import congregationPrayer from '@/app/assets/CongregationPrayer.jpeg'

export const metadata: Metadata = {
  title: 'Sermons',
  description: `Watch ${SITE_CONFIG.name} services live on YouTube on Sundays at 9:30 AM, and catch up on recent messages.`,
  alternates: { canonical: '/sermons' },
}

export default async function SermonsPage() {
  const { featured, lewisville } = await getMessages()
  const featuredId = featured.kind === 'unavailable' ? null : featured.video.id
  const recent = (lewisville ?? []).filter((video) => video.id !== featuredId).slice(0, 6)

  return (
    <>
      <PageHero title="Sermons" sentence="Watch our services live on Sundays, or catch up on recent messages." photo={congregationPrayer} />

      <Section id="latest" title="Latest message">
        <FeaturedMessage featured={featured} />
      </Section>

      <Section id="recent" tone="paper" title="Recent services from Lewisville">
        {lewisville === null ? (
          <Alert tone="info" title="We couldn’t load our recent services right now.">
            <p>
              They are all on{' '}
              <a href={SITE_CONFIG.youtube.channel} className="font-semibold underline underline-offset-4">
                our YouTube channel
              </a>
              .
            </p>
          </Alert>
        ) : (
          <ul className="grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((video) => (
              <li key={video.id}>
                <SermonCard video={video} />
              </li>
            ))}
          </ul>
        )}
        <p className="mt-8">
          <a href={SITE_CONFIG.youtube.channel} className={buttonVariants({ variant: 'secondary' })}>
            All videos on YouTube
          </a>
        </p>
      </Section>

      <Section id="headquarters" title="From DCLM Headquarters, Lagos">
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <a href={SITE_CONFIG.dclm.webcast} className="font-semibold text-emblem-sky-700 underline underline-offset-4">
              webcast.dclm.org
            </a>
          </li>
          <li>
            <a href={SITE_CONFIG.dclm.followUs} className="font-semibold text-emblem-sky-700 underline underline-offset-4">
              dclm.org/followus
            </a>
          </li>
        </ul>
      </Section>
    </>
  )
}
