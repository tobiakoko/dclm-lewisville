import { client } from '@/lib/sanity/client'
import { homePageQuery } from '@/lib/sanity/queries'
import { SERVICE_TIMES } from '@/lib/constants'
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

export default async function HomePage() {
  let data = { ministries: [], team: [], upcomingEvents: [] }

  try {
    data = await client.fetch(homePageQuery)
  } catch (error) {
    console.warn('Failed to fetch home page data (this is expected during build without Sanity credentials)', error)
  }

  return (
    <>
      {/* Hero Carousel Section */}
      <HeroCarousel />

      {/* Give Section */}
      <GiveSection />

      {/* About Section */}
      <AboutPreview />

      {/* Services Section (Sunday, Tuesday, Friday) */}
      <ServiceSchedule times={SERVICE_TIMES} />

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
      <CtaSection />

      {/* Contact Section */}
      <Contact />
    </>
  )
}