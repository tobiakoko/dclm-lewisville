import type { Metadata } from 'next'
import { HandHeart, Hospital, KeyRound, Megaphone, MessagesSquare, type LucideIcon } from 'lucide-react'
import { PageHero } from '@/components/site/PageHero'
import { Section } from '@/components/site/Section'
import { MinistryContact, MinistryRow, splitCrisisNotice } from '@/components/site/MinistryCard'
import { MINISTRY_PHOTOS } from '@/components/site/ministry-photos'
import { pickPhoto } from '@/components/site/photo'
import { Alert } from '@/components/site/Alert'
import { Paragraphs } from '@/components/content/RichText'
import { IconTile } from '@/components/ui/icon-tile'
import { Eyebrow } from '@/components/ui/eyebrow'
import { MINISTRIES_PAGE } from '@/lib/content/interface'
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

// Decorative icons for the outreach list; areas added later in the Studio get the default
const OUTREACH_ICONS: Record<string, LucideIcon> = {
  evangelism: Megaphone,
  counseling: MessagesSquare,
  'hospital-visitation': Hospital,
  'community-volunteerism': HandHeart,
  'prison-ministry': KeyRound,
}

// Ministries shown as a navy panel rather than a photo (REDESIGN.md §4)
const PANEL_LINES: Record<string, string> = { 'young-adults': MINISTRIES_PAGE.youngAdultsLine }

// TODO(content): ministry meeting times, leaders and contacts; Prison Ministry details;
// Heart of the City partner details and volunteer sign-up; how to request counseling.
export default async function MinistriesPage() {
  const { ministries, outreach } = await getMinistries()

  return (
    <>
      <PageHero
        eyebrow={MINISTRIES_PAGE.eyebrow}
        title={MINISTRIES_PAGE.title}
        lead={MINISTRIES_PAGE.lead}
        photo={choir}
        photoAlt="Members of the congregation standing and singing during a service"
      >
        <nav aria-label="Ministries on this page">
          <ul className="flex list-none flex-wrap gap-2">
            {[...ministries.map((m) => ({ href: `#${m.slug}`, label: m.name })), { href: '#outreach', label: 'Outreach' }].map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-11 items-center rounded-pill bg-white px-[18px] text-[0.9375rem] font-semibold text-navy-900 no-underline shadow-sm hover:shadow-[inset_0_0_0_1.5px_var(--color-navy-900)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <Section id="our-ministries" titleId="our-ministries-heading">
        <h2 id="our-ministries-heading" className="sr-only">
          Ministries
        </h2>
        <div className="flex flex-col gap-16 wide:gap-24">
          {ministries.map((ministry, index) => {
            const panelLine = PANEL_LINES[ministry.slug]
            return (
              <MinistryRow
                key={ministry.slug}
                ministry={ministry}
                photo={panelLine ? undefined : pickPhoto(ministry.photo, MINISTRY_PHOTOS[ministry.slug])}
                panelLine={panelLine}
                reverse={index % 2 === 1}
              />
            )
          })}
        </div>
      </Section>

      <Section id="outreach" tone="paper" titleId="outreach-heading">
        <div className="grid gap-10 wide:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] wide:gap-16">
          <div>
            <Eyebrow className="mb-4">Outreach</Eyebrow>
            <h2 id="outreach-heading">{MINISTRIES_PAGE.outreachTitle}</h2>
          </div>
          <ul className="list-none">
            {outreach.map((area) => {
              const Icon = OUTREACH_ICONS[area.slug] ?? HandHeart
              const { body, crisis } = splitCrisisNotice(area.paragraphs)
              return (
                <li
                  key={area.slug}
                  id={area.slug}
                  className="grid scroll-mt-24 grid-cols-[52px_minmax(0,1fr)] gap-5 py-7 shadow-[inset_0_1px_0_var(--color-line-warm)] first:pt-0 first:shadow-none"
                >
                  <IconTile tone="warm">
                    <Icon />
                  </IconTile>
                  <div>
                    <h3 className="type-h4">{area.name}</h3>
                    <div className="mt-2 max-w-prose space-y-3 text-ink-muted">
                      <Paragraphs paragraphs={body} />
                    </div>
                    {crisis && (
                      <Alert tone="crisis" className="mt-4">
                        <p>{crisis}</p>
                      </Alert>
                    )}
                    <div className="mt-3">
                      <MinistryContact ministry={area} />
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </Section>
    </>
  )
}
