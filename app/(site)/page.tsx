import { client } from '@/lib/sanity/client'
import { homePageQuery, homeSectionsQuery, siteSettingsQuery } from '@/lib/sanity/queries'
import { logger } from '@/lib/logger'
import { HomeSections, SiteSettings, Ministry, Person, Event, Sermon } from '@/lib/types'
import HeroCarousel from '@/components/sections/home/HeroCarouselNew'
import MinistriesPreview from '@/components/sections/home/MinistriesPreview'
import IconSection from '@/components/sections/home/IconSection'
import { QuickInfo } from '@/components/sections/home/QuickInfo'
import { PastorsWelcome } from '@/components/sections/home/PastorsWelcome'
import { Welcome } from '@/components/sections/Welcome'
import { Values } from '@/components/sections/home/Values'
import { Testimonies } from '@/components/sections/home/Testimonies'
import { Verse } from '@/components/sections/home/Verse'

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

      {/* Icon Grid */}
      <IconSection />

      {/* Pastor's Welcome */}
      <PastorsWelcome />

      {/* Quick Info Section */}
      <QuickInfo />

      {/* Welcome */}
      <Welcome />

      {/* Our Values */}
      <Values />

      {/* Testimonies */}
      <Testimonies />

      {/* Ministries */}
      <MinistriesPreview />

      {/* Verse of the day */}
      <Verse />
    </>
  )
}