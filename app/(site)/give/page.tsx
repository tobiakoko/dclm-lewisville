import type { Metadata } from 'next'
import { PageHero } from '@/components/site/PageHero'
import { Section } from '@/components/site/Section'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Give',
  description: `Ways to give to ${SITE_CONFIG.name}: Zelle, check or online giving.`,
  alternates: { canonical: '/give' },
}

// SITE-CONTENT.md §10: three ways, each with the placeholder until the church supplies details.
// No FAQ, buttons, security or tax claims.
// TODO(content): Zelle details; check payee and mailing address; online giving provider and link;
// tax-deductibility statement
const PLACEHOLDER = 'Information will be provided shortly.'

const WAYS_TO_GIVE = [
  { title: 'Zelle', detail: PLACEHOLDER },
  { title: 'Check payable to the church', detail: PLACEHOLDER },
  { title: 'Online giving', detail: PLACEHOLDER },
]

export default function GivePage() {
  return (
    <>
      <PageHero title="Give" />
      <Section id="ways" title="Ways to give">
        <ul className="grid list-none gap-6 md:grid-cols-3">
          {WAYS_TO_GIVE.map((way) => (
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
