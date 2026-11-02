import { Section } from '@/components/site/Section'

// SITE-CONTENT.md §3: a real testimony, already public on YouTube and the New Jersey church's
// website; the member is credited as "Bro K". More testimonies will be added later.
const TESTIMONY = {
  author: 'Bro K',
  title: 'FROM DEPORTATION TO DELIVERANCE: JESUS MIRACULOUSLY RESCUES AND TURNS MISTAKE INTO A MERCY-FILLED MIRACLE',
  quote:
    'Jesus is indeed alive! I was on the verge of deportation after my US visa was denied — but our fathers in the Lord prayed for supernatural favor, and Jesus showed up. I was readmitted to the United States the very next day, and multiple souls came to know the Lord along the way. All glory to Jesus for turning my mistake into a miracle of mercy.',
} as const

/** The page's one navy call-out band */
export function Testimonies() {
  return (
    <Section id="testimony" tone="navy" title="Testimony">
      <figure className="max-w-3xl space-y-6">
        <p className="font-semibold text-emblem-sky-400">{TESTIMONY.title}</p>
        <blockquote className="scripture not-italic text-white">
          <p>“{TESTIMONY.quote}”</p>
        </blockquote>
        <figcaption className="font-semibold">— {TESTIMONY.author}</figcaption>
      </figure>
    </Section>
  )
}
