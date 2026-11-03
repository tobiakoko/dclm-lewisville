import type { Metadata } from 'next'
import { PageHero } from '@/components/site/PageHero'
import { Section } from '@/components/site/Section'
import { MinistryCard } from '@/components/site/MinistryCard'
import { MINISTRY_PHOTOS } from '@/components/site/ministry-photos'
import { pickPhoto } from '@/components/site/photo'
import { getMinistries, getSiteData } from '@/lib/data'
import choir from '@/app/assets/Choir_ministry.jpeg'

export async function generateMetadata(): Promise<Metadata> {
  const { config } = await getSiteData()
  return {
    title: 'Ministries and Outreach',
    description: `Women’s, Children’s, Youth, Young Adults, Men’s and Music ministries and outreach at ${config.name}, and how to join.`,
    alternates: { canonical: '/ministries' },
  }
}

// TODO(content): ministry meeting times, leaders and contacts; Prison Ministry details;
// Heart of the City partner details and volunteer sign-up; how to request counseling.
export default async function MinistriesPage() {
  const { ministries, outreach } = await getMinistries()

  return (
    <>
      <PageHero title="Ministries and Outreach" lead="Find your place to grow and serve. Every ministry has a way to get in touch." photo={choir} />

      <Section id="our-ministries" title="Ministries">
        <ul className="grid list-none gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ministries.map((ministry) => (
            <li key={ministry.slug}>
              <MinistryCard ministry={ministry} photo={pickPhoto(ministry.photo, MINISTRY_PHOTOS[ministry.slug])} />
            </li>
          ))}
        </ul>
      </Section>

      <Section id="outreach" tone="paper" title="Outreach">
        <ul className="grid list-none gap-6 md:grid-cols-2">
          {outreach.map((area) => (
            <li key={area.slug}>
              <MinistryCard ministry={area} photo={pickPhoto(area.photo, undefined)} />
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
