import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/lib/sanity/client'
import { sermonsQuery } from '@/lib/sanity/queries'
import { PlayCircle, User, Calendar, Youtube, ExternalLink } from 'lucide-react'

export const metadata = {
  title: 'Sermons Library',
  description: 'Listen to recent sermons and teachings from DCLM Lewisville.',
}

interface SermonMessage {
  slug: string
  title: string
  speaker: string
  date: string
  duration: string
  category: string
  description: string
}

const recentMessages: SermonMessage[] = [
  {
    slug: 'the-all-sufficient-name-of-jesus',
    title: 'The All-Sufficient Name of Jesus',
    speaker: 'Pastor W.F. Kumuyi',
    date: 'Jan 14, 2026',
    duration: '58:30',
    category: 'Sunday Service',
    description: 'Understanding the power and authority vested in the name of Jesus for every believer.'
  },
  {
    slug: 'christs-power-to-heal',
    title: "Christ's Power to Heal",
    speaker: 'Pastor Raymond Akoko',
    date: 'Jan 07, 2026',
    duration: '45:10',
    category: 'Bible Study',
    description: 'A deep dive into the healing ministry of Jesus and how it applies to us today.'
  },
  {
    slug: 'the-first-faith-and-first-love',
    title: 'The First Faith and First Love',
    speaker: 'Pastor W.F. Kumuyi',
    date: 'Dec 31, 2025',
    duration: '1:02:45',
    category: 'Special Event',
    description: 'Returning to the fundamentals of our walk with God: faith and love.'
  },
  {
    slug: 'walking-in-divine-health',
    title: 'Walking in Divine Health',
    speaker: 'Evangelist Mark Johnson',
    date: 'Dec 24, 2025',
    duration: '52:15',
    category: 'Revival Service',
    description: 'Practical steps to walking in the health that Christ has purchased for us.'
  },
  {
    slug: 'the-virtuous-woman-today',
    title: 'The Virtuous Woman Today',
    speaker: 'Sister Esther Kumuyi',
    date: 'Dec 15, 2025',
    duration: '48:30',
    category: "Women's Conference",
    description: 'Applying the principles of Proverbs 31 in a modern, fast-paced world.'
  },
  {
    slug: 'standing-tall-in-babylon',
    title: 'Standing Tall in Babylon',
    speaker: 'Pastor John Doe',
    date: 'Dec 01, 2025',
    duration: '40:15',
    category: 'Youth Impact',
    description: 'How young people can maintain their convictions in a compromising world.'
  },
]

const HERO_BG_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIhPjucaEn1H4mnfRBUyJ7uJ1ekby9Nceih4ThLydW5fr7QlbmkK_4TAEZdto7YLXwzDYR750nwSQUnR-T1s2mltdaGAMys6JCWVr3nOUr5xU9GrbLWvg0p5vidDRJ4KUAGRhLAIN6phtQ2u7o54iqvAcHqeoAkqRs7SkX-_Y3CH6AsDgXFt0CWpA3UlA1ugwnuyp0EKCEf37_FvbF5_bFEaBy8GjFcERW3BVA5JrK8la5RrVU0jG3M-blNJDoRVe4PlwNZfWTm-g'
const FEATURED_SERMON_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeBfFsGGqfmgnnsceuG1bi03bJBqL0W380sv1Tx15lis5Nn7nidWbLsUqQn590kEmfBaTKnKHKIM7vNokZxE5jqab3hcf85PnJ58yHPf230zkhNjjaf2WLSv3v26WVaqNOGsEtM5ovdMFqAfhVmYyWN2EAdGRuZdqlS0UntLkDxH92J1mkJiYDaSL9KQxWgWKhN972CWh-_kQi6qZ3xBgNwdILJyUdvk1bHd1c2wds-_LwsuuXl0-QXNHrkI4XOxzwfpMhEm8P6fE'

