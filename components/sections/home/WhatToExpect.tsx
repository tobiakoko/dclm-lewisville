import { WHAT_TO_EXPECT } from '@/lib/content/site'
import { InlineText } from '@/components/content/RichText'

/** "What visitors should expect" cards (SITE-CONTENT.md §3) */
export function WhatToExpect() {
  return (
    <section className="py-16 bg-slate-50" aria-labelledby="expect-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="expect-heading" className="text-3xl font-display font-bold text-(--church-navy) mb-8">
          What to expect
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 list-none">
          {WHAT_TO_EXPECT.map((item) => (
            <li key={item.title} className="bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="text-xl font-bold text-(--church-navy) mb-2">{item.title}</h3>
              <p className="text-slate-700 leading-relaxed">
                <InlineText paragraph={item.body} />
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
