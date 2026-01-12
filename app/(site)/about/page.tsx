import { client } from '@/lib/sanity/client'
import { groq } from 'next-sanity'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import Timeline from '@/components/sections/Timeline'
import Team from '@/components/sections/Team'
import { PortableText } from '@portabletext/react'
import CTA from '@/components/sections/CTA'
import PageHero from '@/components/sections/PageHero'

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
        }
      }
    `)
  } catch (error) {
    console.warn('Failed to fetch about page data (this is expected during build without Sanity credentials)', error)
    return { settings: null, team: [] }
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
      <section className="py-32 bg-white relative">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-10 shadow-sm border border-border">
              <h2 className="font-heading text-3xl font-bold mb-6 text-foreground">
                Our Mission
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                {aboutContent?.mission ||
                  'To bring people to Christ and build them up in the faith through biblical teaching, passionate worship, fervent prayer, and dedicated service, while maintaining holiness and righteousness in all aspects of life.'}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-10 shadow-sm border border-border">
              <h2 className="font-heading text-3xl font-bold mb-6 text-foreground">
                Our Vision
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                {aboutContent?.vision ||
                  "To be a Christ-centered church that transforms lives through the power of God's Word, equipping believers to live holy lives and fulfill the Great Commission in Lewisville, Texas, and beyond."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Church History */}
      <section className="py-32 bg-muted/20 relative">
        <div className="container max-w-4xl">
          <div className="text-center mb-20">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-foreground">
              {aboutContent?.historyTitle || 'Our History'}
            </h2>
          </div>

          {aboutContent?.history ? (
            <div className="bg-white rounded-2xl p-10 md:p-12 shadow-sm border border-border">
              <div className="prose prose-lg max-w-none text-foreground/80">
                <PortableText value={aboutContent.history} />
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-10 shadow-sm border border-border">
                <h3 className="font-heading text-2xl font-bold mb-6 text-foreground">
                  Deeper Christian Life Ministry Worldwide
                </h3>
                <div className="space-y-4 text-foreground/80 leading-relaxed">
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

              <div className="bg-white rounded-2xl p-10 shadow-sm border border-border">
                <h3 className="font-heading text-2xl font-bold mb-6 text-foreground">
                  DCLM Lewisville, Texas
                </h3>
                <div className="space-y-4 text-foreground/80 leading-relaxed">
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
        <section className="py-32 bg-white relative">
          <div className="container max-w-5xl">
            <div className="text-center mb-20">
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Our Founder
              </h2>
            </div>

            <div className="bg-white rounded-2xl p-10 md:p-12 shadow-sm border border-border">
              <div className="md:flex gap-12 items-center">
                {aboutContent.founderInfo.photo && (
                  <div className="md:w-2/5 mb-8 md:mb-0">
                    <div className="relative aspect-square rounded-xl overflow-hidden">
                      <Image
                        src={urlFor(aboutContent.founderInfo.photo).url()}
                        alt={aboutContent.founderInfo.name || 'Founder'}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
                <div className={aboutContent.founderInfo.photo ? 'md:w-3/5 space-y-6' : 'space-y-6'}>
                  <div>
                    <h3 className="font-heading text-3xl font-bold mb-2 text-foreground">
                      {aboutContent.founderInfo.name || 'Pastor (Dr.) William Folorunso Kumuyi'}
                    </h3>
                    {aboutContent.founderInfo.title && (
                      <p className="text-foreground/70 text-lg">{aboutContent.founderInfo.title}</p>
                    )}
                  </div>
                  {aboutContent.founderInfo.bio ? (
                    <div className="prose prose-lg max-w-none text-foreground/80">
                      <PortableText value={aboutContent.founderInfo.bio} />
                    </div>
                  ) : (
                    <div className="space-y-4 text-foreground/80 leading-relaxed">
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
        </section>
      )}

      {/* What We Believe */}
      <section className="py-32 bg-muted/20 relative">
        <div className="container max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-foreground">
              What We Believe
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Our core doctrines are rooted in the unchanging truth of God&apos;s Word
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            ).map((belief: { title: string; description: string }) => (
              <div
                key={belief.title}
                className="bg-white rounded-xl p-8 shadow-sm border border-border"
              >
                <h3 className="font-heading text-xl font-bold mb-4 text-foreground">
                  {belief.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">{belief.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-32 bg-white relative">
        <div className="container">
          <div className="text-center mb-20">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Our Leadership
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Meet the dedicated servants leading our congregation
            </p>
          </div>
          <Team members={data.team} />
        </div>
      </section>

      {/* Timeline */}
      {aboutContent?.timeline && aboutContent.timeline.length > 0 && (
        <section className="py-32 bg-muted/20 relative">
          <div className="container">
            <div className="text-center mb-20">
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Our Journey
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                From humble beginnings to a global ministry
              </p>
            </div>
            <Timeline events={aboutContent.timeline} />
          </div>
        </section>
      )}

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
