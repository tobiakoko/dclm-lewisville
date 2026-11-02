import Image, { type StaticImageData } from 'next/image'
import type { PhotoSource } from '@/components/site/photo'
import Link from 'next/link'
import type { MinistryWithDetails } from '@/lib/data'
import { Paragraphs } from '@/components/content/RichText'
import { buttonVariants } from '@/components/ui/button'

export interface MinistryPhoto {
  src: StaticImageData
  alt: string
}

/** Who it's for and what happens (approved copy), and always a way to join */
export function MinistryCard({
  ministry,
  photo,
  headingLevel = 3,
}: {
  ministry: MinistryWithDetails
  photo?: PhotoSource
  headingLevel?: 2 | 3
}) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3'
  return (
    <article id={ministry.slug} className="flex h-full scroll-mt-24 flex-col overflow-hidden rounded-2xl border border-border-input/40 bg-white">
      {photo && (
        <div className="relative aspect-4/3">
          <Image src={photo.src} alt={photo.alt} placeholder={photo.blurDataURL ? 'blur' : 'empty'} blurDataURL={photo.blurDataURL} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <Heading className="text-2xl">{ministry.name}</Heading>
        <div className="max-w-prose space-y-3">
          <Paragraphs paragraphs={ministry.paragraphs} />
        </div>
        {(ministry.audience || ministry.meetingInfo) && (
          <dl className="space-y-1">
            {ministry.audience && (
              <div>
                <dt className="inline font-semibold">Who it’s for: </dt>
                <dd className="inline">{ministry.audience}</dd>
              </div>
            )}
            {ministry.meetingInfo && (
              <div>
                <dt className="inline font-semibold">When: </dt>
                <dd className="inline">{ministry.meetingInfo}</dd>
              </div>
            )}
          </dl>
        )}
        <p className="mt-auto pt-2">
          {/* A ministry's own church address if set in Sanity; otherwise the contact form, prefilled */}
          {ministry.contactEmail ? (
            <a href={`mailto:${ministry.contactEmail}`} className={buttonVariants({ variant: 'secondary', size: 'sm' })}>
              Email {ministry.name}
            </a>
          ) : (
            <Link href={`/contact?topic=${encodeURIComponent(ministry.name)}#contact-form`} className={buttonVariants({ variant: 'secondary', size: 'sm' })}>
              Send us a message<span className="sr-only"> about {ministry.name}</span>
            </Link>
          )}
        </p>
      </div>
    </article>
  )
}
