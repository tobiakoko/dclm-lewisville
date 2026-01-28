import Image from 'next/image'

const VERSE = {
  text: 'Let nothing be done through strife or vainglory; but in lowliness of mind let each esteem other better than themselves.',
  reference: 'Philippians 2:3-4',
  backgroundImage:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBJ-pNBfo-oU9jtwNVb1mphtKFW4ce-tsk1-Q4s30zeN1htabmsOiSGAKkt2dcZjyjz_Uc5Tept1V-fFMuA-2vFq0HpeaAa9Bioa6c2dgUT4v03TsX9A2EzK5pQb-ENy7cxFTnIaEHZIeNGAYldWCY1M8jTxoG6WS11uOaMoDlZsLeLozSBrPdZpIXxMmga54ayKgNehQ9kTOaiwTWhygmjK-gwKV-cuekQ-g3I9L8L7bNpTB0N8eEyM4g1GbRjck4vKAbVZUAmbys',
} as const

export function Verse() {
  return (
    <section
      className="relative py-48 flex items-center justify-center"
      aria-labelledby="verse-heading"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={VERSE.backgroundImage}
          alt=""
          fill
          className="object-cover"
          priority={false}
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <figure className="relative z-10 text-center max-w-4xl px-4">
        <figcaption
          id="verse-heading"
          className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-8"
        >
          Verse of the Day
        </figcaption>

        <blockquote>
          <p className="text-white text-3xl md:text-5xl font-display leading-tight italic mb-8">
            &quot;{VERSE.text}&quot;
          </p>
          <footer>
            <cite className="text-(--church-red) font-bold text-xl tracking-widest not-italic">
              {VERSE.reference}
            </cite>
          </footer>
        </blockquote>
      </figure>
    </section>
  )
}