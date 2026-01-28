import Image from 'next/image'
import { Play, Quote } from 'lucide-react'

const TESTIMONY = {
  author: 'Bro. Kaseem Tyani',
  title: 'Restored & Redeemed',
  quote: 'Jesus is indeed alive! I had lost all hope but God came through for me with a mercy-filled miracle that transformed my situation beyond my imagination...',
  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD74RRcObx3Xp5uWULw6ayXMq_eF7NgYHlm6qwEULMnCdQd2rSeZFq80_svq3aHvZ0N76zy3Dj1I8nF4srS60WnmmbkdKm8F_bOrsaFoBcJ2qz2aJWzfi1jP2GQjsOjp_dGe9XWwLC6F8QLgwSvWMIK3jM1fuFQcVH2yIVVPuXzSht3QVgmAMLuRdmWqSo-pclXIo2GFFa93ochC40u4OLO80U7NOYvhzf7afWIozTq38xQiiJ2FY9cnuLPltauKDuSagmqAzhAquI',
} as const

export function Testimonies() {
  return (
    <section className="bg-[var(--church-navy)] py-24 relative overflow-hidden" aria-labelledby="testimonies-heading">
      {/* Ambient Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black/50 to-transparent z-0" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Video/Image Section */}
          <figure className="relative group rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-square">
            <Image
              src={TESTIMONY.imageUrl}
              alt={`${TESTIMONY.author} sharing testimony`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
            
            <figcaption className="absolute inset-0 flex items-center justify-center">
              <button
                type="button"
                className="relative flex items-center justify-center w-20 h-20 bg-[var(--church-red)] rounded-full text-white shadow-lg transition-transform hover:scale-110 active:scale-95 group/btn"
                aria-label="Play testimony video"
              >
                {/* Ping animation ring */}
                <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--church-red)] opacity-75 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
                <Play className="relative ml-1 w-8 h-8 fill-white" />
              </button>
            </figcaption>
          </figure>

          {/* Content Section */}
          <article className="space-y-8">
            <header>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-12 bg-[var(--church-red)]"></span>
                <span className="text-[var(--church-red)] font-bold tracking-[0.2em] text-xs uppercase">
                  Stories of Grace
                </span>
              </div>
              <h2 id="testimonies-heading" className="text-white font-display text-4xl lg:text-5xl font-bold leading-tight">
                Transformation <br />
                <span className="font-serif italic font-light text-white/70">Starts Here</span>
              </h2>
            </header>

            <blockquote className="relative">
              <Quote className="text-white/10 absolute -top-6 -left-4 w-16 h-16 rotate-180" aria-hidden="true" />
              <div className="relative z-10 space-y-6">
                <p className="text-xl lg:text-2xl text-white/90 font-serif leading-relaxed">
                  &quot;{TESTIMONY.quote}&quot;
                </p>
                <footer className="border-l-2 border-[var(--church-red)] pl-4">
                  <cite className="block text-lg font-bold text-white not-italic">
                    {TESTIMONY.author}
                  </cite>
                  <span className="text-sm text-white/60 font-medium">
                    {TESTIMONY.title}
                  </span>
                </footer>
              </div>
            </blockquote>
          </article>
        </div>
      </div>
    </section>
  )
}