import HeroSection from '@/components/sections/HeroSection'
import { SERVICE_TIMES, SITE_CONFIG } from '@/lib/constants'
import { formatClock } from '@/lib/schedule'

export const metadata = {
  title: 'Sermons',
  description: `Watch ${SITE_CONFIG.name} services live on YouTube.`,
}

const sundayWorship = SERVICE_TIMES.find((service) => service.id === 'sunday-worship')

// Until Phase 2 (BUILD-PLAN 2.9) this page shows only the live-stream line and the channel
// links from SITE-CONTENT.md §7. Never add placeholder sermons or speakers.
export default function SermonsPage() {
  return (
    <div className="bg-white">
      <HeroSection title="Sermons" subtitle={SITE_CONFIG.name} />

      <section className="py-20 px-6" aria-labelledby="live-heading">
        <div className="max-w-3xl mx-auto space-y-6 text-lg text-slate-700 leading-relaxed">
          <h2 id="live-heading" className="font-serif text-3xl text-(--church-navy)">
            Watch online
          </h2>
          {sundayWorship && (
            <p>
              Next live: {sundayWorship.day} {formatClock(sundayWorship.start)} CT on{' '}
              <a href={SITE_CONFIG.youtube.streams} className="underline underline-offset-4 text-(--church-navy) font-semibold break-all">
                {SITE_CONFIG.youtube.streams}
              </a>
            </p>
          )}
          <p>
            <a
              href={SITE_CONFIG.youtube.channel}
              className="inline-flex px-8 py-3.5 bg-(--church-navy) text-white rounded-full font-bold"
            >
              Our YouTube channel
            </a>
          </p>
        </div>
      </section>

      <section className="py-20 px-6 bg-slate-50" aria-labelledby="hq-heading">
        <div className="max-w-3xl mx-auto space-y-4 text-lg text-slate-700 leading-relaxed">
          <h2 id="hq-heading" className="font-serif text-3xl text-(--church-navy)">
            From DCLM Headquarters, Lagos
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <a href={SITE_CONFIG.dclm.webcast} className="underline underline-offset-4 text-(--church-navy) font-semibold">
                webcast.dclm.org
              </a>
            </li>
            <li>
              <a href={SITE_CONFIG.dclm.followUs} className="underline underline-offset-4 text-(--church-navy) font-semibold">
                dclm.org/followus
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}
