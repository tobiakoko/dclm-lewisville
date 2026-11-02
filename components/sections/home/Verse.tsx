import { BIBLE_VERSE } from '@/lib/content/site'

/** "The Bible Verse We Live By" (SITE-CONTENT.md §3); replaces "Verse of the Day" */
export function Verse() {
  return (
    <section className="py-24 bg-(--church-navy)" aria-labelledby="verse-heading">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 id="verse-heading" className="text-white text-lg font-bold mb-8">
          {BIBLE_VERSE.heading}
        </h2>
        <blockquote>
          <p className="text-white text-2xl md:text-4xl font-serif italic leading-snug mb-8">{BIBLE_VERSE.text}</p>
          <footer>
            <cite className="text-white font-sans font-bold text-lg not-italic">{BIBLE_VERSE.reference}</cite>
          </footer>
        </blockquote>
      </div>
    </section>
  )
}
