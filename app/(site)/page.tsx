import { client } from '@/lib/sanity/client'
import { homePageQuery, homeSectionsQuery, siteSettingsQuery } from '@/lib/sanity/queries'
import { logger } from '@/lib/logger'
import { HomeSections, SiteSettings, Ministry, Person, Event } from '@/lib/types'
import HeroCarousel from '@/components/sections/HeroCarouselNew'
import GiveSection from '@/components/sections/GiveSection'
import AboutPreview from '@/components/sections/AboutPreview'
import ServiceSchedule from '@/components/sections/ServiceSchedule'
import MinistriesPreview from '@/components/sections/MinistriesPreview'
import Team from '@/components/sections/Team'
import UpcomingEvents from '@/components/sections/UpcomingEvents'
import CtaSection from '@/components/sections/CtaSection'
import Contact from '@/components/sections/Contact'

export const revalidate = 3600 // Revalidate every hour

interface HomePageData {
  ministries: Ministry[]
  team: Person[]
  upcomingEvents: Event[]
}

export default async function HomePage() {
  let data: HomePageData = { ministries: [], team: [], upcomingEvents: [] }
  let sections: HomeSections = { heroCarousel: null, pastorWelcome: null, giveSection: null, ctaSection: null }
  let settings: SiteSettings = { servicesTimes: [] }

  try {
    const [pageData, sectionsData, settingsData] = await Promise.all([
      client.fetch(homePageQuery),
      client.fetch(homeSectionsQuery),
      client.fetch(siteSettingsQuery),
    ])
    data = pageData
    sections = sectionsData
    settings = settingsData
  } catch (error) {
    // Log error with context
    logger.error(error as Error, {
      page: 'home',
      queries: ['homePageQuery', 'homeSectionsQuery', 'siteSettingsQuery'],
    })
    // In development, this is expected during build without Sanity credentials
    if (process.env.NODE_ENV === 'development') {
      logger.warn('Failed to fetch home page data (this is expected during build without Sanity credentials)')
    }
  }

  return (
    <>
      {/* Hero Carousel Section */}
      {sections.heroCarousel?.enabled !== false && (
        <HeroCarousel data={sections.heroCarousel} serviceTimes={settings?.servicesTimes} />
      )}

      {/* Give Section */}
      {sections.giveSection?.enabled !== false && (
        <GiveSection data={sections.giveSection} />
      )}

      {/* About Section */}
      {sections.pastorWelcome?.enabled !== false && sections.pastorWelcome && (
        <AboutPreview data={sections.pastorWelcome} />
      )}

      {/* Services Section (Sunday, Tuesday, Friday) */}
      {settings?.servicesTimes && settings.servicesTimes.length > 0 && (
        <ServiceSchedule times={settings.servicesTimes} />
      )}

      {/* Ministries Section */}
      <MinistriesPreview ministries={data.ministries} />

      {/* Minister's Section (Team/Leadership) */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="mb-12">
            <div className="inline-block px-3 py-1 bg-muted rounded-full mb-4">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Leadership</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-3 text-foreground">
              Our Leadership
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl">
              Meet our dedicated team of ministers and leaders serving our congregation
            </p>
          </div>
          <Team members={data.team?.slice(0, 4)} />
        </div>
      </section>

      {/* Events Section */}
      <UpcomingEvents events={data.upcomingEvents || []} limit={3} showViewAll={true} />

      {/* CTA Section */}
      {sections.ctaSection?.enabled !== false && sections.ctaSection && (
        <CtaSection data={sections.ctaSection} />
      )}

      {/* Contact Section */}
      <Contact />
    </>
  )
}