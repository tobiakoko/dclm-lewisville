import { client } from '@/lib/sanity/client'
import { ministryQuery } from '@/lib/sanity/queries'
import { notFound, permanentRedirect } from 'next/navigation'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { MINISTRIES, OUTREACH, type Ministry } from '@/lib/content/site'
import { PageHero } from '@/components/site/PageHero'
import { Section } from '@/components/site/Section'
import { buttonVariants } from '@/components/ui/button'

interface SanityMinistry {
  name: string
  description?: string
  fullDescription?: PortableTextBlock[]
  leader?: { name: string; title?: string; bio?: PortableTextBlock[] } | null
  meetingDay?: string
  meetingTime?: string
}

// Sanity errors throw (error page). A ministry gets its own page only once it has a Sanity
// document with fuller content; until then its old URL redirects to its card on /ministries
// (BUILD-PLAN 2.8), so outside links keep working.
async function getMinistry(slug: string): Promise<SanityMinistry | null> {
  return client.fetch<SanityMinistry | null>(ministryQuery, { slug })
}

function isKnownSlug(slug: string): boolean {
  return [...MINISTRIES, ...OUTREACH].some((ministry: Ministry) => ministry.slug === slug)
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const ministry = await getMinistry(slug)
  return { title: ministry ? ministry.name : 'Ministry not found' }
}

export default async function MinistryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const ministry = await getMinistry(slug)
  if (!ministry) {
    if (isKnownSlug(slug)) permanentRedirect(`/ministries#${slug}`)
    notFound()
  }

  return (
    <>
      <PageHero title={ministry.name} sentence={ministry.description} />
      <Section>
        <div className="max-w-prose space-y-6">
          {ministry.fullDescription && (
            <div className="space-y-4">
              <PortableText value={ministry.fullDescription} />
            </div>
          )}
          {ministry.meetingDay && ministry.meetingTime && (
            <p>
              <strong>Meets:</strong> {ministry.meetingDay}, {ministry.meetingTime}
            </p>
          )}
          {ministry.leader && (
            <section aria-labelledby="leader-heading" className="space-y-2">
              <h2 id="leader-heading">{ministry.leader.name}</h2>
              {ministry.leader.title && <p className="text-ink-muted">{ministry.leader.title}</p>}
              {ministry.leader.bio && (
                <div className="space-y-4">
                  <PortableText value={ministry.leader.bio} />
                </div>
              )}
            </section>
          )}
          <p className="flex flex-wrap gap-3">
            <Link
              href={`/contact?topic=${encodeURIComponent(ministry.name)}#contact-form`}
              className={buttonVariants({ variant: 'secondary' })}
            >
              Send us a message
            </Link>
            <Link href="/ministries" className={buttonVariants({ variant: 'link' })}>
              All ministries
            </Link>
          </p>
        </div>
      </Section>
    </>
  )
}
