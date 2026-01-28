import { client } from '@/lib/sanity/client'
import { groq } from 'next-sanity'
import Image from 'next/image'
import { BookOpen, Church, Heart, Waves, Sparkles, type LucideIcon } from 'lucide-react'
import Timeline from '@/components/sections/Timeline'
import Team from '@/components/sections/Team'
import CTA from '@/components/sections/CTA'
import HeroSection from '@/components/sections/HeroSection'

export const metadata = {
  title: 'About Us',
  description:
    'Learn about Deeper Life Bible Church Lewisville, our history, mission, and leadership.',
}

interface Belief {
  icon: LucideIcon
  title: string
  description: string
}

const beliefs: Belief[] = [
  {
    icon: BookOpen,
    title: 'The Bible',
    description:
      'We believe the Holy Bible is the inspired and infallible Word of God.',
  },
  {
    icon: Church,
    title: 'The Trinity',
    description:
      'We believe in the Father, the Son, and the Holy Spirit as one God.',
  },
  {
    icon: Heart,
    title: 'Salvation',
    description:
      'Redemption is through the blood of Jesus Christ and faith in Him.',
  },
  {
    icon: Waves,
    title: 'Baptism',
    description:
      'We practice water baptism by immersion in the name of the Lord.',
  },
  {
    icon: Sparkles,
    title: 'The Spirit',
    description:
      'We believe in the baptism of the Holy Spirit and His spiritual gifts.',
  },
]

const HISTORY_IMAGE_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD08Y1p0GG26GLslxgJIlCXK4GY8H9sr6oZivzzkHVKJUb6mGuZbuNzSbo5HiZZC--FYDeL2qH4nsJofgXKu70WFs_IaqsLjETd-LaRWZbEuftuZe27W2D52cTcP0crb94hqKQJeuKnRVCInEYAHPUGudsd0ODV-onA4a2NrRXKrb5LhFRxYrmSQxgYaOPT4WqDUFKiOIc7I-XTQCjNck78IP1byk67wNwZAgq1rsZcnbJgaYC0UPsrK14CC4XLrZVF714v_dU82CA'

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
    console.warn(
      'Failed to fetch about page data (this is expected during build without Sanity credentials)',
      error
    )
    return { settings: null, team: [] }
  }
}

export default async function AboutPage() {
  const data = await getAboutData()
  const aboutContent = data.settings?.aboutContent

  return (
    <main>
      <HeroSection title="About Us" subtitle="Get To Know Us" />

      {/* Mission & Vision */}
      <section
        className="py-24 px-6 max-w-5xl mx-auto text-center"
        aria-labelledby="mission-heading"
      >
        <h2
          id="mission-heading"
          className="font-display text-3xl md:text-5xl text-(--church-navy) leading-tight mb-8"
        >
          Every one of us was created to belong to a community. It was never
          God&apos;s heart for us to do this life alone.
        </h2>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-6 leading-relaxed">
          DCLM Lewisville is the citadel for Christ-centered living, a place of
          hunger and insatiable thirst for more of God. We are a family-oriented
          place for true worship, unadulterated teachings, and unwavering charge
          to preach the gospel of Jesus to a dying world.
        </p>
        <p className="italic text-(--church-red) font-display text-2xl font-semibold">
          You are always welcome here!
        </p>
      </section>

      {/* What We Believe */}
      <section
        className="bg-slate-50 py-24 border-y border-slate-100"
        aria-labelledby="beliefs-heading"
      >
        <div className="max-w-7xl mx-auto px-6">
          <header className="text-center mb-16">
            <span className="text-(--church-red) font-bold uppercase tracking-widest text-xs">
              Our Core
            </span>
            <h2
              id="beliefs-heading"
              className="font-display text-4xl md:text-5xl mt-2 text-(--church-navy)"
            >
              What We Believe
            </h2>
          </header>

          <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 list-none">
            {beliefs.map((belief) => {
              const Icon = belief.icon

              return (
                <li
                  key={belief.title}
                  className="bg-white p-8 rounded shadow-sm border-t-4 border-(--church-red) text-center transition-transform hover:-translate-y-1"
                >
                  <Icon
                    className="text-(--church-red) mx-auto mb-4"
                    size={40}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <h3 className="font-display text-xl font-bold mb-3 text-(--church-navy)">
                    {belief.title}
                  </h3>
                  <p className="text-sm text-slate-500">{belief.description}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* Church History */}
      <section
        className="py-24 overflow-hidden"
        aria-labelledby="history-heading"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <figure className="w-full lg:w-1/2 relative">
              <div
                className="absolute -top-6 -left-6 w-32 h-32 bg-(--church-red)/10 rounded-full blur-3xl"
                aria-hidden="true"
              />
              <Image
                src={HISTORY_IMAGE_URL}
                alt="Deeper Life Bible Church Lewisville building"
                width={600}
                height={500}
                className="rounded-lg shadow-2xl relative z-10 w-full h-[500px] object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
              <figcaption className="absolute -bottom-10 -right-10 hidden lg:block z-20">
                <div className="bg-(--church-red) text-white p-8 rounded-lg shadow-xl">
                  <p className="font-display text-4xl font-bold">25+</p>
                  <p className="text-xs uppercase tracking-widest font-semibold opacity-80">
                    Years of Service
                  </p>
                </div>
              </figcaption>
            </figure>

            <article className="w-full lg:w-1/2">
              <header>
                <span className="text-(--church-red) font-bold uppercase tracking-[0.2em] text-xs">
                  Our Journey
                </span>
                <h2
                  id="history-heading"
                  className="font-display text-5xl md:text-6xl mt-4 mb-8 text-(--church-navy)"
                >
                  Our History
                </h2>
              </header>

              <div className="space-y-6 text-slate-600">
                <p className="leading-relaxed">
                  What started as a small prayer gathering has blossomed into a
                  vibrant beacon of hope in the heart of Lewisville. From our
                  humble beginnings, our focus has always remained steadfast:
                  preaching the unadulterated word of God and reaching out to
                  the community with Christ&apos;s love.
                </p>

                <blockquote className="border-l-4 border-(--church-red) pl-6">
                  <p className="italic font-display text-xl text-(--church-navy)">
                    &quot;The Lord has done great things for us, and we are
                    filled with joy.&quot;
                  </p>
                  <footer className="mt-2">
                    <cite className="text-slate-500 text-sm not-italic">
                      — Psalm 126:3
                    </cite>
                  </footer>
                </blockquote>

                <p className="leading-relaxed">
                  Throughout the years, we have witnessed countless testimonies
                  of transformation, healing, and restored faith. Our history is
                  not just about buildings or dates, but about the lives touched
                  by the power of the Gospel.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section
        className="py-32 bg-white relative"
        aria-labelledby="leadership-heading"
      >
        <div className="container">
          <header className="text-center mb-20">
            
            <h2
              id="leadership-heading"
              className="font-display text-4xl md:text-5xl mb-6 text-(--church-navy)"
            >
              Our Leadership
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Meet the dedicated servants leading our congregation
            </p>
          </header>
          <Team members={data.team} />
        </div>
      </section>
      {/* Timeline 
      <CTA
        title="Want to Learn More?"
        description="Join us for a service or reach out with any questions"
        primaryButton={{ text: 'Contact Us', href: '/contact' }}
        secondaryButton={{ text: 'Plan Your Visit', href: '/contact' }}
      />
      */}
    </main>
  )
}
