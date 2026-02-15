import { client } from '@/lib/sanity/client'
import { groq } from 'next-sanity'
import Image from 'next/image'
import Team from '@/components/sections/Team'
import HeroSection from '@/components/sections/HeroSection'
import CoreBeliefs from '@/components/sections/about/CoreBeliefs'

export const metadata = {
  title: 'About Us',
  description: 'Learn about Deeper Life Bible Church Lewisville, our history, mission, and leadership.',
}

const HISTORY_IMAGE_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuD08Y1p0GG26GLslxgJIlCXK4GY8H9sr6oZivzzkHVKJUb6mGuZbuNzSbo5HiZZC--FYDeL2qH4nsJofgXKu70WFs_IaqsLjETd-LaRWZbEuftuZe27W2D52cTcP0crb94hqKQJeuKnRVCInEYAHPUGudsd0ODV-onA4a2NrRXKrb5LhFRxYrmSQxgYaOPT4WqDUFKiOIc7I-XTQCjNck78IP1byk67wNwZAgq1rsZcnbJgaYC0UPsrK14CC4XLrZVF714v_dU82CA'

async function getAboutData() {
  try {
    return await client.fetch(groq`
      {
        "settings": *[_type == "siteSettings"][0] {
          aboutContent
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
    // Return empty state on failure (allows placeholders to take over)
    return { settings: null, team: [] }
  }
}

export default async function AboutPage() {
  const data = await getAboutData()
  
  return (
    <main className="bg-white">
      {/* Reusing your HeroSection - assuming it accepts these props */}
      <HeroSection
        title="About Us"
        subtitle="Our Story & Mission"
      />

      {/* --- Mission Statement --- */}
      <section className="py-24 px-6 relative overflow-hidden" aria-labelledby="mission-heading">
         {/* Background Decoration */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[var(--church-navy)]/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-4xl mx-auto text-center space-y-8">
          <span className="inline-block py-1 px-3 rounded-full bg-[var(--church-red)]/10 text-[var(--church-red)] text-xs font-bold tracking-[0.2em] uppercase">
            Our Purpose
          </span>
          
          <h2 id="mission-heading" className="font-serif text-3xl md:text-5xl text-[var(--church-navy)] leading-tight">
            Created to belong. <br/> 
            <span className="italic text-gray-400">Designed for community.</span>
          </h2>
          
          <div className="prose prose-lg mx-auto text-slate-600 leading-relaxed">
            <p>
              DCLM Lewisville is the citadel for Christ-centered living, a place of
              hunger and insatiable thirst for more of God. We are a family-oriented
              place for true worship, unadulterated teachings, and unwavering charge
              to preach the gospel of Jesus to a dying world.
            </p>
          </div>

          <div className="pt-8">
            <p className="font-serif text-2xl text-[var(--church-navy)] italic">
              &quot;You are always welcome here.&quot;
            </p>
          </div>
        </div>
      </section>

      {/* --- Core Beliefs --- */}
      <section className="bg-slate-50 py-24 relative" aria-labelledby="beliefs-heading">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-(--church-red)/10 text-(--church-red) text-xs font-bold tracking-[0.2em] uppercase mb-4">
              Our Foundation
            </span>
            <h2 id="beliefs-heading" className="font-serif text-4xl md:text-5xl text-[var(--church-navy)] mb-4">
              What We Believe
            </h2>
            <p className="text-slate-500 text-lg">
              The 22 tenets of faith that guide our community and define our doctrine.
            </p>
          </div>

          <CoreBeliefs />
        </div>
      </section>

      {/* --- History Section --- */}
      <section className="py-24 lg:py-32 overflow-hidden" aria-labelledby="history-heading">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Image Side */}
            <div className="w-full lg:w-1/2 relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-[var(--church-navy)]/20 to-transparent rounded-[2rem] -z-10 rotate-3 group-hover:rotate-1 transition-transform duration-500" />
              
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] lg:aspect-square">
                <Image
                  src={HISTORY_IMAGE_URL}
                  alt="Church history"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[var(--church-navy)]/10 group-hover:bg-transparent transition-colors" />
                
                {/* Floating Stat Card */}
                <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/20 max-w-[200px]">
                  <p className="font-display text-5xl font-bold text-[var(--church-red)]">8+</p>
                  <p className="text-xs font-bold text-[var(--church-navy)] uppercase tracking-widest mt-1">
                    Years of Faithfulness
                  </p>
                </div>
              </div>
            </div>

            {/* Content Side */}
            <article className="w-full lg:w-1/2 space-y-8">
              <header>
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-px w-8 bg-[var(--church-red)]" />
                  <span className="text-[var(--church-red)] font-bold uppercase tracking-[0.2em] text-xs">
                    Our Journey
                  </span>
                </div>
                <h2 id="history-heading" className="font-serif text-4xl md:text-5xl text-[var(--church-navy)] leading-[1.1]">
                  From Humble Beginnings to a <span className="italic text-[var(--church-red)]">Legacy of Faith</span>
                </h2>
              </header>

              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>
                  What started as a small worship gathering has blossomed into a
                  vibrant beacon of hope in the heart of Lewisville. From our
                  humble beginnings, our focus has always remained steadfast:
                  preaching the unadulterated word of God.
                </p>

                <blockquote className="border-l-4 border-[var(--church-red)] pl-6 py-2 my-8 bg-[var(--church-navy)]/5 rounded-r-lg">
                  <p className="font-serif text-xl text-[var(--church-navy)] italic mb-2">
                    &quot;The Lord has done great things for us, and we are filled with joy.&quot;
                  </p>
                  <footer className="text-sm font-bold text-[var(--church-red)] uppercase tracking-wider">
                    — Psalm 126:3
                  </footer>
                </blockquote>

                <p>
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

      {/* --- Leadership Team --- */}
      <section className="py-24 bg-slate-50 border-t border-slate-200" aria-labelledby="leadership-heading">
        <div className="max-w-7xl mx-auto px-6">
          <header className="text-center mb-16 max-w-2xl mx-auto">
            <h2 id="leadership-heading" className="font-serif text-4xl md:text-5xl mb-4 text-[var(--church-navy)]">
              Our Leadership
            </h2>
            <p className="text-lg text-slate-500">
              Meet the dedicated servants committed to shepherding our congregation and serving our community.
            </p>
          </header>
          
          <Team members={data.team} />
        </div>
      </section>
    </main>
  )
}