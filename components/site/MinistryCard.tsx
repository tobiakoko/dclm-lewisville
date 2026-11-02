import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import type { Ministry } from '@/lib/content/site'
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
  ministry: Ministry
  photo?: MinistryPhoto
  headingLevel?: 2 | 3
}) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3'
  return (
    <article id={ministry.slug} className="flex h-full scroll-mt-24 flex-col overflow-hidden rounded-2xl border border-border-input/40 bg-white">
      {photo && (
        <div className="relative aspect-4/3">
          <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <Heading className="text-2xl">{ministry.name}</Heading>
        <div className="max-w-prose space-y-3">
          <Paragraphs paragraphs={ministry.paragraphs} />
        </div>
        <p className="mt-auto pt-2">
          {/* TODO(content): ministry-specific contacts; until then every ministry links to the contact form */}
          <Link href={`/contact?topic=${encodeURIComponent(ministry.name)}#contact-form`} className={buttonVariants({ variant: 'secondary', size: 'sm' })}>
            Send us a message<span className="sr-only"> about {ministry.name}</span>
          </Link>
        </p>
      </div>
    </article>
  )
}
