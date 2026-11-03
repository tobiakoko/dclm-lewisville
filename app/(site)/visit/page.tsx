import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { PageHero } from '@/components/site/PageHero'
import { Container, Section } from '@/components/site/Section'
import { EditorialRow } from '@/components/site/EditorialRow'
import { InPageNav } from '@/components/site/InPageNav'
import { JoinLine, ScheduleRow } from '@/components/site/Schedule'
import { InlineText } from '@/components/content/RichText'
import ContactForm from '@/components/ContactForm'
import { ArrowLink } from '@/components/ui/arrow-link'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardLine } from '@/components/ui/surface'
import { plainText, type Paragraph } from '@/lib/content/inline'
import { HOME, VISIT } from '@/lib/content/interface'
import { formatAddress, mapsUrl } from '@/lib/constants'
import { formatClock, mainService } from '@/lib/schedule'
import { getSiteData, getVisitContent } from '@/lib/data'
import visit from '@/app/assets/visit.jpeg'

export async function generateMetadata(): Promise<Metadata> {
  const { config } = await getSiteData()
  return {
    title: 'Plan Your Visit',
    description: `Service times, parking, what to expect, what to wear and Children’s Church at ${config.name}, ${formatAddress(config.address)}.`,
    alternates: { canonical: '/visit' },
  }
}

function TimelineStep({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <li className="grid gap-1 py-5 shadow-[inset_0_1px_0_var(--color-line)] first:shadow-none">
      <p className="tabular text-lg font-bold text-navy-900">{label}</p>
      <div className="text-ink-muted">{children}</div>
    </li>
  )
}

