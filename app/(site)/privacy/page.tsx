import type { Metadata } from 'next'
import { PageHero } from '@/components/site/PageHero'
import { LastUpdated } from '@/components/site/LastUpdated'
import { LegalLayout, LegalParagraph, paragraphLabel, type LegalAnchor } from '@/components/site/LegalLayout'
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
  const anchors: LegalAnchor[] = [
    ...legal.privacy.map(paragraphLabel).filter((anchor): anchor is LegalAnchor => anchor !== null),
    { id: 'contact', label: 'Contact' },
  ]
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" lead={<LastUpdated date={legal.lastUpdated} />} />
      <LegalLayout anchors={anchors}>
        <p>{legal.effectiveDate}</p>
        {legal.privacy.map((paragraph, index) => (
          <LegalParagraph key={index} paragraph={paragraph} />
        ))}
        {/* The approved "Contact." line, built from Church details (a unit test keeps them equal) */}
        <p id="contact" className="scroll-mt-28">
          <strong className="text-navy-900">Contact.</strong> {config.name}, {formatAddress(config.address)} ·{' '}
          <a href={telHref(config.phone)} className={linkClass}>
            {config.phone}
          </a>{' '}
          ·{' '}
          <a href={`mailto:${config.email}`} className={`${linkClass} break-all`}>
            {config.email}
          </a>
        </p>
      </LegalLayout>
    </>
  )
}
