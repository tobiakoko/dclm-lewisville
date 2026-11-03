import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { formatDate } from '@/lib/utils'
import { getSermon, getSiteData } from '@/lib/data'
import { getMessages } from '@/lib/sermons-data'
import { nextLiveText } from '@/lib/schedule'
import { videoUrl } from '@/lib/sermons'
import { PageHero } from '@/components/site/PageHero'
import { Section } from '@/components/site/Section'
import { LiteYouTube } from '@/components/site/LiteYouTube'
import { MiniSermonRow, SourceChip } from '@/components/site/SermonCard'
import { ArrowLink } from '@/components/ui/arrow-link'
import { CardLine } from '@/components/ui/surface'
import ShareButton from '@/components/ui/share-button'

// A sermon page exists only for a real Sanity document; a Sanity failure renders the error
// page, never sample content.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const sermon = await getSermon(slug)
  if (!sermon) return { title: 'Sermon not found' }
  return { title: sermon.title, description: sermon.description ?? undefined, alternates: { canonical: `/sermons/${slug}` } }
}

/** REDESIGN.md §4, Sermon detail */
export default async function SermonDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const sermon = await getSermon(slug)
  if (!sermon) notFound()
  const { config, schedule } = await getSiteData()
  const { lewisville } = await getMessages(config)
  const more = (lewisville ?? []).filter((video) => video.id !== sermon.youtubeId).slice(0, 3)
  const nextLive = nextLiveText(schedule)

  return (
    <>
      <PageHero
        eyebrow="Sermon"
        title={sermon.title}
        lead={
          <p className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <SourceChip source={sermon.source} />
            {sermon.speaker && <span>{sermon.speaker} ·</span>}
            <time dateTime={sermon.date}>{formatDate(sermon.date)}</time>
          </p>
        }
      />

      <Section>
        <div className="grid items-start gap-10 wide:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] wide:gap-14">
          <div>
            <LiteYouTube id={sermon.youtubeId} title={sermon.title} />
            {sermon.description && <p className="mt-8 max-w-prose">{sermon.description}</p>}
          </div>
          <CardLine className="flex flex-col items-start gap-4 p-6">
            <ShareButton title={sermon.title} />
            <ArrowLink href={videoUrl(sermon.youtubeId)}>Watch on YouTube</ArrowLink>
            <ArrowLink href="/sermons">All sermons</ArrowLink>
            {nextLive && <p className="tabular border-t border-line pt-4 text-base font-bold text-navy-900">{nextLive}</p>}
          </CardLine>
        </div>
      </Section>

      {more.length > 0 && (
        <Section id="more" tone="sky" size="md" title="More messages">
          <ul className="grid list-none gap-5 wide:grid-cols-3">
            {more.map((video) => (
              <li key={video.id}>
                <MiniSermonRow video={video} />
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  )
}
