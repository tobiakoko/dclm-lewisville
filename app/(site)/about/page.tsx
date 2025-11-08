import { client } from '@/lib/sanity/client'
import { groq } from 'next-sanity'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import Timeline from '@/components/sections/Timeline'
import Team from '@/components/sections/Team'
import { PortableText } from '@portabletext/react'
import CTA from '@/components/sections/CTA'
import PageHero from '@/components/sections/PageHero'
import UpcomingEvents from '@/components/sections/UpcomingEvents'
import { eventsQuery } from '@/lib/sanity/queries'

export const metadata = {
  title: 'About Us',
  description: 'Learn about Deeper Life Bible Church Lewisville, our history, mission, and leadership.',
}

async function getAboutData() {
  return client.fetch(groq`
    {
      "team": *[_type == "person" && active == true] | order(order asc) {
        _id,
        name,
        title,
        role,
        shortBio,
        photo,
        email
      },
      "history": *[_type == "page" && slug.current == "about"][0] {
        title,
        content
      },
      "events": *[_type == "event" && date >= now()] | order(date asc)[0...3] {
        _id,
        title,
        slug,
        date,
        endDate,
        location,
        description,
        image,
        featured
      }
    }
  `)
}

export default async function AboutPage() {
  const data = await getAboutData()

  return (
    <div>
      {/* Hero Section */}
      <PageHero
        title="About Us"
        subtitle="Growing in Christ, Serving Together, Reaching the World"
        variant="simple"
      />

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="bg-blue-50 p-8 rounded-lg">
              <h2 className="font-heading text-3xl font-bold mb-4 text-blue-900">
                Our Mission
              </h2>
              <p className="text-gray-700 leading-relaxed">
                To bring people to Christ and build them up in the faith through 
                biblical teaching, passionate worship, fervent prayer, and dedicated 
                service, while maintaining holiness and righteousness in all aspects 
                of life.
              </p>
            </div>
            <div className="bg-purple-50 p-8 rounded-lg">
              <h2 className="font-heading text-3xl font-bold mb-4 text-purple-900">
                Our Vision
              </h2>
              <p className="text-gray-700 leading-relaxed">
                To be a Christ-centered church that transforms lives through the 
                power of God&apos;s Word, equipping believers to live holy lives and 
                fulfill the Great Commission in Lewisville, Texas, and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Church History */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-4xl">
          <h2 className="font-heading text-4xl font-bold text-center mb-12">
            Our History
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="prose prose-lg max-w-none">
              <h3 className="font-heading text-2xl font-bold mb-4">
                Deeper Christian Life Ministry Worldwide
              </h3>
              <p className="text-gray-700 mb-6">
                Deeper Christian Life Ministry (DCLM) was founded in 1973 by Pastor 
                (Dr.) William Folorunso Kumuyi in Lagos, Nigeria. What began as a 
                small Bible study group has grown into a global ministry with presence 
                in over 70 countries worldwide.
              </p>
              <p className="text-gray-700 mb-6">
                The ministry is known for its unwavering commitment to biblical doctrine, 
                holy living, and fervent evangelism. DCLM emphasizes systematic Bible 
                study, prayer, and practical Christian living.
              </p>
              
              <h3 className="font-heading text-2xl font-bold mb-4 mt-8">
                DCLM Lewisville, Texas
              </h3>
              <p className="text-gray-700 mb-6">
                The Lewisville congregation was established to serve the growing 
                community of believers in the Dallas-Fort Worth metroplex. Under the 
                regional oversight of Pastor Thompson Aderemi, we continue to uphold 
                the same biblical principles and teachings that have guided DCLM since 
                its inception.
              </p>
              <p className="text-gray-700">
                We are committed to being a beacon of light in Lewisville, providing 
                a place where individuals and families can grow spiritually, find 
                fellowship, and serve the Lord together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 bg-white">
        <div className="container max-w-5xl">
          <h2 className="font-heading text-4xl font-bold text-center mb-12">
            Our Founder
          </h2>
          <div className="bg-gray-50 rounded-lg p-8 md:flex gap-8 items-center">
            <div className="md:w-1/3 mb-6 md:mb-0">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-200">
                <Image
                  src="/images/pastor-kumuyi.jpg"
                  alt="Pastor Dr. W.F. Kumuyi"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="font-heading text-2xl font-bold mb-2">
                Pastor (Dr.) William Folorunso Kumuyi
              </h3>
              <p className="text-gray-600 mb-4">
                Founder & General Superintendent
              </p>
              <p className="text-gray-700 mb-4">
                Pastor William Folorunso Kumuyi is the founder and general 
                superintendent of the Deeper Christian Life Ministry, a 
                non-denominational church with global reach. He is known for his 
                strict adherence to biblical doctrine and his commitment to evangelism.
              </p>
              <p className="text-gray-700">
                Pastor Kumuyi has written several books and is a popular speaker at 
                Christian conferences and events around the world. His systematic 
                approach to Bible teaching has helped millions grow in their faith 
                and understanding of God&apos;s Word.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Beliefs */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-5xl">
          <h2 className="font-heading text-4xl font-bold text-center mb-12">
            What We Believe
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'The Authority of Scripture',
                description: 'We believe the Bible is the inspired, infallible Word of God and the final authority for faith and practice.',
              },
              {
                title: 'Salvation Through Christ',
                description: 'We believe salvation is by grace through faith in Jesus Christ alone, not by works.',
              },
              {
                title: 'Holy Living',
                description: 'We believe in living a life separated from sin and consecrated to God\'s service.',
              },
              {
                title: 'Prayer & Worship',
                description: 'We believe in the power of prayer and the importance of sincere worship.',
              },
              {
                title: 'The Great Commission',
                description: 'We believe in fulfilling the Great Commission through evangelism and discipleship.',
              },
              {
                title: 'The Second Coming',
                description: 'We believe in the personal, visible return of Jesus Christ to establish His kingdom.',
              },
            ].map((belief) => (
              <div key={belief.title} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-heading text-xl font-bold mb-3 text-blue-900">
                  {belief.title}
                </h3>
                <p className="text-gray-700">{belief.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="font-heading text-4xl font-bold text-center mb-12">
            Our Leadership
          </h2>
          <Team members={data.team} />
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="font-heading text-4xl font-bold text-center mb-12">
            Our Journey
          </h2>
          <Timeline
            events={[
              {
                year: '1973',
                title: 'DCLM Founded',
                description: 'Pastor W.F. Kumuyi starts Bible study in Lagos, Nigeria',
              },
              {
                year: '1980s',
                title: 'Global Expansion',
                description: 'DCLM begins establishing churches worldwide',
              },
              {
                year: '2000s',
                title: 'North American Growth',
                description: 'DCLM expands presence across the United States',
              },
              {
                year: '2010s',
                title: 'Lewisville Established',
                description: 'DCLM Lewisville begins ministering to the DFW community',
              },
              {
                year: 'Present',
                title: 'Continuing the Mission',
                description: 'Growing and serving the Lewisville community with biblical truth',
              },
            ]}
          />
        </div>
      </section>

      {/* Upcoming Events Section */}
      <UpcomingEvents events={data.events || []} limit={3} showViewAll={true} />

      {/* CTA */}
      <CTA
        title="Want to Learn More?"
        description="Join us for a service or reach out with any questions"
        primaryButton={{ text: 'Contact Us', href: '/contact' }}
        secondaryButton={{ text: 'Plan Your Visit', href: '/contact' }}
      />
    </div>
  )
}
