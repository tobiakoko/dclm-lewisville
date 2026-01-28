import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { sermonsQuery } from '@/lib/sanity/queries'
import {
  Search,
  Play,
  PlayCircle,
  Download,
  User,
  Calendar,
  Tag,
  LayoutGrid,
  List,
  Headphones,
  FileText,
} from 'lucide-react'

export const metadata = {
  title: 'Sermons',
  description: 'Listen to recent sermons and teachings from DCLM Lewisville.',
}

interface SermonMessage {
  title: string
  speaker: string
  date: string
  duration: string
  category: string
}

const recentMessages: SermonMessage[] = [
  {
    title: 'The All-Sufficient Name of Jesus',
    speaker: 'Pastor W.F. Kumuyi',
    date: 'Jan 14, 2026',
    duration: '58:30',
    category: 'Sunday Service',
  },
  {
    title: "Christ's Power to Heal",
    speaker: 'Pastor Raymond Akoko',
    date: 'Jan 07, 2026',
    duration: '45:10',
    category: 'Bible Study',
  },
  {
    title: 'The First Faith and First Love',
    speaker: 'Pastor W.F. Kumuyi',
    date: 'Dec 31, 2025',
    duration: '1:02:45',
    category: 'Special Event',
  },
  {
    title: 'Walking in Divine Health',
    speaker: 'Evangelist Mark Johnson',
    date: 'Dec 24, 2025',
    duration: '52:15',
    category: 'Revival Service',
  },
  {
    title: 'The Virtuous Woman Today',
    speaker: 'Sister Esther Kumuyi',
    date: 'Dec 15, 2025',
    duration: '48:30',
    category: "Women's Conference",
  },
  {
    title: 'Standing Tall in Babylon',
    speaker: 'Pastor John Doe',
    date: 'Dec 01, 2025',
    duration: '40:15',
    category: 'Youth Impact',
  },
]

const HERO_BG_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDIhPjucaEn1H4mnfRBUyJ7uJ1ekby9Nceih4ThLydW5fr7QlbmkK_4TAEZdto7YLXwzDYR750nwSQUnR-T1s2mltdaGAMys6JCWVr3nOUr5xU9GrbLWvg0p5vidDRJ4KUAGRhLAIN6phtQ2u7o54iqvAcHqeoAkqRs7SkX-_Y3CH6AsDgXFt0CWpA3UlA1ugwnuyp0EKCEf37_FvbF5_bFEaBy8GjFcERW3BVA5JrK8la5RrVU0jG3M-blNJDoRVe4PlwNZfWTm-g'

const FEATURED_SERMON_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAeBfFsGGqfmgnnsceuG1bi03bJBqL0W380sv1Tx15lis5Nn7nidWbLsUqQn590kEmfBaTKnKHKIM7vNokZxE5jqab3hcf85PnJ58yHPf230zkhNjjaf2WLSv3v26WVaqNOGsEtM5ovdMFqAfhVmYyWN2EAdGRuZdqlS0UntLkDxH92J1mkJiYDaSL9KQxWgWKhN972CWh-_kQi6qZ3xBgNwdILJyUdvk1bHd1c2wds-_LwsuuXl0-QXNHrkI4XOxzwfpMhEm8P6fE'

