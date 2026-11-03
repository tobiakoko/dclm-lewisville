import type { Metadata } from 'next'
import { PageHero } from '@/components/site/PageHero'
import { Section } from '@/components/site/Section'
import { LastUpdated } from '@/components/site/LastUpdated'
import { Paragraphs } from '@/components/content/RichText'
import { formatAddress, telHref } from '@/lib/constants'
import { getLegalContent, getSiteData } from '@/lib/data'

export async function generateMetadata(): Promise<Metadata> {
  const { config } = await getSiteData()
  return {
    title: 'Privacy Policy',
    description: `What ${config.name}’s website collects and how it is used.`,
    alternates: { canonical: '/privacy' },
  }
}

const linkClass = 'font-semibold text-emblem-sky-700 underline underline-offset-4'

// TODO(content): legal review and effective date before launch (SITE-CONTENT.md §11)
export default async function PrivacyPage() {
  const [{ config }, legal] = await Promise.all([getSiteData(), getLegalContent()])
  return (
    <>
      <PageHero title="Privacy Policy" />
      <Section>
        <div className="max-w-prose space-y-4">
          <LastUpdated date={legal.lastUpdated} />
          <p>{legal.effectiveDate}</p>
          <Paragraphs paragraphs={legal.privacy} />
          {/* The approved "Contact." line, built from Church details (a unit test keeps them equal) */}
          <p>
            Contact. {config.name}, {formatAddress(config.address)} ·{' '}
            <a href={telHref(config.phone)} className={linkClass}>
              {config.phone}
            </a>{' '}
            ·{' '}
            <a href={`mailto:${config.email}`} className={`${linkClass} break-all`}>
              {config.email}
            </a>
          </p>
        </div>
      </Section>
    </>
  )
}
