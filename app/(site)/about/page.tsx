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
  try {
    return await client.fetch(groq`
      {
        "settings": *[_type == "siteSettings"][0] {
          aboutContent {
            mission,
            vision,
            historyTitle,
            history,
            founderInfo {
              name,
              title,
              bio,
              photo
            },
            coreBeliefs[] {
              title,
              description
            },
            timeline[] {
              year,
              title,
              description
            }
          }
        },
        "team": *[_type == "person" && active == true] | order(order asc) {
          _id,
          name,
          title,
          role,
          shortBio,
          photo,
          email
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
  } catch (error) {
    console.warn('Failed to fetch about page data (this is expected during build without Sanity credentials)', error)
    return { settings: null, team: [], events: [] }
  }
}

export default async function AboutPage() {
  const data = await getAboutData()
  const aboutContent = data.settings?.aboutContent

  return (
    <div>
      {/* Hero Section */}
      <PageHero
        title="About Us"
        subtitle="Growing in Christ, Serving Together, Reaching the World"
        variant="simple"
      />

      {/* Mission & Vision */}
      <section className="section-padding-y bg-gradient-to-b from-white via-muted/30 to-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="group relative overflow-hidden bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-primary/20 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-bl-full -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-700" />
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="font-heading text-3xl font-bold mb-4 text-primary">
                  Our Mission
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {aboutContent?.mission ||
                    'To bring people to Christ and build them up in the faith through biblical teaching, passionate worship, fervent prayer, and dedicated service, while maintaining holiness and righteousness in all aspects of life.'}
                </p>
              </div>
            </div>
            <div className="group relative overflow-hidden bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-accent/20 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/10 to-secondary/10 rounded-bl-full -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-700" />
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-accent to-accent/80 rounded-xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h2 className="font-heading text-3xl font-bold mb-4 text-accent">
                  Our Vision
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {aboutContent?.vision ||
                    "To be a Christ-centered church that transforms lives through the power of God's Word, equipping believers to live holy lives and fulfill the Great Commission in Lewisville, Texas, and beyond."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Church History */}
      <section className="section-padding-y bg-muted/50">
        <div className="container max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {aboutContent?.historyTitle || 'Our History'}
            </h2>
            <div className="w-24 h-1 bg-linear-to-r from-primary to-accent mx-auto rounded-full" />
          </div>

          {aboutContent?.history ? (
            <div className="group bg-white rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
              <div className="prose prose-lg max-w-none text-gray-700">
                <PortableText value={aboutContent.history} />
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="group bg-white rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-linear-to-br from-primary to-accent rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-primary">
                      Deeper Christian Life Ministry Worldwide
                    </h3>
                  </div>
                </div>
                <div className="space-y-4 text-gray-700 text-lg leading-relaxed ml-16">
                  <p>
                    Deeper Christian Life Ministry (DCLM) was founded in 1973 by Pastor
                    (Dr.) William Folorunso Kumuyi in Lagos, Nigeria. What began as a
                    small Bible study group has grown into a global ministry with presence
                    in over 70 countries worldwide.
                  </p>
                  <p>
                    The ministry is known for its unwavering commitment to biblical doctrine,
                    holy living, and fervent evangelism. DCLM emphasizes systematic Bible
                    study, prayer, and practical Christian living.
                  </p>
                </div>
              </div>

              <div className="group bg-white rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-linear-to-br from-accent to-accent/80 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-accent">
                      DCLM Lewisville, Texas
                    </h3>
                  </div>
                </div>
                <div className="space-y-4 text-gray-700 text-lg leading-relaxed ml-16">
                  <p>
                    The Lewisville congregation was established to serve the growing
                    community of believers in the Dallas-Fort Worth metroplex. Under the
                    regional oversight of Pastor Thompson Aderemi, we continue to uphold
                    the same biblical principles and teachings that have guided DCLM since
                    its inception.
                  </p>
                  <p>
                    We are committed to being a beacon of light in Lewisville, providing
                    a place where individuals and families can grow spiritually, find
                    fellowship, and serve the Lord together.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Founder Section */}
      {aboutContent?.founderInfo && (
        <section className="section-padding-y bg-white">
          <div className="container max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Our Founder
              </h2>
              <div className="w-24 h-1 bg-linear-to-r from-primary to-accent mx-auto rounded-full" />
            </div>

            <div className="bg-linear-to-br from-white to-muted/30 rounded-3xl p-1 shadow-2xl">
              <div className="bg-white rounded-3xl p-8 md:p-12">
                <div className="md:flex gap-10 items-center">
                  {aboutContent.founderInfo.photo && (
                    <div className="md:w-2/5 mb-8 md:mb-0">
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-linear-to-r from-primary via-accent to-secondary rounded-2xl opacity-75 group-hover:opacity-100 blur transition duration-500" />
                        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-200 shadow-xl">
                          <Image
                            src={urlFor(aboutContent.founderInfo.photo).url()}
                            alt={aboutContent.founderInfo.name || 'Founder'}
                            width={400}
                            height={400}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  <div className={aboutContent.founderInfo.photo ? 'md:w-3/5 space-y-6' : 'space-y-6'}>
                    <div>
                      <h3 className="font-heading text-3xl md:text-4xl font-bold mb-2 text-primary">
                        {aboutContent.founderInfo.name || 'Pastor (Dr.) William Folorunso Kumuyi'}
                      </h3>
                      {aboutContent.founderInfo.title && (
                        <div className="flex items-center gap-2 text-accent font-semibold text-lg mb-6">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                          <p>{aboutContent.founderInfo.title}</p>
                        </div>
                      )}
                    </div>
                    {aboutContent.founderInfo.bio ? (
                      <div className="prose prose-lg max-w-none text-gray-700">
                        <PortableText value={aboutContent.founderInfo.bio} />
                      </div>
                    ) : (
                      <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                        <p>
                          Pastor William Folorunso Kumuyi is the founder and general
                          superintendent of the Deeper Christian Life Ministry, a
                          non-denominational church with global reach. He is known for his
                          strict adherence to biblical doctrine and his commitment to evangelism.
                        </p>
                        <p>
                          Pastor Kumuyi has written several books and is a popular speaker at
                          Christian conferences and events around the world. His systematic
                          approach to Bible teaching has helped millions grow in their faith
                          and understanding of God&apos;s Word.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Core Beliefs */}
      <section className="section-padding-y bg-muted/50">
        <div className="container max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              What We Believe
            </h2>
            <div className="w-24 h-1 bg-linear-to-r from-primary to-accent mx-auto rounded-full" />
            <p className="mt-6 text-gray-600 text-lg max-w-2xl mx-auto">
              Our core doctrines are rooted in the unchanging truth of God&apos;s Word
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(aboutContent?.coreBeliefs && aboutContent.coreBeliefs.length > 0
              ? aboutContent.coreBeliefs
              : [
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
                    description: "We believe in living a life separated from sin and consecrated to God's service.",
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
                ]
            ).map((belief: { title: string; description: string }, index: number) => {
              // Default icon based on index for fallback beliefs or use a generic icon
              const defaultIcons = [
                <svg key={index} className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>,
                <svg key={index} className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>,
                <svg key={index} className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>,
                <svg key={index} className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>,
                <svg key={index} className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>,
                <svg key={index} className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>,
              ]

              return (
                <div
                  key={belief.title}
                  className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-primary/30 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-primary/5 to-accent/5 rounded-bl-full -mr-4 -mt-4 group-hover:scale-150 transition-transform duration-500" />
                  <div className="relative">
                    <div className="w-12 h-12 bg-linear-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-4 text-white shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      {defaultIcons[index % defaultIcons.length]}
                    </div>
                    <h3 className="font-heading text-xl font-bold mb-3 text-primary">
                      {belief.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{belief.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="section-padding-y bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Our Leadership
            </h2>
            <div className="w-24 h-1 bg-linear-to-r from-primary to-accent mx-auto rounded-full" />
            <p className="mt-6 text-gray-600 text-lg max-w-2xl mx-auto">
              Meet the dedicated servants leading our congregation
            </p>
          </div>
          <Team members={data.team} />
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding-y bg-linear-to-b from-muted/30 via-white to-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Our Journey
            </h2>
            <div className="w-24 h-1 bg-linear-to-r from-primary to-accent mx-auto rounded-full" />
            <p className="mt-6 text-gray-600 text-lg max-w-2xl mx-auto">
              From humble beginnings to a global ministry
            </p>
          </div>
          <Timeline
            events={
              aboutContent?.timeline && aboutContent.timeline.length > 0
                ? aboutContent.timeline
                : [
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
                  ]
            }
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
