import type { Metadata } from 'next'
import { PageHero } from '@/components/site/PageHero'
import { Section } from '@/components/site/Section'
import { getSiteData, getWaysToGive } from '@/lib/data'

export async function generateMetadata(): Promise<Metadata> {
  const { config } = await getSiteData()
  return {
    title: 'Give',
    description: `Ways to give to ${config.name}: Zelle, check or online giving.`,
    alternates: { canonical: '/give' },
  }
}

// Ways to give come from the Give page in Sanity (SITE-CONTENT.md §10). No FAQ, buttons,
// security or tax claims.
export default async function GivePage() {
  const ways = await getWaysToGive()
  return (
    <>
      <PageHero title="Give" />
      <Section id="ways" title="Ways to give">
        <ul className="grid list-none gap-6 md:grid-cols-3">
          {ways.map((way) => (
            <li key={way.title} className="space-y-2 rounded-2xl border border-border-input/40 bg-white p-6">
              <h3>{way.title}</h3>
              <p className="text-ink-muted">{way.detail}</p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
