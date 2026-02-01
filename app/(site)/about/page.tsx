import { client } from '@/lib/sanity/client'
import { groq } from 'next-sanity'
import Image from 'next/image'
import {
  BookOpen,
  Church,
  Heart,
  Sparkles,
  Baby,
  RotateCcw,
  Scale,
  Droplets,
  Wine,
  Flame,
  Cross,
  Stethoscope,
  Megaphone,
  Users,
  Cloud,
  Sunrise,
  AlertTriangle,
  Crown,
  Gavel,
  Sun,
  CircleOff,
  type LucideIcon
} from 'lucide-react'
import Team from '@/components/sections/Team'
import HeroSection from '@/components/sections/HeroSection'

export const metadata = {
  title: 'About Us',
  description: 'Learn about Deeper Life Bible Church Lewisville, our history, mission, and leadership.',
}

interface Belief {
  id: number
  icon: LucideIcon
  title: string
  description: string
  references: string
}

const beliefs: Belief[] = [
  {
    id: 1,
    icon: BookOpen,
    title: 'The Holy Bible',
    description: 'We believe that the Holy Bible is the inspired, infallible and authoritative Word of God.',
    references: '2 Tim. 3:16; 2 Pet. 1:20-21'
  },
  {
    id: 2,
    icon: Church,
    title: 'The Godhead',
    description: 'We believe in the unity of the Godhead and the trinity of the persons therein – Father, Son and Holy Spirit.',
    references: 'Gen. 1:26; Matt. 3:16-17; 28:19'
  },
  {
    id: 3,
    icon: Baby,
    title: 'Virgin Birth',
    description: 'We believe in the Virgin Birth, Sinless Life, Atoning Death, Triumphant Resurrection, Ascension and Abiding Intercession of our Lord Jesus Christ and His Second Coming, the hope of believers.',
    references: 'Isa. 7:14; Matt. 1:18-25; Heb. 4:14-15; 9:12; Acts 1:9-11; 1 Thess. 4:16-17'
  },
  {
    id: 4,
    icon: Heart,
    title: 'Man\'s Depravity',
    description: 'We believe in the fall and depravity of man who can be saved only through the merits of Jesus Christ.',
    references: 'Rom. 3:23; 5:12; Acts 4:12'
  },
  {
    id: 5,
    icon: RotateCcw,
    title: 'Repentance',
    description: 'We believe in Salvation through repentance towards God and faith in the Lord Jesus Christ.',
    references: 'Acts 20:21; Rom. 10:9-10; Eph. 2:8-9'
  },
  {
    id: 6,
    icon: Scale,
    title: 'Restitution',
    description: 'We believe in Restitution – making amends for wrongs done against our fellow men: giving back things wrongfully taken, or their equivalent and payment of debts and restoration wherever possible.',
    references: 'Lev. 6:2-5; Ezek. 33:14-16; Luke 19:8'
  },
  {
    id: 7,
    icon: Cross,
    title: 'Justification',
    description: 'We believe in Justification by faith in the Lord Jesus Christ.',
    references: 'Rom. 4:5; 5:1; Gal. 2:16'
  },
  {
    id: 8,
    icon: Droplets,
    title: 'Water Baptism',
    description: 'We believe in Water Baptism by immersion, in the Name of the Father, of the Son and of the Holy Spirit.',
    references: 'Matt. 28:19; Acts 2:38; Rom. 6:3-4'
  },
  {
    id: 9,
    icon: Wine,
    title: 'The Lord\'s Supper',
    description: 'We believe in the Sacrament of the Lord\'s Supper for believers in Christ.',
    references: '1 Cor. 11:23-26; Luke 22:14-20'
  },
  {
    id: 10,
    icon: Sparkles,
    title: 'Sanctification',
    description: 'We believe in Sanctification as a second definite but instantaneous work of grace, obtainable by faith on the part of the regenerated.',
    references: '1 Thess. 4:3; 5:23; Heb. 13:12'
  },
  {
    id: 11,
    icon: Flame,
    title: 'Holy Ghost Baptism',
    description: 'We believe in the Baptism of the Holy Ghost for believers with the evidence of speaking in tongues.',
    references: 'Acts 1:8; 2:4; 10:44-46'
  },
  {
    id: 12,
    icon: Stethoscope,
    title: 'Redemption from Sickness',
    description: 'We believe that our redemption from sickness and disease has been provided for in the atonement.',
    references: 'Isa. 53:4-5; Matt. 8:17; 1 Pet. 2:24'
  },
  {
    id: 13,
    icon: Megaphone,
    title: 'Personal Evangelism',
    description: 'We believe in Personal Evangelism and soul winning as the supreme task of the Church. All Christians should give public witness to the Gospel through personal word, consistent walk and by earnest contending for the faith once delivered unto the saints.',
    references: 'Mark 16:15; Acts 1:8; Jude 3'
  },
  {
    id: 14,
    icon: Users,
    title: 'Marriage & Home',
    description: 'We believe in Marriage as an institution of God and that the home should be a place of true piety where children should be brought up in the fear and admonition of the Lord.',
    references: 'Gen. 2:24; Eph. 5:22-33; 6:1-4'
  },
  {
    id: 15,
    icon: Cloud,
    title: 'The Rapture',
    description: 'We believe in the Rapture of the saints at the Second Coming of Christ when all believers both dead and living shall rise to meet the Lord in the air.',
    references: '1 Thess. 4:16-17; 1 Cor. 15:51-52'
  },
  {
    id: 16,
    icon: Sunrise,
    title: 'Resurrection',
    description: 'We believe in the Resurrection of both the saved and the lost, the saved to everlasting life and the lost to everlasting damnation.',
    references: 'John 5:28-29; Rev. 20:11-15'
  },
  {
    id: 17,
    icon: AlertTriangle,
    title: 'The Great Tribulation',
    description: 'We believe in the Great Tribulation which will occur after the Rapture of the saints, during which there will be terrible judgments from God upon the wicked and apostate.',
    references: 'Matt. 24:21; Rev. 7:14; 2 Thess. 2:3-12'
  },
  {
    id: 18,
    icon: Crown,
    title: 'Second Coming of Christ',
    description: 'We believe in the Personal, Bodily and Glorious Second Coming of our Lord Jesus Christ to establish His Millennial Kingdom on earth.',
    references: 'Acts 1:11; Rev. 19:11-16; Zech. 14:4'
  },
  {
    id: 19,
    icon: Church,
    title: 'Millennial Reign',
    description: 'We believe in the 1000 years reign of Christ on earth with His saints, the New Jerusalem serving as the headquarters.',
    references: 'Rev. 20:4-6; 21:1-2'
  },
  {
    id: 20,
    icon: Gavel,
    title: 'White Throne Judgement',
    description: 'We believe in the Great White Throne Judgement when the wicked dead shall be resurrected and judged according to their works.',
    references: 'Rev. 20:11-15'
  },
  {
    id: 21,
    icon: Sun,
    title: 'New Heaven & Earth',
    description: 'We believe in the New Heaven and New Earth where righteousness dwells forever.',
    references: '2 Pet. 3:13; Rev. 21:1-4'
  },
  {
    id: 22,
    icon: CircleOff,
    title: 'Hell',
    description: 'We believe in the reality of Hell – a place of eternal torment and separation from God for those who reject Christ.',
    references: 'Matt. 25:46; Mark 9:43-48; Rev. 20:14-15'
  },
]

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
              "You are always welcome here."
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beliefs.map((belief) => {
              const Icon = belief.icon
              return (
                <article
                  key={belief.id}
                  className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-(--church-red)/20 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-(--church-red) via-(--church-red)/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <header className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-(--church-navy)/5 text-(--church-navy) flex items-center justify-center shrink-0 group-hover:bg-(--church-red) group-hover:text-white transition-colors duration-300">
                      <Icon size={22} strokeWidth={1.5} />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-(--church-red)/60 uppercase tracking-wider">
                        Tenet {belief.id}
                      </span>
                      <h3 className="font-bold text-lg text-(--church-navy) group-hover:text-(--church-red) transition-colors leading-tight">
                        {belief.title}
                      </h3>
                    </div>
                  </header>

                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {belief.description}
                  </p>

                  <footer className="pt-3 border-t border-slate-100">
                    <p className="text-xs text-slate-400 font-medium">
                      <span className="text-(--church-navy)/70 font-semibold">References:</span>{' '}
                      {belief.references}
                    </p>
                  </footer>
                </article>
              )
            })}
          </div>
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
                  <p className="font-display text-5xl font-bold text-[var(--church-red)]">25+</p>
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
                  What started as a small prayer gathering has blossomed into a
                  vibrant beacon of hope in the heart of Lewisville. From our
                  humble beginnings, our focus has always remained steadfast:
                  preaching the unadulterated word of God.
                </p>

                <blockquote className="border-l-4 border-[var(--church-red)] pl-6 py-2 my-8 bg-[var(--church-navy)]/5 rounded-r-lg">
                  <p className="font-serif text-xl text-[var(--church-navy)] italic mb-2">
                    "The Lord has done great things for us, and we are filled with joy."
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