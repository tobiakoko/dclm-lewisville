import Image from 'next/image'
import Link from 'next/link'
import { BookOpen, Car, Shirt, Users, type LucideIcon } from 'lucide-react'
import type { TitledText } from '@/lib/content/site'
import { HOME } from '@/lib/content/interface'
import { InlineText } from '@/components/content/RichText'
import { Section } from '@/components/site/Section'
import { IconTile } from '@/components/ui/icon-tile'
import { Eyebrow } from '@/components/ui/eyebrow'
import { buttonVariants } from '@/components/ui/button'
import prayer from '@/app/assets/CongregationPrayer.jpeg'

// One icon per item, in the order of SITE-CONTENT.md §3: parking, kids, what to wear, the gathering
const ICONS: LucideIcon[] = [Car, Users, Shirt, BookOpen]

/** "What to expect": the first-visit lead and photo, then the four approved items (REDESIGN.md §3.5) */
export function WhatToExpect({ items }: { items: TitledText[] }) {
  return (
    <Section id="expect" tone="paper" titleId="expect-heading">
      <div className="grid items-start gap-12 wide:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] wide:gap-16">
        <div>
          <Eyebrow className="mb-4">{HOME.eyebrows.expect}</Eyebrow>
          <h2 id="expect-heading">What to expect</h2>
          <p className="type-lead mt-4">{HOME.expectLead}</p>
          <figure className="relative mt-8">
            <div className="relative aspect-[4/3] overflow-hidden rounded-panel bg-paper-2">
              <Image src={prayer} alt="Worshippers standing in prayer during a service" fill placeholder="blur" sizes="(min-width: 960px) 460px, 100vw" className="object-cover" />
            </div>
            <figcaption className="absolute bottom-4 left-4 right-4 rounded-card bg-white px-5 py-4 shadow-md sm:right-auto">
              <span className="block font-bold text-navy-900">{HOME.serviceLength.title}</span>
              <span className="text-base text-ink-muted">{HOME.serviceLength.line}</span>
            </figcaption>
          </figure>
        </div>
        <div>
          <ul className="grid list-none gap-x-8 gap-y-10 sm:grid-cols-2">
            {items.map((item, index) => {
              const Icon = ICONS[index] ?? BookOpen
              return (
                <li key={item.title}>
                  <IconTile tone="warm">
                    <Icon />
                  </IconTile>
                  <h3 className="type-h4 mt-5">{item.title}</h3>
                  <p className="mt-2 text-ink-muted">
                    <InlineText paragraph={item.body} />
                  </p>
                </li>
              )
            })}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/visit" className={buttonVariants()}>
              Plan your visit
            </Link>
            <Link href="/visit" className={buttonVariants({ variant: 'secondary' })}>
              More about your first visit
            </Link>
          </div>
        </div>
      </div>
    </Section>
  )
}
