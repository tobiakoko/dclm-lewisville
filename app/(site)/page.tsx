import { client } from '@/lib/sanity/client'
import { homePageQuery, homeSectionsQuery, siteSettingsQuery } from '@/lib/sanity/queries'
import { logger } from '@/lib/logger'
import { HomeSections, SiteSettings, Ministry, Person, Event, Sermon } from '@/lib/types'
import HeroCarousel from '@/components/sections/HeroCarouselNew'
import SundayService from '@/components/sections/SundayService'
import AboutPreview from '@/components/sections/AboutPreview'
import MinistriesPreview from '@/components/sections/MinistriesPreview'
import Team from '@/components/sections/Team'
import UpcomingEvents from '@/components/sections/UpcomingEvents'
import FeaturedSermon from '@/components/sections/FeaturedSermon'
import CtaSection from '@/components/sections/CtaSection'

export const revalidate = 3600 // Revalidate every hour

interface HomePageData {
  ministries: Ministry[]
  team: Person[]
  upcomingEvents: Event[]
  featuredSermons: Sermon[]
}

export default async function HomePage() {
  let data: HomePageData = { ministries: [], team: [], upcomingEvents: [], featuredSermons: [] }
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

      {/* Sunday Service Section */}
      <SundayService serviceTimes={settings?.servicesTimes?.filter(s => s.day === 'Sunday')} />

      {/* Featured Sermon Section */}
      <FeaturedSermon sermon={data.featuredSermons?.[0] || null} />

      {/* About Section */}
      {sections.pastorWelcome?.enabled !== false && sections.pastorWelcome && (
        <AboutPreview data={sections.pastorWelcome} />
      )}

      {/* Events Section */}
      <UpcomingEvents events={data.upcomingEvents || []} limit={2} showViewAll={true} />

      {/* Ministries Section */}
      <MinistriesPreview ministries={data.ministries} />

      {/* Minister's Section (Team/Leadership) */}
      <section className="py-32 bg-white relative">
        <div className="container">
          <div className="text-center mb-20">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Our Leadership
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              Meet our dedicated team of ministers and leaders serving our congregation
            </p>
          </div>
          <Team members={data.team?.slice(0, 4)} />
        </div>
      </section>

      {/* CTA Section */}
      {sections.ctaSection?.enabled !== false && sections.ctaSection && (
        <CtaSection data={sections.ctaSection} />
      )}
    </>
  )
}