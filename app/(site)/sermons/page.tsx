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
  Filter,
  ChevronDown
} from 'lucide-react'

export const metadata = {
  title: 'Sermons Library',
  description: 'Listen to recent sermons and teachings from DCLM Lewisville.',
}

interface SermonMessage {
  title: string
  speaker: string
  date: string
  duration: string
  category: string
  description: string
}

const recentMessages: SermonMessage[] = [
  {
    title: 'The All-Sufficient Name of Jesus',
    speaker: 'Pastor W.F. Kumuyi',
    date: 'Jan 14, 2026',
    duration: '58:30',
    category: 'Sunday Service',
    description: 'Understanding the power and authority vested in the name of Jesus for every believer.'
  },
  {
    title: "Christ's Power to Heal",
    speaker: 'Pastor Raymond Akoko',
    date: 'Jan 07, 2026',
    duration: '45:10',
    category: 'Bible Study',
    description: 'A deep dive into the healing ministry of Jesus and how it applies to us today.'
  },
  {
    title: 'The First Faith and First Love',
    speaker: 'Pastor W.F. Kumuyi',
    date: 'Dec 31, 2025',
    duration: '1:02:45',
    category: 'Special Event',
    description: 'Returning to the fundamentals of our walk with God: faith and love.'
  },
  {
    title: 'Walking in Divine Health',
    speaker: 'Evangelist Mark Johnson',
    date: 'Dec 24, 2025',
    duration: '52:15',
    category: 'Revival Service',
    description: 'Practical steps to walking in the health that Christ has purchased for us.'
  },
  {
    title: 'The Virtuous Woman Today',
    speaker: 'Sister Esther Kumuyi',
    date: 'Dec 15, 2025',
    duration: '48:30',
    category: "Women's Conference",
    description: 'Applying the principles of Proverbs 31 in a modern, fast-paced world.'
  },
  {
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

      {/* --- FLOATING SEARCH BAR --- */}
      <div className="relative z-20 -mt-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <form className="bg-white rounded-2xl shadow-2xl shadow-[var(--church-navy)]/10 border border-slate-100 p-3 md:p-4 flex flex-col md:flex-row gap-3 items-center">
            
            {/* Search Input */}
            <div className="relative grow w-full md:w-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                name="search"
                type="search"
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-0 rounded-xl text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[var(--church-navy)]/10 focus:bg-white transition-all"
                placeholder="Search by title, series, or keyword..."
              />
            </div>

            {/* Filters */}
            <div className="flex w-full md:w-auto gap-3 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
              <div className="relative min-w-[150px]">
                <select className="w-full appearance-none bg-slate-50 border-0 rounded-xl py-3.5 pl-4 pr-10 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-[var(--church-navy)]/10 cursor-pointer">
                  <option value="">All Topics</option>
                  <option value="faith">Faith</option>
                  <option value="salvation">Salvation</option>
                  <option value="prayer">Prayer</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
              </div>

              <div className="relative min-w-[150px]">
                <select className="w-full appearance-none bg-slate-50 border-0 rounded-xl py-3.5 pl-4 pr-10 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-[var(--church-navy)]/10 cursor-pointer">
                  <option value="">All Speakers</option>
                  <option value="kumuyi">Pastor W.F. Kumuyi</option>
                  <option value="akoko">Pastor Raymond Akoko</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full md:w-auto bg-[var(--church-red)] hover:bg-red-700 text-white px-8 py-3.5 rounded-xl font-bold text-sm tracking-wide uppercase transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              Search
            </button>
          </form>
        </div>
      </div>

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
              <div className="grid lg:grid-cols-5 h-full">
                
                {/* Thumbnail Side */}
                <figure className="lg:col-span-3 relative min-h-[300px] lg:min-h-[450px] overflow-hidden bg-gray-900">
                  <Image
                    src={FEATURED_SERMON_IMAGE}
                    alt="Featured sermon thumbnail"
                    fill
                    className="object-cover opacity-90 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                  />
                  {/* Play Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button 
                      className="w-20 h-20 bg-[var(--church-red)] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(var(--church-red),0.4)] group-hover:scale-110 transition-transform duration-300 z-20"
                      aria-label="Play featured sermon"
                    >
                      <Play className="text-white fill-white ml-1" size={32} />
                    </button>
                    {/* Ripple effect */}
                    <div className="absolute w-20 h-20 bg-[var(--church-red)] rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-30" />
                  </div>
                  
                  <div className="absolute bottom-6 left-6 z-10">
                     <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md text-white text-xs font-bold border border-white/10">
                        <PlayCircle size={14} className="text-[var(--church-red)]" />
                        1:15:20
                     </span>
                  </div>
                </figure>

                {/* Content Side */}
                <div className="lg:col-span-2 p-8 lg:p-12 flex flex-col justify-center bg-white relative">
                  <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                     <PlayCircle size={120} />
                  </div>

                  <span className="inline-block w-fit px-3 py-1 rounded bg-[var(--church-navy)]/5 text-[var(--church-navy)] text-xs font-bold uppercase tracking-widest mb-6">
                    New Series
                  </span>
                  
                  <h3 className="text-3xl lg:text-4xl font-serif font-bold text-[var(--church-navy)] mb-4 leading-[1.1]">
                    Conditions of Security in Christ
                  </h3>
                  
                  <p className="text-slate-600 mb-8 leading-relaxed text-lg font-light">
                    Discover the unshakeable foundation of your faith. In this
                    powerful message, we explore what it means to be truly
                    secure in Jesus amidst life's uncertainties.
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

                  <div className="flex gap-4">
                    <button className="flex-1 bg-[var(--church-navy)] text-white px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-[var(--church-navy)]/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2">
                      <PlayCircle size={18} />
                      Watch Now
                    </button>
                    <button className="flex-1 border border-slate-200 text-slate-600 px-6 py-3.5 rounded-xl font-bold text-sm hover:border-[var(--church-red)] hover:text-[var(--church-red)] hover:bg-red-50 transition-all flex items-center justify-center gap-2">
                      <Download size={18} />
                      Notes
                    </button>
                  </div>
                </div>
              </div>
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
            
            <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
               <button className="p-2 rounded bg-slate-100 text-[var(--church-navy)] shadow-sm">
                  <LayoutGrid size={18} />
               </button>
               <button className="p-2 rounded text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors">
                  <List size={18} />
               </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentMessages.map((msg) => (
              <article key={msg.title} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[var(--church-navy)]/5 border border-slate-100 transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
                
                {/* Card Thumbnail */}
                <figure className="relative aspect-video overflow-hidden bg-gray-100">
                  <Image
                    src={HERO_BG_IMAGE}
                    alt={`${msg.title} thumbnail`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors" />
                  
                  {/* Hover Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
                    <span className="w-14 h-14 bg-[var(--church-red)] rounded-full flex items-center justify-center shadow-lg text-white">
                      <Play fill="currentColor" size={24} className="ml-1" />
                    </span>
                  </div>

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
                    
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                       <button className="p-2 rounded-full bg-slate-50 hover:bg-[var(--church-navy)] hover:text-white text-slate-500 transition-colors" title="Audio Only">
                          <Headphones size={16} />
                       </button>
                       <button className="p-2 rounded-full bg-slate-50 hover:bg-[var(--church-navy)] hover:text-white text-slate-500 transition-colors" title="Sermon Notes">
                          <FileText size={16} />
                       </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-20 text-center">
            <button className="group bg-white border border-slate-200 text-[var(--church-navy)] px-8 py-3.5 rounded-full font-bold text-sm hover:border-[var(--church-red)] hover:text-[var(--church-red)] transition-all shadow-sm hover:shadow-md flex items-center gap-2 mx-auto">
              Load More Sermons
              <ChevronDown size={16} className="group-hover:translate-y-1 transition-transform" />
            </button>
          </div>

        </div>
      </section>
    </main>
  )
}