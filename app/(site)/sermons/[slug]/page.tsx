import { client } from '@/lib/sanity/client'
import { sermonQuery } from '@/lib/sanity/queries'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { formatDate } from '@/lib/utils'
import { youTubeEmbedUrl, youTubeId } from '@/lib/youtube'
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
    <article className="bg-white">
      <header className="bg-(--church-navy) text-white pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <Link href="/sermons" className="underline underline-offset-4">
            Sermons
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight">{sermon.title}</h1>
          <p>
            <time dateTime={sermon.date}>{formatDate(sermon.date)}</time>
            {sermon.speaker?.name && <> · {sermon.speaker.name}</>}
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        {videoId && (
          <div className="aspect-video bg-black rounded-2xl overflow-hidden">
            <iframe
              src={youTubeEmbedUrl(videoId)}
              className="w-full h-full"
              title={sermon.title}
              loading="lazy"
              allow="clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {sermon.audioUrl && (
          <audio controls preload="none" className="w-full" src={sermon.audioUrl}>
            <a href={sermon.audioUrl}>Download the audio</a>
          </audio>
        )}

        {sermon.description && <p className="text-lg text-slate-700 leading-relaxed">{sermon.description}</p>}

        {sermon.scripture && sermon.scripture.length > 0 && (
          <section aria-labelledby="scripture-heading">
            <h2 id="scripture-heading" className="font-serif text-2xl font-bold text-(--church-navy) mb-3">
              Scripture
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              {sermon.scripture.map((ref) => (
                <li key={ref}>{ref}</li>
              ))}
            </ul>
          </section>
        )}

        {sermon.transcript && sermon.transcript.length > 0 && (
          <section aria-labelledby="transcript-heading" className="prose prose-lg max-w-none">
            <h2 id="transcript-heading">Transcript</h2>
            <PortableText value={sermon.transcript} />
          </section>
        )}

        <div className="max-w-xs">
          <ShareButton title={sermon.title} />
        </div>
      </div>
    </article>
  )
}
