import type { Metadata } from 'next'
import Link from 'next/link'
import { Globe, Landmark, Smartphone, type LucideIcon } from 'lucide-react'
import { PageHero } from '@/components/site/PageHero'
import { Section } from '@/components/site/Section'
import { buttonVariants } from '@/components/ui/button'
import { CopyButton } from '@/components/ui/copy-button'
import { IconTile } from '@/components/ui/icon-tile'
import { CardDark } from '@/components/ui/surface'
import { GIVE_PLACEHOLDER } from '@/lib/content/extra'
import { GIVE } from '@/lib/content/interface'
import { getSiteData, getWaysToGive } from '@/lib/data'

export async function generateMetadata(): Promise<Metadata> {
  const { config } = await getSiteData()
  return {
    title: 'Give',
    description: `Ways to give to ${config.name}: Zelle, check or online giving.`,
    alternates: { canonical: '/give' },
  }
}

// One decorative icon per way, in the order of SITE-CONTENT.md §10
const ICONS: LucideIcon[] = [Smartphone, Landmark, Globe]

// Ways to give come from the Give page in Sanity (SITE-CONTENT.md §10). No FAQ, security or tax
// claims, and no action until a way has real details.
export default async function GivePage() {
  const ways = await getWaysToGive()
  const scripture = (
    <CardDark className="p-8 sm:p-12">
      <figure>
        <blockquote className="scripture text-white">
          <p>{GIVE.scripture.text}</p>
        </blockquote>
        <figcaption className="mt-6 font-bold text-emblem-sky-200">{GIVE.scripture.reference}</figcaption>
      </figure>
    </CardDark>
  )

  return (
    <>
      <PageHero eyebrow={GIVE.eyebrow} title={GIVE.title} lead={GIVE.lead} media={scripture}>
        <div className="flex flex-wrap gap-3">
          <a href="#ways" className={buttonVariants()}>
            See ways to give
          </a>
          <Link href="/contact?topic=giving#contact-form" className={buttonVariants({ variant: 'secondary' })}>
            Questions about giving?
          </Link>
        </div>
      </PageHero>

      <Section id="ways" title="Ways to give">
        <ul className="max-w-4xl list-none">
          {ways.map((way, index) => {
            const Icon = ICONS[index] ?? Globe
            const hasDetails = way.detail.trim() !== '' && way.detail !== GIVE_PLACEHOLDER
            return (
              <li key={way.title} className="grid grid-cols-[52px_minmax(0,1fr)] gap-5 py-8 shadow-[inset_0_1px_0_var(--color-line)] first:pt-0 first:shadow-none">
                <IconTile>
                  <Icon />
                </IconTile>
                <div>
                  <h3>{way.title}</h3>
                  <p className="mt-2 whitespace-pre-line text-ink-muted">{way.detail}</p>
                  {hasDetails && (
                    <div className="mt-4">
                      <CopyButton text={way.detail} label="Copy details" />
                    </div>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </Section>
    </>
  )
}
