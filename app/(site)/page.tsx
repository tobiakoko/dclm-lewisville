import { client } from '@/lib/sanity/client'
import { homePageQuery } from '@/lib/sanity/queries'
import { SERVICE_TIMES } from '@/lib/constants'
import Hero from '@/components/sections/Hero'
import ServiceSchedule from '@/components/sections/ServiceSchedule'
import SermonsList from '@/components/sections/SermonList'
import MinistriesPreview from '@/components/sections/MinistriesPreview'
import Team from '@/components/sections/Team'
import Testimonials from '@/components/sections/Testimonials'
import CTA from '@/components/sections/CTA'
import Contact from '@/components/sections/Contact'

export const revalidate = 3600 // Revalidate every hour

export default async function HomePage() {
  const data = await client.fetch(homePageQuery)

  return (
    <>
      <Hero />
      <ServiceSchedule times={SERVICE_TIMES} />
      <SermonsList sermons={data.featuredSermons} featured={true} />
      <MinistriesPreview ministries={data.ministries} />
      <Team members={data.team?.slice(0, 4)} />
      <Testimonials testimonials={data.testimonials} />
      <CTA
        title="Join Us This Sunday"
        description="Experience worship, fellowship, and biblical teaching"
        primaryButton={{ text: 'Plan Your Visit', href: '/contact' }}
        secondaryButton={{ text: 'Watch Online', href: '/sermons' }}
      />
      <Contact />
    </>
  )
}