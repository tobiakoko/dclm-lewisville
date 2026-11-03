import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Flame } from 'lucide-react'
import type { MinistryWithDetails } from '@/lib/data'
import { HOME } from '@/lib/content/interface'
import { MINISTRY_PHOTOS } from '@/components/site/ministry-photos'
import { pickPhoto, type PhotoSource } from '@/components/site/photo'
import { Section } from '@/components/site/Section'
import { buttonVariants } from '@/components/ui/button'
import { Panel } from '@/components/ui/surface'
import { cn } from '@/lib/utils'

// Bento order and spans from REDESIGN.md §3.9; Young Adults is a navy tile with an icon
const TILES: { slug: string; wide?: boolean }[] = [
  { slug: 'children', wide: true },
  { slug: 'youth' },
  { slug: 'women' },
  { slug: 'young-adults' },
  { slug: 'men' },
  { slug: 'music', wide: true },
]
const NO_PHOTO = new Set(['young-adults'])

function Tile({ ministry, photo, wide }: { ministry: MinistryWithDetails; photo?: PhotoSource; wide?: boolean }) {
  return (
    <li className={cn(wide && 'sm:col-span-2')}>
      <Link
        href={`/ministries#${ministry.slug}`}
        className={cn(
          'group relative isolate block h-full min-h-60 overflow-hidden rounded-tile-lg text-white no-underline',
          photo ? 'bg-navy-950' : 'bg-navy-800'
        )}
      >
        {photo ? (
          <>
            <Image
              src={photo.src}
              alt=""
              fill
              placeholder={photo.blurDataURL || typeof photo.src !== 'string' ? 'blur' : 'empty'}
              blurDataURL={photo.blurDataURL}
              sizes={wide ? '(min-width: 960px) 600px, 100vw' : '(min-width: 960px) 300px, (min-width: 640px) 50vw, 100vw'}
              className="bento-photo -z-20 object-cover"
            />
            <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(15_37_66/0)_30%,rgb(15_37_66/0.9)_100%)]" />
          </>
        ) : (
          <span aria-hidden="true" className="absolute left-6 top-6 inline-flex size-[52px] items-center justify-center rounded-tile bg-white/10 text-emblem-sky-400">
            <Flame className="size-6" />
          </span>
        )}
        <span className="absolute inset-x-6 bottom-[22px] flex items-end justify-between gap-4">
          <span className="min-w-0">
            <span className="block font-serif text-[1.625rem] font-semibold leading-tight">{ministry.name}</span>
            {ministry.audience && <span className="mt-1.5 block text-[0.9375rem] leading-snug text-white/86">{ministry.audience}</span>}
          </span>
          <span aria-hidden="true" className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-white/16 transition-colors duration-200 group-hover:bg-heaven-600">
            <ArrowRight className="size-5" />
          </span>
        </span>
      </Link>
    </li>
  )
}

/** "Get connected": a bento of the six ministries and a pill link to each outreach area (REDESIGN.md §3.9) */
export default function MinistriesPreview({ ministries, outreach }: { ministries: MinistryWithDetails[]; outreach: MinistryWithDetails[] }) {
  const tiles = TILES.flatMap(({ slug, wide }) => {
    const ministry = ministries.find((m) => m.slug === slug)
    if (!ministry) return []
    const photo = NO_PHOTO.has(slug) ? undefined : pickPhoto(ministry.photo, MINISTRY_PHOTOS[slug])
    return [{ ministry, photo, wide }]
  })

  return (
    <Section
      id="ministries"
      eyebrow={HOME.eyebrows.ministries}
      title={HOME.ministries.title}
      intro={HOME.ministries.lead}
      action={
        <Link href="/ministries" className={buttonVariants({ variant: 'secondary' })}>
          All ministries and outreach
        </Link>
      }
    >
      <ul className="grid list-none auto-rows-[240px] gap-4 sm:grid-cols-2 wide:auto-rows-[280px] wide:grid-cols-4">
        {tiles.map(({ ministry, photo, wide }) => (
          <Tile key={ministry.slug} ministry={ministry} photo={photo} wide={wide} />
        ))}
      </ul>
      {outreach.length > 0 && (
        <Panel tone="sky" className="mt-6 flex flex-col gap-5 p-6 sm:p-8 wide:flex-row wide:items-center wide:justify-between">
          <h3 className="type-h4">Outreach</h3>
          <ul className="flex list-none flex-wrap gap-2.5">
            {outreach.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/ministries#${area.slug}`}
                  className="inline-flex min-h-11 items-center rounded-pill bg-white px-[18px] text-[0.9375rem] font-semibold text-navy-900 no-underline shadow-sm hover:shadow-[inset_0_0_0_1.5px_var(--color-navy-900)]"
                >
                  {area.name}
                </Link>
              </li>
            ))}
          </ul>
        </Panel>
      )}
    </Section>
  )
}
