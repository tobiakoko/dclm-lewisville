import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { getSermon } from '@/lib/data'
import { PageHero } from '@/components/site/PageHero'
import { Section } from '@/components/site/Section'
import { LiteYouTube } from '@/components/site/LiteYouTube'
import { SourceBadge } from '@/components/site/SermonCard'
import { buttonVariants } from '@/components/ui/button'
import ShareButton from '@/components/ui/share-button'

// A sermon page exists only for a real Sanity document; a Sanity failure renders the error
// page, never sample content.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const sermon = await getSermon(slug)
  if (!sermon) return { title: 'Sermon not found' }
  return { title: sermon.title, description: sermon.description ?? undefined, alternates: { canonical: `/sermons/${slug}` } }
}

export default async function SermonDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const sermon = await getSermon(slug)
  if (!sermon) notFound()

  return (
    <>
      <PageHero title={sermon.title}>
        <p>
          <time dateTime={sermon.date}>{formatDate(sermon.date)}</time>
          {sermon.speaker && <> · {sermon.speaker}</>}
        </p>
      </PageHero>

      <Section>
        <div className="max-w-3xl space-y-8">
          <SourceBadge source={sermon.source} />
          <LiteYouTube id={sermon.youtubeId} title={sermon.title} />
          {sermon.description && <p className="max-w-prose">{sermon.description}</p>}
          <p className="flex flex-wrap gap-3">
            <ShareButton title={sermon.title} />
            <Link href="/sermons" className={buttonVariants({ variant: 'link' })}>
              All sermons
            </Link>
          </p>
        </div>
      </Section>
    </>
  )
}