export default async function SermonsPage() {
  let sermons = []

  try {
    sermons = await client.fetch(sermonsQuery)
  } catch (error) {
    console.warn(
      'Failed to fetch sermons (this is expected during build without Sanity credentials)',
      error
    )
  }

  return (
    <main>
      <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-secondary overflow-hidden">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <Image
            src={HERO_BG_IMAGE}
            alt=""
            fill
            className="object-cover opacity-40 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-secondary via-secondary/90 to-secondary/60" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-sm">
            Media Library
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 tracking-tight">
            Sermons & Media
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Access a growing library of life-transforming messages. Watch,
            listen, and download resources to help you grow in your walk with
            God.
          </p>
        </div>
      </header>

      {/* Search Bar */}
      <search className="relative z-20 -mt-8 px-4 sm:px-6 lg:px-8">
        <form className="max-w-6xl mx-auto bg-slate-100 rounded-xl shadow-xl border border-slate-200 p-4 md:p-6 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative grow w-full md:w-auto">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
              aria-hidden="true"
            />
            <label htmlFor="sermon-search" className="sr-only">
              Search sermons
            </label>
            <input
              id="sermon-search"
              name="search"
              type="search"
              className="w-full pl-10 pr-4 py-3  bg-white rounded-lg shadow-sm border-slate-200 focus:ring-secondary focus:border-secondary"
              placeholder="Search sermons by title or keyword..."
            />
          </div>
          <div className="flex w-full md:w-auto gap-4 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            <label htmlFor="topic-filter" className="sr-only">
              Filter by topic
            </label>
            <select
              id="topic-filter"
              name="topic"
              className="form-select border-slate-200 text-sm focus:ring-secondary focus:border-secondary py-3 px-4 min-w-[140px] bg-white rounded-lg shadow-sm"
            >
              <option value="">All Topics</option>
              <option value="faith">Faith</option>
              <option value="salvation">Salvation</option>
              <option value="prayer">Prayer</option>
              <option value="holiness">Holiness</option>
            </select>
            <label htmlFor="speaker-filter" className="sr-only">
              Filter by speaker
            </label>
            <select
              id="speaker-filter"
              name="speaker"
              className="form-select border-slate-200 bg-white rounded-lg shadow-sm text-sm focus:ring-primary focus:border-primary py-3 px-4 min-w-[140px]"
            >
              <option value="">All Speakers</option>
              <option value="kumuyi">Pastor W.F. Kumuyi</option>
              <option value="akoko">Pastor Raymond Akoko</option>
              <option value="guest">Guest Ministers</option>
            </select>
            <button
              type="submit"
              className="bg-primary hover:bg-primary-dark text-background px-6 py-3 rounded-lg font-bold text-sm transition-colors whitespace-nowrap"
            >
              Find Message
            </button>
          </div>
        </form>
      </search>

      {/* Sermons Content */}
      <section
        className="py-20 bg-slate-50"
        aria-labelledby="sermons-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Sermon */}
          <div className="mb-20">
            <header className="flex items-center gap-4 mb-8">
              <div
                className="h-8 w-1.5 bg-primary rounded-full"
                aria-hidden="true"
              />
              <h2
                id="sermons-heading"
                className="text-2xl font-bold text-slate-900"
              >
                Latest Message
              </h2>
            </header>

            <article className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100">
              <div className="grid lg:grid-cols-3">
                <figure className="lg:col-span-2 relative aspect-video bg-black group cursor-pointer">
                  <Image
                    src={FEATURED_SERMON_IMAGE}
                    alt="Conditions of Security in Christ sermon thumbnail"
                    fill
                    className="object-cover opacity-90 group-hover:opacity-75 transition-opacity duration-300"
                  />
                  <button
                    type="button"
                    className="absolute inset-0 flex items-center justify-center"
                    aria-label="Play sermon video"
                  >
                    <span className="w-20 h-20 bg-primary/90 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.5)] group-hover:scale-110 transition-transform duration-300">
                      <Play
                        className="text-white fill-white ml-1"
                        size={36}
                      />
                    </span>
                  </button>
                  <figcaption className="absolute bottom-4 right-4 bg-black/80 text-white text-xs font-bold px-3 py-1 rounded backdrop-blur-sm">
                    <time>1:15:20</time>
                  </figcaption>
                </figure>

                <div className="p-8 lg:p-10 flex flex-col justify-center bg-white">
                  <span className="inline-block w-fit px-3 py-1 rounded bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                    New Series
                  </span>
                  <h3 className="text-3xl font-serif font-bold text-slate-900 mb-4 leading-tight">
                    Conditions of Security in Christ
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Discover the unshakeable foundation of your faith. In this
                    powerful message, we explore what it means to be truly
                    secure in Jesus amidst life&apos;s uncertainties.
                  </p>

                  <dl className="space-y-3 mb-8 border-t border-b border-slate-100 py-6">
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      <User
                        className="text-primary"
                        size={20}
                        aria-hidden="true"
                      />
                      <dt className="sr-only">Speaker</dt>
                      <dd className="font-medium text-slate-700">
                        Pastor W.F. Kumuyi
                      </dd>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      <Calendar
                        className="text-primary"
                        size={20}
                        aria-hidden="true"
                      />
                      <dt className="sr-only">Date</dt>
                      <dd>
                        <time dateTime="2026-01-21">January 21, 2026</time>
                      </dd>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      <Tag
                        className="text-primary"
                        size={20}
                        aria-hidden="true"
                      />
                      <dt className="sr-only">Topic</dt>
                      <dd>Spiritual Growth</dd>
                    </div>
                  </dl>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      className="flex-1 bg-slate-900 text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                    >
                      <PlayCircle size={18} aria-hidden="true" />
                      Watch Now
                    </button>
                    <button
                      type="button"
                      className="flex-1 border border-slate-200 text-slate-700 px-6 py-3 rounded-lg font-bold text-sm hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
                    >
                      <Download size={18} aria-hidden="true" />
                      Notes
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Recent Messages */}
          <div className="mb-12 flex justify-between items-end">
            <header className="flex items-center gap-4">
              <div
                className="h-8 w-1.5 bg-primary rounded-full"
                aria-hidden="true"
              />
              <h2 className="text-2xl font-bold text-slate-900">
                Recent Messages
              </h2>
            </header>
            <div className="hidden md:flex gap-2" role="group" aria-label="View options">
              <button
                type="button"
                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600"
                aria-label="Grid view"
              >
                <LayoutGrid size={20} />
              </button>
              <button
                type="button"
                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600"
                aria-label="List view"
              >
                <List size={20} />
              </button>
            </div>
          </div>

          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 list-none">
            {recentMessages.map((msg) => (
              <li key={msg.title}>
                <article className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full">
                  <figure className="relative aspect-video overflow-hidden">
                    <Image
                      src={HERO_BG_IMAGE}
                      alt={`${msg.title} sermon thumbnail`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div
                      className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"
                      aria-hidden="true"
                    />
                    <button
                      type="button"
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      aria-label={`Play ${msg.title}`}
                    >
                      <span className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
                        <Play className="text-white fill-white" size={20} />
                      </span>
                    </button>
                    <figcaption className="absolute bottom-3 right-3 bg-black/80 text-white text-[10px] font-bold px-2 py-1 rounded">
                      <time>{msg.duration}</time>
                    </figcaption>
                  </figure>

                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-xs font-bold text-primary mb-2 uppercase tracking-wide">
                      {msg.category}
                    </span>
                    <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                      {msg.title}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-2 mb-6 flex-grow">
                      Understanding the power and authority vested in the name
                      of Jesus for every believer.
                    </p>

                    <footer className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                      <div className="text-xs text-slate-500">
                        <span className="block font-semibold text-slate-700 dark:text-slate-300">
                          {msg.speaker}
                        </span>
                        <time className="block mt-0.5">{msg.date}</time>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-primary hover:text-white transition-colors"
                          aria-label="Download audio"
                        >
                          <Headphones size={14} />
                        </button>
                        <button
                          type="button"
                          className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-primary hover:text-white transition-colors"
                          aria-label="Download notes"
                        >
                          <FileText size={14} />
                        </button>
                      </div>
                    </footer>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          <div className="mt-16 flex justify-center">
            <button
              type="button"
              className="bg-white border border-slate-200 text-slate-600 px-8 py-3 rounded-full font-bold text-sm hover:border-primary hover:text-primary transition-all shadow-sm hover:shadow-md"
            >
              Load More Sermons
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}