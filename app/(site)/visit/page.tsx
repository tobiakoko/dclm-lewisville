import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/site/PageHero'
import { Section } from '@/components/site/Section'
import { ServiceTimesCard } from '@/components/site/ServiceTimesCard'
import { InlineText } from '@/components/content/RichText'
import ContactForm from '@/components/ContactForm'
import { buttonVariants } from '@/components/ui/button'
import { HOME_HERO, VISIT_SECTIONS, VISIT_SERVICE_LINES } from '@/lib/content/site'
import { plainText, type Paragraph } from '@/lib/content/inline'
import { SERVICE_TIMES, SITE_CONFIG, formatAddress, mapsUrl } from '@/lib/constants'
import visit from '@/app/assets/visit.jpeg'

export const metadata: Metadata = {
  title: 'Plan Your Visit',
  description: `Service times, parking, what to expect, what to wear and Children’s Church at ${SITE_CONFIG.name}, ${formatAddress(SITE_CONFIG.address)}.`,
  alternates: { canonical: '/visit' },
}

/** The §4 line for a service, matched by its name ("Tuesday Bible Study, 7:00–9:00 PM, …") */
function lineFor(name: string): Paragraph | undefined {
  return VISIT_SERVICE_LINES.find((line) => plainText(line).startsWith(name))
}

const sectionText = (title: string) => VISIT_SECTIONS.find((section) => section.title === title)

// "When you arrive" and "Accessibility and language" have no approved copy yet and are left out
// (SITE-CONTENT.md §4). TODO(content): add them when the church supplies the wording.
export default function VisitPage() {
  const searchTheScriptures = VISIT_SERVICE_LINES.find((line) => plainText(line).startsWith('Search The Scriptures'))
  const parking = sectionText('Getting here and parking')
  const inService = sectionText('What happens in a service')
  const wear = sectionText('What to wear')
  const kids = sectionText('Kids & families')
  const after = sectionText('After your visit')

  return (
    <>
      <PageHero title="Plan Your Visit" sentence={HOME_HERO.subtitle} photo={visit} />

      <Section id="times" title="Service times" intro={<p>All times are Central Time.</p>}>
        <ul className="grid list-none gap-4 md:grid-cols-2">
          {SERVICE_TIMES.map((service) => {
            const line = lineFor(service.name)
            return (
              <li key={service.id}>
                <ServiceTimesCard
                  service={service}
                  details={
                    line ? (
                      <p>
                        <InlineText paragraph={line} />
                      </p>
                    ) : undefined
                  }
                />
              </li>
            )
          })}
        </ul>
        {searchTheScriptures && (
          <p className="mt-6 max-w-prose">
            <InlineText paragraph={searchTheScriptures} />
          </p>
        )}
      </Section>

      {parking && (
        <Section id="parking" tone="paper" title={parking.title}>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <p className="max-w-prose">
                <InlineText paragraph={parking.body} />
              </p>
              <address className="not-italic font-semibold">{formatAddress(SITE_CONFIG.address)}</address>
              <a href={mapsUrl(SITE_CONFIG.address)} className={buttonVariants({ variant: 'secondary' })}>
                Get directions
              </a>
            </div>
            <div className="h-72 overflow-hidden rounded-2xl border border-border-input/40 lg:h-full lg:min-h-72">
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(formatAddress(SITE_CONFIG.address))}&output=embed`}
                className="size-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map showing ${formatAddress(SITE_CONFIG.address)}`}
              />
            </div>
          </div>
        </Section>
      )}

      {[inService, wear, kids].map(
        (section) =>
          section && (
            <Section key={section.title} title={section.title} titleId={`visit-${section.title.toLowerCase().replace(/[^a-z]+/g, '-')}`}>
              <p className="max-w-prose">
                <InlineText paragraph={section.body} />
              </p>
            </Section>
          )
      )}

      <Section id="watch" tone="sky" title="Watch first">
        <div className="flex flex-wrap gap-3">
          <a href={SITE_CONFIG.youtube.streams} className={buttonVariants({ variant: 'secondary' })}>
            Watch on YouTube
          </a>
          <Link href="/sermons" className={buttonVariants({ variant: 'link' })}>
            Sermons
          </Link>
        </div>
      </Section>

      <Section id="meet-the-pastor" title="Meet the Pastor">
        <div className="flex flex-wrap gap-3">
          <Link href="/#welcome" className={buttonVariants({ variant: 'secondary' })}>
            Pastor’s Welcome
          </Link>
          <Link href="/about#leadership" className={buttonVariants({ variant: 'link' })}>
            Our leadership
          </Link>
        </div>
      </Section>

      {after && (
        <Section id="after" tone="paper" title={after.title}>
          <p className="max-w-prose">
            <InlineText paragraph={after.body} />
          </p>
        </Section>
      )}

      <Section id="let-us-know" title="Let us know you’re coming">
        {/* Sends "New visitor: [name], [date]" to the church inbox (SITE-CONTENT.md §4) */}
        <ContactForm topic="visit" submitLabel="Let us know" />
      </Section>
    </>
  )
}
