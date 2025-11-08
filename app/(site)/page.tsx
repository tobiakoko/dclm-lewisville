import { client } from '@/lib/sanity/client'
import { homePageQuery } from '@/lib/sanity/queries'
import { SERVICE_TIMES } from '@/lib/constants'
import HeroSection from '@/components/sections/HeroSection'
import ServiceSchedule from '@/components/sections/ServiceSchedule'
import FeaturesListSection from '@/components/sections/FeaturesListSection'
import SermonsList from '@/components/sections/SermonList'
import MinistriesPreview from '@/components/sections/MinistriesPreview'
import BenefitsSection from '@/components/sections/BenefitsSection'
import Team from '@/components/sections/Team'
import Testimonials from '@/components/sections/Testimonials'
import CTASection from '@/components/sections/CTASection'
import Contact from '@/components/sections/Contact'

export const revalidate = 3600 // Revalidate every hour

export default async function HomePage() {
  const data = await client.fetch(homePageQuery)

  return (
    <>
      <HeroSection />
      <ServiceSchedule times={SERVICE_TIMES} />
      <FeaturesListSection
        heading="What We Offer"
        subheading="Discover the many ways you can grow and serve in our community"
        features={[
          {
            icon: 'Calendar',
            title: 'Upcoming Events',
            description: 'Join us for special services, conferences, and community outreach programs',
            link: { text: 'View Events', href: '/events' },
          },
          {
            icon: 'Book',
            title: 'Recent Sermons',
            description: 'Watch or listen to inspiring messages from our pastors and guest speakers',
            link: { text: 'Browse Sermons', href: '/sermons' },
          },
          {
            icon: 'Users',
            title: 'Our Ministries',
            description: 'Find your place to serve and connect with others in faith and fellowship',
            link: { text: 'Explore Ministries', href: '/ministries' },
          },
        ]}
      />
      <BenefitsSection
        heading="Why Join Our Community"
        subheading="Experience the benefits of being part of our church family"
        layout="cards"
        benefits={[
          {
            icon: 'Heart',
            title: 'Spiritual Growth',
            description:
              'Deepen your relationship with God through biblical teaching, prayer, and worship. Our services and programs are designed to help you grow in faith and understanding.',
          },
          {
            icon: 'Users',
            title: 'Community Support',
            description:
              'Connect with a caring community that supports one another through life\'s challenges and celebrates together in times of joy.',
          },
          {
            icon: 'Compass',
            title: 'Purpose & Direction',
            description:
              'Discover your God-given purpose and receive guidance for your life journey through mentorship and biblical counsel.',
          },
          {
            icon: 'Sparkles',
            title: 'Life Transformation',
            description:
              'Experience positive change through the power of God\'s Word and the support of a loving church family committed to your spiritual wellbeing.',
          },
        ]}
      />
      <SermonsList sermons={data.featuredSermons} featured={true} />
      <MinistriesPreview ministries={data.ministries} />
      <Team members={data.team?.slice(0, 4)} />
      <Testimonials testimonials={data.testimonials} />
      <CTASection
        title="Join Us This Sunday"
        description="Experience worship, fellowship, and biblical teaching in a welcoming community"
        primaryButton={{ text: 'Plan Your Visit', href: '/contact' }}
        secondaryButton={{ text: 'Watch Online', href: '/sermons' }}
        style="gradient"
      />
      <Contact />
    </>
  )
}