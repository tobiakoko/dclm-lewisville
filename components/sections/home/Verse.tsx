import Image from 'next/image'
import { Quote } from 'lucide-react'

const VERSE = {
  text: 'Let nothing be done through strife or vainglory; but in lowliness of mind let each esteem other better than themselves.',
  reference: 'Philippians 2:3-4',
  backgroundImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJ-pNBfo-oU9jtwNVb1mphtKFW4ce-tsk1-Q4s30zeN1htabmsOiSGAKkt2dcZjyjz_Uc5Tept1V-fFMuA-2vFq0HpeaAa9Bioa6c2dgUT4v03TsX9A2EzK5pQb-ENy7cxFTnIaEHZIeNGAYldWCY1M8jTxoG6WS11uOaMoDlZsLeLozSBrPdZpIXxMmga54ayKgNehQ9kTOaiwTWhygmjK-gwKV-cuekQ-g3I9L8L7bNpTB0N8eEyM4g1GbRjck4vKAbVZUAmbys',
} as const

export function Verse() {
  return (
    <section className="relative py-32 lg:py-40 flex items-center justify-center overflow-hidden" aria-labelledby="verse-heading">
      
      {/* Background Image with heavy overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={VERSE.backgroundImage}
          alt=""
          fill
          className="object-cover opacity-40 blur-[2px] scale-105"
          priority={false}
        />
        <div className="absolute inset-0 bg-[var(--church-navy)]/90 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <header className="flex flex-col items-center gap-4 mb-8">
          <div className="p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <Quote className="text-[var(--church-red)] w-6 h-6" />
          </div>
          <span id="verse-heading" className="text-white/60 text-xs font-bold tracking-[0.3em] uppercase">
            Verse of the Day
          </span>
        </header>

        <blockquote>
          <p className="text-white text-3xl md:text-5xl lg:text-6xl font-serif leading-tight md:leading-[1.1] mb-10 drop-shadow-lg">
            {VERSE.text}
          </p>
          <footer className="inline-block border-t border-[var(--church-red)] pt-6 px-10">
            <cite className="text-white font-sans font-bold text-lg md:text-xl tracking-widest uppercase not-italic">
              {VERSE.reference}
            </cite>
          </footer>
        </blockquote>
      </div>
    </section>
  )
}