import Image, { type StaticImageData } from 'next/image'
import type { ReactNode } from 'react'
import { Container } from '@/components/site/Section'
import { Eyebrow } from '@/components/ui/eyebrow'

/**
 * Inner-page header (REDESIGN.md §2): a paper band with the eyebrow, H1, lead and optional
 * actions on the left, and a real photo or a card on the right (6/6, stacking below 960px).
 * Without a photo or media the text spans the full width.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  photo,
  photoAlt = '',
  media,
  children,
}: {
  eyebrow?: ReactNode
  title: ReactNode
  lead?: ReactNode
  photo?: StaticImageData
  /** Describe only what is visible; empty when the photo is decoration */
  photoAlt?: string
  /** A card or figure in place of the photo */
  media?: ReactNode
  /** Actions or quick facts under the lead */
  children?: ReactNode
}) {
  const aside = media ?? (photo && (
    <div className="relative aspect-[4/3] overflow-hidden rounded-panel bg-paper-2">
      <Image src={photo} alt={photoAlt} fill priority placeholder="blur" sizes="(min-width: 960px) 560px, 100vw" className="object-cover" />
    </div>
  ))
  return (
    <header className="bg-paper pb-14 pt-12 sm:pb-[88px] sm:pt-[72px]">
      <Container className={aside ? 'grid items-center gap-10 wide:grid-cols-2 wide:gap-16' : undefined}>
        <div className="min-w-0">
          <div className={aside ? undefined : 'max-w-[52rem]'}>
            {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
            <h1>{title}</h1>
            {lead && <div className="type-lead mt-6 max-w-prose">{lead}</div>}
          </div>
          {children && <div className="mt-8">{children}</div>}
        </div>
        {aside && <div className="min-w-0">{aside}</div>}
      </Container>
    </header>
  )
}
