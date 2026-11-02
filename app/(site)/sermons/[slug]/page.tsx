import { client } from '@/lib/sanity/client'
import { sermonQuery } from '@/lib/sanity/queries'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { formatDate } from '@/lib/utils'
import { youTubeId } from '@/lib/youtube'
import { PageHero } from '@/components/site/PageHero'
import { Section } from '@/components/site/Section'
import { LiteYouTube } from '@/components/site/LiteYouTube'
import { buttonVariants } from '@/components/ui/button'
import ShareButton from '@/components/ui/share-button'

interface SermonDetail {
  title: string
  date: string
  description?: string
  speaker?: { name: string; title?: string } | null
  scripture?: string[]
  videoUrl?: string
  audioUrl?: string | null
  transcript?: PortableTextBlock[]
}

// A Sanity failure throws and renders the error page; it never falls back to sample content.
async function getSermon(slug: string): Promise<SermonDetail | null> {
  return client.fetch<SermonDetail | null>(sermonQuery, { slug })
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const sermon = await getSermon(slug)
  if (!sermon) return { title: 'Sermon not found' }
  return { title: sermon.title, description: sermon.description }
}

export default async function SermonDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const sermon = await getSermon(slug)
  if (!sermon) notFound()

  const videoId = youTubeId(sermon.videoUrl)

  return (
    <>
      <PageHero title={sermon.title}>
        <p>
          <time dateTime={sermon.date}>{formatDate(sermon.date)}</time>
          {sermon.speaker?.name && <> · {sermon.speaker.name}</>}
        </p>
      </PageHero>

      <Section>
        <div className="max-w-3xl space-y-8">
          {videoId && <LiteYouTube id={videoId} title={sermon.title} />}

          {sermon.audioUrl && (
            <audio controls preload="none" className="w-full" src={sermon.audioUrl}>
              <a href={sermon.audioUrl}>Download the audio</a>
            </audio>
          )}

          {sermon.description && <p className="max-w-prose">{sermon.description}</p>}

          {sermon.scripture && sermon.scripture.length > 0 && (
            <section aria-labelledby="scripture-heading">
              <h2 id="scripture-heading" className="mb-3">
                Scripture
              </h2>
              <ul className="list-disc space-y-1 pl-6">
                {sermon.scripture.map((ref) => (
                  <li key={ref}>{ref}</li>
                ))}
              </ul>
            </section>
          )}

          {sermon.transcript && sermon.transcript.length > 0 && (
            <section aria-labelledby="transcript-heading" className="max-w-prose space-y-4">
              <h2 id="transcript-heading">Transcript</h2>
              <PortableText value={sermon.transcript} />
            </section>
          )}

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