export default async function SermonsPage() {
  let sermons = []
  try {
    sermons = await client.fetch(sermonsQuery)
  } catch (error) {
    // console.warn('Failed to fetch sermons...')
  }

  return (
    <main className="bg-slate-50 min-h-screen">

      {/* --- HERO SECTION --- */}
      <header className="relative py-32 lg:py-48 overflow-hidden bg-[var(--church-navy)]">
        {/* Background Image with modern overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={HERO_BG_IMAGE}
            alt="Worship background"
            fill
            className="object-cover opacity-30 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--church-navy)] via-[var(--church-navy)]/80 to-[var(--church-navy)]/40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-white/90 text-xs font-bold tracking-[0.2em] uppercase mb-8 shadow-xl">
            <PlayCircle size={14} className="text-[var(--church-red)]" />
            Media Library
          </div>

          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 tracking-tight leading-[1.1] drop-shadow-md">
            Sermons & <span className="text-[var(--church-red)]">Resources</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Access a growing library of life-transforming messages. Watch,
            listen, and download resources to help you grow in your walk with God.
          </p>
        </div>
      </header>

      {/* --- LATEST FROM DCLM HQ --- */}
      <section className="py-16 bg-white border-b border-slate-100" aria-labelledby="dclm-hq-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="flex items-center gap-4 mb-8">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--church-navy)]/5 text-[var(--church-red)]">
              <Youtube size={18} />
            </span>
            <div>
              <h2 id="dclm-hq-heading" className="text-xl font-bold text-[var(--church-navy)] tracking-tight">
                Latest from DCLM HQ
              </h2>
              <p className="text-sm text-slate-500">
                Fresh messages straight from the Deeper Christian Life Ministry channel.
              </p>
            </div>
          </header>

          <div className="grid lg:grid-cols-5 gap-8 items-center">
            <div className="lg:col-span-3 aspect-video rounded-2xl overflow-hidden shadow-xl ring-1 ring-slate-200 bg-black">
              <iframe
                src="https://www.youtube.com/embed/videoseries?list=UU4zsqN5YdXfxkkdVvwNA3JA"
                title="Latest messages from Deeper Christian Life Ministry"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>

            <div className="lg:col-span-2 space-y-4">
              <p className="text-slate-600 leading-relaxed">
                Every week, Pastor (Dr.) W.F. Kumuyi and the Deeper Christian
                Life Ministry family share Bible-centered messages from DCLM
                Headquarters in Lagos. Watch the latest — or catch up on past
                messages — right from our channel.
              </p>
              <a
                href="https://www.youtube.com/@DCLMHQ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[var(--church-red)] font-bold hover:underline"
              >
                Subscribe on YouTube
                <ExternalLink size={14} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <section className="py-20" aria-labelledby="sermons-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Featured Sermon */}
          <div className="mb-24">
            <header className="flex items-center gap-4 mb-8">
               <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--church-navy)]/5 text-[var(--church-red)]">
                  <PlayCircle size={18} />
               </span>
               <h2 id="sermons-heading" className="text-xl font-bold text-[var(--church-navy)] tracking-tight">
                 Featured Message
               </h2>
            </header>

            <article className="group relative bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100/50 hover:shadow-2xl hover:border-[var(--church-red)]/10 transition-all duration-500">
              <Link href="/sermons/conditions-of-security-in-christ" className="grid lg:grid-cols-5 h-full">

                {/* Thumbnail Side */}
                <figure className="lg:col-span-3 relative min-h-[300px] lg:min-h-[450px] overflow-hidden bg-gray-900">
                  <Image
                    src={FEATURED_SERMON_IMAGE}
                    alt="Featured sermon thumbnail"
                    fill
                    className="object-cover opacity-90 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                  />
                </figure>

                {/* Content Side */}
                <div className="lg:col-span-2 p-8 lg:p-12 flex flex-col justify-center bg-white relative">
                  <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                     <PlayCircle size={120} />
                  </div>

                  <span className="inline-block w-fit px-3 py-1 rounded bg-[var(--church-navy)]/5 text-[var(--church-navy)] text-xs font-bold uppercase tracking-widest mb-6">
                    New Series
                  </span>

                  <h3 className="text-3xl lg:text-4xl font-serif font-bold text-[var(--church-navy)] mb-4 leading-[1.1] group-hover:text-[var(--church-red)] transition-colors">
                    Conditions of Security in Christ
                  </h3>

                  <p className="text-slate-600 mb-8 leading-relaxed text-lg font-light">
                    Discover the unshakeable foundation of your faith. In this
                    powerful message, we explore what it means to be truly
                    secure in Jesus amidst life&apos;s uncertainties.
                  </p>

                  <div className="space-y-4 mb-10 border-t border-slate-100 pt-6">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-[var(--church-red)]">
                        <User size={16} />
                      </div>
                      <div>
                        <span className="block text-xs text-slate-400 uppercase font-bold tracking-wider">Speaker</span>
                        <span className="font-medium text-[var(--church-navy)]">Pastor W.F. Kumuyi</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-[var(--church-red)]">
                        <Calendar size={16} />
                      </div>
                      <div>
                        <span className="block text-xs text-slate-400 uppercase font-bold tracking-wider">Date</span>
                        <span className="font-medium text-[var(--church-navy)]">January 21, 2026</span>
                      </div>
                    </div>
                  </div>

                  <span className="inline-flex items-center justify-center gap-2 bg-[var(--church-navy)] text-white px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-[var(--church-navy)]/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                    <PlayCircle size={18} />
                    Read the Message
                  </span>
                </div>
              </Link>
            </article>
          </div>

          {/* Recent Messages Grid */}
          <div className="mb-10 flex flex-wrap justify-between items-end gap-4">
            <header>
              <h2 className="text-3xl font-serif font-bold text-[var(--church-navy)]">
                Recent Messages
              </h2>
              <p className="text-slate-500 mt-2">Browse our archive of teachings</p>
            </header>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentMessages.map((msg) => (
              <Link
                key={msg.title}
                href={`/sermons/${msg.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[var(--church-navy)]/5 border border-slate-100 transition-all duration-300 flex flex-col h-full hover:-translate-y-1"
              >
                {/* Card Thumbnail */}
                <figure className="relative aspect-video overflow-hidden bg-gray-100">
                  <Image
                    src={HERO_BG_IMAGE}
                    alt={`${msg.title} thumbnail`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors" />

                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                    {msg.duration}
                  </div>

                  <div className="absolute top-3 left-3 bg-[var(--church-navy)]/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {msg.category}
                  </div>
                </figure>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-4">
                     <h3 className="text-xl font-bold font-serif text-[var(--church-navy)] leading-tight mb-2 group-hover:text-[var(--church-red)] transition-colors line-clamp-2">
                       {msg.title}
                     </h3>
                     <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                       {msg.description}
                     </p>
                  </div>

                  <div className="mt-auto pt-5 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                          <User size={14} />
                       </div>
                       <div className="text-xs">
                          <p className="font-bold text-[var(--church-navy)]">{msg.speaker}</p>
                          <p className="text-slate-400">{msg.date}</p>
                       </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}