// "When you arrive" and "Accessibility and language" have no approved copy yet and are left out
// (SITE-CONTENT.md §4). TODO(content): add them when the church supplies the wording.
export default async function VisitPage() {
  const [{ config, schedule }, visitContent] = await Promise.all([getSiteData(), getVisitContent()])
  /** The §4 line for a service, matched by its name ("Tuesday Bible Study, 7:00–9:00 PM, …") */
  const lineFor = (name: string): Paragraph | undefined => visitContent.serviceLines.find((line) => plainText(line).startsWith(name))
  const sectionText = (title: string) => visitContent.sections.find((section) => section.title === title)
  const searchTheScriptures = visitContent.serviceLines.find((line) => plainText(line).startsWith('Search The Scriptures'))
  const sstTime = searchTheScriptures && /\d{1,2}:\d{2}–\d{1,2}:\d{2} [AP]M/.exec(plainText(searchTheScriptures))?.[0]
  const parking = sectionText('Getting here and parking')
  const inService = sectionText('What happens in a service')
  const wear = sectionText('What to wear')
  const kids = sectionText('Kids & families')
  const after = sectionText('After your visit')

  const main = mainService(schedule)
  const before = main ? schedule.find((service) => service.day === main.day && service.id !== main.id && service.start < main.start) : undefined
  const others = schedule.filter((service) => service !== main)
  const details = (name: string) => {
    const line = lineFor(name)
    return line ? (
      <p>
        <InlineText paragraph={line} />
      </p>
    ) : undefined
  }

  return (
    <>
      <PageHero eyebrow={visitContent.header.eyebrow} title={visitContent.header.title} lead={visitContent.header.lead} photo={visit} photoAlt="Worshippers seated in the sanctuary, watching a message on the large screen">
        <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-3">
          {main && (
            <div>
              <dt className="type-eyebrow text-ink-muted">{VISIT.facts.when}</dt>
              <dd className="tabular mt-1.5 font-bold text-navy-900">
                {main.day}s, {formatClock(main.start)}
              </dd>
            </div>
          )}
          <div>
            <dt className="type-eyebrow text-ink-muted">{VISIT.facts.where}</dt>
            <dd className="mt-1.5 font-bold text-navy-900">{config.address.street}</dd>
          </div>
          <div>
            <dt className="type-eyebrow text-ink-muted">{VISIT.facts.howLong}</dt>
            <dd className="mt-1.5 font-bold text-navy-900">{HOME.serviceLength.title}</dd>
          </div>
        </dl>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#let-us-know" className={buttonVariants()}>
            Let us know you’re coming
          </a>
          <a href={mapsUrl(config.address)} className={buttonVariants({ variant: 'secondary' })}>
            Get directions
          </a>
        </div>
      </PageHero>

      <InPageNav
        links={[
          { href: '#times', label: VISIT.nav.times },
          { href: '#getting-here', label: VISIT.nav.gettingHere },
          { href: '#sunday', label: VISIT.nav.sunday },
          { href: '#family', label: VISIT.nav.family },
          { href: '#let-us-know', label: VISIT.nav.letUsKnow },
        ]}
      />

      <Container>
        <EditorialRow id="times" number={1} title="Service times">
          <p className="mb-6 text-base text-ink-muted">All times are Central Time.</p>
          {main && <ScheduleRow service={main} details={details(main.name)} highlight />}
          <div className="mt-2">
            {others.map((service) => (
              <ScheduleRow key={service.id} service={service} details={details(service.name)} />
            ))}
          </div>
        </EditorialRow>

        {parking && (
          <EditorialRow id="getting-here" number={2} title={VISIT.rows.gettingHere}>
            <div className="grid items-start gap-10 wide:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
              <div className="space-y-4">
                <address className="not-italic">
                  <span className="type-h4 block">{config.name}</span>
                  <span className="block">{config.address.street}</span>
                  <span className="block">
                    {config.address.city}, {config.address.state} {config.address.zip}
                  </span>
                </address>
                <p className="text-ink-muted">
                  <InlineText paragraph={parking.body} />
                </p>
                <a href={mapsUrl(config.address)} className={buttonVariants({ variant: 'secondary' })}>
                  Get directions
                </a>
              </div>
              <div className="aspect-[16/10] overflow-hidden rounded-card bg-paper shadow-[inset_0_0_0_1px_var(--color-line)]">
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent(formatAddress(config.address))}&output=embed`}
                  className="size-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map showing ${formatAddress(config.address)}`}
                />
              </div>
            </div>
          </EditorialRow>
        )}

        <EditorialRow id="sunday" number={3} title={VISIT.rows.sunday}>
          {inService && (
            <p className="mb-6 max-w-prose">
              <InlineText paragraph={inService.body} />
            </p>
          )}
          <ol className="list-none">
            {before && (
              <TimelineStep label={`${formatClock(before.start)} · ${before.name}`}>
                <p>{before.description}</p>
                <JoinLine service={before} />
              </TimelineStep>
            )}
            {main && (
              <TimelineStep label={`${formatClock(main.start)} · ${main.name}`}>
                <p>{main.description}</p>
              </TimelineStep>
            )}
            {searchTheScriptures && (
              <TimelineStep label={sstTime ? `${sstTime} · Search The Scriptures` : 'Search The Scriptures'}>
                <p>
                  <InlineText paragraph={searchTheScriptures} />
                </p>
              </TimelineStep>
            )}
            {main?.end && (
              <TimelineStep label={`Until ${formatClock(main.end)}`}>
                <p>{HOME.serviceLength.line}</p>
              </TimelineStep>
            )}
            {after && (
              <TimelineStep label={after.title}>
                <p>
                  <InlineText paragraph={after.body} />
                </p>
              </TimelineStep>
            )}
          </ol>
        </EditorialRow>

        {(kids || wear) && (
          <EditorialRow id="family" number={4} title={VISIT.rows.family}>
            <div className="grid gap-10 sm:grid-cols-2">
              {[kids, wear].map(
                (section) =>
                  section && (
                    <div key={section.title}>
                      <h3 className="type-h4">{section.title}</h3>
                      <p className="mt-2 text-ink-muted">
                        <InlineText paragraph={section.body} />
                      </p>
                    </div>
                  )
              )}
            </div>
          </EditorialRow>
        )}

        <EditorialRow id="first" number={5} title={VISIT.rows.first}>
          <div className="grid gap-5 sm:grid-cols-2">
            <CardLine className="flex flex-col gap-4 p-6">
              <h3 className="type-h4">Watch first</h3>
              <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2">
                <a href={config.youtube.streams} className={buttonVariants({ variant: 'secondary', size: 'sm' })}>
                  Watch on YouTube
                </a>
                <ArrowLink href="/sermons">Sermons</ArrowLink>
              </div>
            </CardLine>
            <CardLine className="flex flex-col gap-4 p-6">
              <h3 className="type-h4">Meet the Pastor</h3>
              <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2">
                <Link href="/#welcome" className={buttonVariants({ variant: 'secondary', size: 'sm' })}>
                  Pastor’s Welcome
                </Link>
                <ArrowLink href="/about#leadership">Our leadership</ArrowLink>
              </div>
            </CardLine>
          </div>
        </EditorialRow>
      </Container>

      <Section id="let-us-know" tone="paper" titleId="let-us-know-heading">
        <div className="grid items-start gap-12 wide:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] wide:gap-[72px]">
          <div>
            <p aria-hidden="true" className="font-serif text-[2.5rem] font-semibold leading-none text-emblem-sky-700">
              06
            </p>
            <h2 id="let-us-know-heading" className="mt-3">
              Let us know you’re coming
            </h2>
            <ul className="mt-6 flex list-none flex-col gap-3.5">
              {VISIT.checklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check aria-hidden="true" className="mt-1 size-5 shrink-0 text-emblem-sky-700" strokeWidth={2.25} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <Card className="p-6 sm:p-10">
            {/* Sends "New visitor: [name], [date]" to the church inbox (SITE-CONTENT.md §4) */}
            <ContactForm phone={config.phone} email={config.email} topic="visit" submitLabel="Let us know" />
          </Card>
        </div>
      </Section>
    </>
  )
}
