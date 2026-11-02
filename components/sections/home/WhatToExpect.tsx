import Link from 'next/link'
import type { TitledText } from '@/lib/content/site'
import { InlineText } from '@/components/content/RichText'
import { Section } from '@/components/site/Section'

/** "What visitors should expect": four short cards (SITE-CONTENT.md §3) */
export function WhatToExpect({ items }: { items: TitledText[] }) {
  return (
    <Section id="expect" tone="paper" title="What to expect">
      <ul className="grid list-none gap-6 md:grid-cols-2">
        {items.map((item) => (
          <li key={item.title} className="rounded-2xl border border-border-input/40 bg-white p-6">
            <h3 className="mb-2">{item.title}</h3>
            <p className="max-w-prose">
              <InlineText paragraph={item.body} />
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-8">
        <Link href="/visit" className="font-semibold text-emblem-sky-700 underline underline-offset-4">
          More about your first visit
        </Link>
      </p>
    </Section>
  )
}
