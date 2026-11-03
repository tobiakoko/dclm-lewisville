import Image, { type StaticImageData } from 'next/image'
import type { PhotoSource } from '@/components/site/photo'
import type { MinistryWithDetails } from '@/lib/data'
import { Paragraphs } from '@/components/content/RichText'
import { ArrowLink } from '@/components/ui/arrow-link'
import { Eyebrow } from '@/components/ui/eyebrow'
import { IconTile } from '@/components/ui/icon-tile'
import { CardDark } from '@/components/ui/surface'
import { Flame } from 'lucide-react'
import { plainText, type Paragraph } from '@/lib/content/inline'
import { cn } from '@/lib/utils'

export interface MinistryPhoto {
  src: StaticImageData
  alt: string
}

/** The contact action every ministry and outreach area keeps: its own email, or the prefilled form */
export function MinistryContact({ ministry }: { ministry: MinistryWithDetails }) {
  return ministry.contactEmail ? (
    <ArrowLink href={`mailto:${ministry.contactEmail}`}>Email {ministry.name}</ArrowLink>
  ) : (
    <ArrowLink href={`/contact?topic=${encodeURIComponent(ministry.name)}#contact-form`}>
      Send us a message<span className="sr-only"> about {ministry.name}</span>
    </ArrowLink>
  )
}

/**
 * Splits off the sentence that sends people in danger to 911 and 988, so it can be shown as the
 * crisis notice, word for word. Paragraphs with emphasis are left whole.
 */
export function splitCrisisNotice(paragraphs: Paragraph[]): { body: Paragraph[]; crisis: string | null } {
  for (const [index, paragraph] of paragraphs.entries()) {
    if (!paragraph.every((segment) => typeof segment === 'string')) continue
    const text = plainText(paragraph)
    const sentences = text.split(/(?<=[.!?])\s+/)
    const crisisIndex = sentences.findIndex((sentence) => /\b911\b/.test(sentence) && /\b988\b/.test(sentence))
    if (crisisIndex === -1) continue
    const rest = sentences.filter((_, i) => i !== crisisIndex).join(' ')
    const body = [...paragraphs.slice(0, index), ...(rest ? [[rest]] : []), ...paragraphs.slice(index + 1)]
    return { body, crisis: sentences[crisisIndex] }
  }
  return { body: paragraphs, crisis: null }
}

/** A ministry as an alternating photo-and-text row (photo first on phones); a navy panel without a photo */
export function MinistryRow({
  ministry,
  photo,
  reverse,
  panelLine,
}: {
  ministry: MinistryWithDetails
  photo?: PhotoSource
  /** Photo on the right */
  reverse?: boolean
  /** Shown in the navy panel when there is no photo */
  panelLine?: string
}) {
  return (
    <article id={ministry.slug} className="grid scroll-mt-24 items-center gap-7 wide:grid-cols-2 wide:gap-16">
      <div className={cn(reverse && 'wide:order-2')}>
        {photo ? (
          <div className="relative aspect-[3/2] overflow-hidden rounded-card bg-paper">
            <Image
              src={photo.src}
              alt={photo.alt}
              placeholder={photo.blurDataURL || typeof photo.src !== 'string' ? 'blur' : 'empty'}
              blurDataURL={photo.blurDataURL}
              fill
              sizes="(min-width: 960px) 560px, 100vw"
              className="object-cover"
            />
          </div>
        ) : (
          <CardDark className="flex aspect-[3/2] flex-col justify-end gap-5 p-8 sm:p-10">
            <IconTile tone="dark">
              <Flame />
            </IconTile>
            {panelLine && <p className="font-serif text-[clamp(1.5rem,2.4vw,2rem)] font-semibold leading-snug text-white">{panelLine}</p>}
          </CardDark>
        )}
      </div>
      <div>
        {ministry.audience && <Eyebrow className="mb-3">{ministry.audience}</Eyebrow>}
        <h3 className="text-[clamp(1.875rem,3vw,2.25rem)] leading-tight">{ministry.name}</h3>
        <div className="mt-4 max-w-prose space-y-3 text-ink-muted">
          <Paragraphs paragraphs={ministry.paragraphs} />
        </div>
        {ministry.meetingInfo && (
          <p className="mt-3">
            <span className="font-bold text-navy-900">When: </span>
            {ministry.meetingInfo}
          </p>
        )}
        <div className="mt-5">
          <MinistryContact ministry={ministry} />
        </div>
      </div>
    </article>
  )
}
