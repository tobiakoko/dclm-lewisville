import { client } from '@/lib/sanity/client'
import { ministryQuery } from '@/lib/sanity/queries'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { MINISTRIES, findMinistry, type Ministry } from '@/lib/content/site'
import { Paragraphs } from '@/components/content/RichText'

interface SanityMinistry {
  name: string
  description?: string
  fullDescription?: PortableTextBlock[]
  leader?: { name: string; title?: string; bio?: PortableTextBlock[] } | null
  meetingDay?: string
  meetingTime?: string
}

type PageData = { source: 'sanity'; ministry: SanityMinistry } | { source: 'content'; ministry: Ministry }

// Sanity errors throw (error page); approved copy from SITE-CONTENT.md §6 is the content, not a fallback.
async function getMinistry(slug: string): Promise<PageData | null> {
  const fromSanity = await client.fetch<SanityMinistry | null>(ministryQuery, { slug })
  if (fromSanity) return { source: 'sanity', ministry: fromSanity }
  const approved = findMinistry(slug)
  return approved ? { source: 'content', ministry: approved } : null
}

export function generateStaticParams() {
  return MINISTRIES.map((ministry) => ({ slug: ministry.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = await getMinistry(slug)
  if (!data) return { title: 'Ministry not found' }
  return { title: data.ministry.name }
}

export default async function MinistryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = await getMinistry(slug)
  if (!data) notFound()

  const { ministry } = data

  return (
    <article className="bg-white">
      <header className="bg-(--church-navy) text-white pt-32 pb-16 px-6">
        <div className="max-w-3xl mx-auto space-y-4">
          <Link href="/ministries" className="underline underline-offset-4">
            Ministries
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl font-bold">{ministry.name}</h1>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12 space-y-8 text-lg text-slate-700 leading-relaxed">
        {data.source === 'content' ? (
          <Paragraphs paragraphs={data.ministry.paragraphs} />
        ) : (
          <>
            {data.ministry.fullDescription ? (
              <div className="prose prose-lg max-w-none">
                <PortableText value={data.ministry.fullDescription} />
              </div>
            ) : (
              data.ministry.description && <p>{data.ministry.description}</p>
            )}
            {data.ministry.meetingDay && data.ministry.meetingTime && (
              <p>
                <strong>Meets:</strong> {data.ministry.meetingDay}, {data.ministry.meetingTime}
              </p>
            )}
            {data.ministry.leader && (
              <section aria-labelledby="leader-heading" className="space-y-2">
                <h2 id="leader-heading" className="font-serif text-2xl font-bold text-(--church-navy)">
                  {data.ministry.leader.name}
                </h2>
                {data.ministry.leader.title && <p className="text-slate-600">{data.ministry.leader.title}</p>}
                {data.ministry.leader.bio && (
                  <div className="prose max-w-none">
                    <PortableText value={data.ministry.leader.bio} />
                  </div>
                )}
              </section>
            )}
          </>
        )}

        <p>
          <Link
            href={`/contact?topic=${encodeURIComponent(ministry.name)}`}
            className="inline-flex px-8 py-3.5 bg-(--church-navy) text-white rounded-full font-bold text-base"
          >
            Send us a message
          </Link>
        </p>
      </div>
    </article>
  )
}
