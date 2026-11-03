import Link from 'next/link'
import Image from 'next/image'
import type { MinistryWithDetails } from '@/lib/data'
import { MINISTRY_PHOTOS } from '@/components/site/ministry-photos'
import { pickPhoto } from '@/components/site/photo'
import { Section } from '@/components/site/Section'

const PREVIEW = ['women', 'children', 'youth']

export default function MinistriesPreview({ ministries }: { ministries: MinistryWithDetails[] }) {
  const items = PREVIEW.flatMap((slug) => {
    const ministry = ministries.find((m) => m.slug === slug)
    const photo = pickPhoto(ministry?.photo, MINISTRY_PHOTOS[slug])
    return ministry && photo ? [{ ministry, photo }] : []
  })

  return (
    <Section id="ministries" title="Ministries">
      <ul className="grid list-none gap-6 md:grid-cols-3">
        {items.map(({ ministry, photo }) => (
          <li key={ministry.slug}>
            <Link href={`/ministries#${ministry.slug}`} className="group block overflow-hidden rounded-2xl border border-border-input/40 bg-white no-underline">
              <span className="relative block aspect-4/3">
                <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
              </span>
              <span className="block p-5 font-serif text-xl font-semibold text-navy-900 underline-offset-4 group-hover:underline">
                {ministry.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-8">
        <Link href="/ministries" className="font-semibold text-emblem-sky-700 underline underline-offset-4">
          All ministries and outreach
        </Link>
      </p>
    </Section>
  )
}
