import { client } from '@/lib/sanity/client'
import { homePageQuery } from '@/lib/sanity/queries'
import { SERVICE_TIMES } from '@/lib/constants'
import Hero from '@/components/sections/Hero'
import GiveSection from '@/components/sections/GiveSection'
import AboutPreview from '@/components/sections/AboutPreview'
import ServiceSchedule from '@/components/sections/ServiceSchedule'
import MinistriesPreview from '@/components/sections/MinistriesPreview'
import Team from '@/components/sections/Team'
import UpcomingEvents from '@/components/sections/UpcomingEvents'
import Contact from '@/components/sections/Contact'

export const revalidate = 3600 // Revalidate every hour

export default async function HomePage() {
  const data = await client.fetch(homePageQuery)

  return (
    <>
      {/* Main Hero Section */}
      <Hero />

      {/* Give Section */}
      <GiveSection />

      {/* About Section */}
      <AboutPreview />

      {/* Services Section (Sunday, Tuesday, Friday) */}
      <ServiceSchedule times={SERVICE_TIMES} />

      {/* Ministries Section */}
      <MinistriesPreview ministries={data.ministries} />

      {/* Minister's Section (Team/Leadership with carousel) */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Our Leadership
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet our dedicated team of ministers and leaders serving our congregation
            </p>
          </div>
          <Team members={data.team?.slice(0, 4)} />
        </div>
      </section>

      {/* Events Section */}
      <UpcomingEvents events={data.upcomingEvents || []} limit={3} showViewAll={true} />

      {/* Contact Section */}
      <Contact />
    </>
  )
}