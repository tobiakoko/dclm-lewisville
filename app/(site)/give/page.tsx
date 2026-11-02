import HeroSection from '@/components/sections/HeroSection'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata = {
  title: 'Give',
  description: `Ways to give to ${SITE_CONFIG.name}.`,
}

// SITE-CONTENT.md §10: three ways, each with the placeholder until the church supplies details.
// No FAQ, buttons, security or tax claims.
// TODO(content): Zelle details; check payee and mailing address; online giving provider and link;
// tax-deductibility statement
const PLACEHOLDER = 'Information will be provided shortly.'

const WAYS_TO_GIVE = [
  { title: 'Zelle', detail: PLACEHOLDER },
  { title: 'Check payable to the church', detail: PLACEHOLDER },
  { title: 'Online giving', detail: PLACEHOLDER },
]

export default function GivePage() {
  return (
    <div className="bg-white">
      <HeroSection title="Give" subtitle={SITE_CONFIG.name} />

      <section className="py-20 px-6" aria-labelledby="ways-heading">
        <div className="max-w-5xl mx-auto">
          <h2 id="ways-heading" className="font-serif text-4xl text-(--church-navy) mb-10">
            Ways to give
          </h2>
          <ul className="grid gap-6 md:grid-cols-3 list-none">
            {WAYS_TO_GIVE.map((way) => (
              <li key={way.title} className="rounded-2xl border border-slate-200 p-6 space-y-3">
                <h3 className="font-serif text-2xl font-bold text-(--church-navy)">{way.title}</h3>
                <p className="text-slate-700">{way.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
