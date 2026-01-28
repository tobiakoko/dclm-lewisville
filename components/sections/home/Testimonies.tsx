import Image from 'next/image'
import { Play, Quote } from 'lucide-react'

const TESTIMONY = {
  author: 'Bro. Kaseem Tyani',
  quote:
    'Jesus is indeed alive! I had lost all hope but God came through for me with a mercy-filled miracle that transformed my situation beyond my imagination...',
  imageUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD74RRcObx3Xp5uWULw6ayXMq_eF7NgYHlm6qwEULMnCdQd2rSeZFq80_svq3aHvZ0N76zy3Dj1I8nF4srS60WnmmbkdKm8F_bOrsaFoBcJ2qz2aJWzfi1jP2GQjsOjp_dGe9XWwLC6F8QLgwSvWMIK3jM1fuFQcVH2yIVVPuXzSht3QVgmAMLuRdmWqSo-pclXIo2GFFa93ochC40u4OLO80U7NOYvhzf7afWIozTq38xQiiJ2FY9cnuLPltauKDuSagmqAzhAquI',
} as const

export function Testimonies() {
  return (
    <section
      className="bg-black py-24 text-white overflow-hidden"
      aria-labelledby="testimonies-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <figure className="relative">
            <Image
              src={TESTIMONY.imageUrl}
              alt={`${TESTIMONY.author} sharing testimony`}
              width={600}
              height={500}
              className="rounded-lg object-cover w-full h-[500px]"
            />
            <figcaption className="absolute bottom-10 left-10">
              <button
                type="button"
                className="bg-(--church-red) w-16 h-16 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
                aria-label="Play testimony video"
              >
                <Play className="text-white fill-white" size={28} />
              </button>
              <p className="mt-4 font-bold tracking-widest text-xs">
                LISTEN NOW
              </p>
            </figcaption>
          </figure>

          <article>
            <header>
              <h2
                id="testimonies-heading"
                className="text-(--church-red) font-display italic text-3xl mb-4"
              >
                Testimonies
              </h2>
              <p className="text-gray-400 text-sm tracking-widest uppercase mb-8">
                Find inspiration in God
              </p>
            </header>

            <blockquote className="bg-white/5 p-10 rounded-xl relative">
              <Quote
                className="text-white/10 absolute top-4 left-4"
                size={48}
                aria-hidden="true"
              />
              <p className="text-xl md:text-2xl font-display font-medium leading-relaxed italic mb-6 relative z-10">
                &quot;{TESTIMONY.quote}&quot;
              </p>
              <footer className="flex items-center space-x-4">
                <span className="w-10 h-px bg-church_red" aria-hidden="true" />
                <cite className="text-sm font-bold tracking-wider not-italic">
                  {TESTIMONY.author.toUpperCase()}
                </cite>
              </footer>
            </blockquote>
          </article>
        </div>
      </div>
    </section>
  )
}