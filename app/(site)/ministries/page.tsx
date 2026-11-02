import type { Metadata } from 'next'
import { PageHero } from '@/components/site/PageHero'
import { Section } from '@/components/site/Section'
import { MinistryCard } from '@/components/site/MinistryCard'
import { MINISTRY_PHOTOS } from '@/components/site/ministry-photos'
import { MINISTRIES, OUTREACH } from '@/lib/content/site'
import { SITE_CONFIG } from '@/lib/constants'
import choir from '@/app/assets/Choir_ministry.jpeg'

export const metadata: Metadata = {
  title: 'Ministries and Outreach',
  description: `Women’s, Children’s, Youth, Young Adults, Men’s and Music ministries and outreach at ${SITE_CONFIG.name}, and how to join.`,
  alternates: { canonical: '/ministries' },
}

// TODO(content): ministry meeting times, leaders and contacts; Prison Ministry details;
// Heart of the City partner details and volunteer sign-up; how to request counseling.
export default function MinistriesPage() {
  return (
    <>
      <PageHero title="Ministries and Outreach" sentence="Find your place to grow and serve. Every ministry has a way to get in touch." photo={choir} />

      <Section id="our-ministries" title="Ministries">
        <ul className="grid list-none gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MINISTRIES.map((ministry) => (
            <li key={ministry.slug}>
              <MinistryCard ministry={ministry} photo={MINISTRY_PHOTOS[ministry.slug]} />
            </li>
          ))}
        </ul>
      </Section>

      <Section id="outreach" tone="paper" title="Outreach">
        <ul className="grid list-none gap-6 md:grid-cols-2">
          {OUTREACH.map((area) => (
            <li key={area.slug}>
              <MinistryCard ministry={area} />
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
