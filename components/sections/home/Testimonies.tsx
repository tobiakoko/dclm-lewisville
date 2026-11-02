import Image from 'next/image'
import { Quote } from 'lucide-react'
import Testimony from '@/app/assets/Testimonies.jpeg'

const TESTIMONY = {
  // SITE-CONTENT.md §3: a real, already-public testimony; the member is named "Bro K"
  author: 'Bro K',
  title: 'FROM DEPORTATION TO DELIVERANCE: JESUS MIRACULOUSLY RESCUES AND TURNS MISTAKE INTO A MERCY-FILLED MIRACLE',
  quote: 'Jesus is indeed alive! I was on the verge of deportation after my US visa was denied — but our fathers in the Lord prayed for supernatural favor, and Jesus showed up. I was readmitted to the United States the very next day, and multiple souls came to know the Lord along the way. All glory to Jesus for turning my mistake into a miracle of mercy.',
  imageUrl: Testimony,
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
              alt=""
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
            
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
                <p className="text-sm lg:text-md text-white/90 font-sans italic leading-relaxed">
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