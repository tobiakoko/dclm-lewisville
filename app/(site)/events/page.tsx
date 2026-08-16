import Image from 'next/image'
import Link from 'next/link'
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  Sun,
  BookOpen,
  Heart,
  ExternalLink,
} from 'lucide-react'
import HeroSection from '@/components/sections/HeroSection'
import { SERVICE_TIMES, SITE_CONFIG } from '@/lib/constants'

export const metadata = {
  title: 'Events',
  description:
    'Stay updated with upcoming events and special services at DCLM Lewisville.',
}

interface Event {
  title: string
  date: string
  time: string
  location: string
  imageUrl: string
  description: string
  featured: boolean
}

const events: Event[] = [
  {
    title: 'Heart of the City',
    date: 'Jan 24, 2026',
    time: '2:00 PM - 4:00 PM',
    location: '1368 W Main St, Lewisville, TX 75067',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuABoW6TZtNzgJ7QXz-QKxtYYFl1QSP4al85Pvf3SEm2nvSkwOBIlowzsZ1tXjHxJ21AZ8lC3V-sx8ollTnwfPEqcLyuy4VxNwrVIK4VkjuzgLguWuhKL1aOSHAMrNiw9i2_rvVg9GCwSeQKE9wwrMCJVvn5toszEmHAwg0rEtH3A4198o5JeDD6eF9jWa7SWpl2LGxLWbEod088UrKRPH5Y9eTlSjf42UQYZYBGYHw0D8P1JRYJgEg1P_whdmpZNTjTlzQpPgYLdzQ',
    description:
      'Join us for our community food distribution event. We are serving families in need across Lewisville with groceries and prayer.',
    featured: true,
  },
  {
    title: 'Youth Leadership',
    date: 'Feb 12, 2026',
    time: '6:00 PM - 8:30 PM',
    location: 'Main Sanctuary',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBim_ETINC6BPCvWd5e2zIzJgPQr2bfu0ESAJX6Y9yurA6qdFdgG38V2AlOAwiUK3jgWE53OsVhxSNiqcYN3GFzVSQAJHVIH-GxhOmaa3IbriyIyxoOpclv8zTVYvgoVi9R2wMnvSHaNS189j8SbgJlQir5fBpQk1LF_1KRyDK2XdyHUPlUf2mvM_LMrHOgzzM3gS9YR9UNdckeH8DPnRtosEKT7yA34D87iQp36K_KaGttghcsqZ2lHCzNR3UQj4dc6c_e_PhJF8o',
    description:
      'Empowering the next generation to lead with integrity. A workshop for young adults ages 18-30 focused on biblical leadership.',
    featured: false,
  },
  {
    title: 'Night of Worship',
    date: 'Mar 05, 2026',
    time: '7:00 PM - 9:00 PM',
    location: 'Main Sanctuary',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAeBfFsGGqfmgnnsceuG1bi03bJBqL0W380sv1Tx15lis5Nn7nidWbLsUqQn590kEmfBaTKnKHKIM7vNokZxE5jqab3hcf85PnJ58yHPf230zkhNjjaf2WLSv3v26WVaqNOGsEtM5ovdMFqAfhVmYyWN2EAdGRuZdqlS0UntLkDxH92J1mkJiYDaSL9KQxWgWKhN972CWh-_kQi6qZ3xBgNwdILJyUdvk1bHd1c2wds-_LwsuuXl0-QXNHrkI4XOxzwfpMhEm8P6fE',
    description:
      'A special evening dedicated to prayer, praise, and musical worship. Come expecting a move of God.',
    featured: false,
  },
  {
    title: 'Marriage Seminar',
    date: 'Apr 10, 2026',
    time: '9:00 AM - 2:00 PM',
    location: 'Fellowship Hall',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDV--uB7FAaqtDSsxs_rtbSnrsr-_AxPQwT7r-KNfzUNL-0CqcNHNAbaTXtEFcKVzXcus9IYUwFviMGl8NNXoWWX6JPGiAaVed0juuELvTE3xiWA9PtL6tYAy-erzFBLxjwm3IHO1aNQtlYjudVCIsPcwleGfvBuf_CP-NJh-dULpQsM3vtWIkSIAC_7j0cHoReekSj_YgU5waRVQg2CVKRwdPsJQK2h24ETSmbw5WPP-tcTsT1kaBGzHYe6gDV21X8Wjz5JEfZ7lQ',
    description:
      'Building stronger foundations for families. Guest speakers and interactive sessions for couples.',
    featured: false,
  },
]

interface WeeklyService {
  icon: typeof Sun
  title: string
  time: string
}

const WEEKLY_ICONS = [Sun, BookOpen, Heart]

const weeklyServices: WeeklyService[] = SERVICE_TIMES.filter((s) => s.name !== 'Search The Scriptures').map((service, i) => ({
  icon: WEEKLY_ICONS[i % WEEKLY_ICONS.length],
  title: service.name,
  time: `${service.day}s at ${service.time}`,
}))

const calendarDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const

export default function EventsPage() {
  return (
    <main>
      <HeroSection
        title="Upcoming Events"
        subtitle="Join us for special services, conferences, and community gatherings designed to strengthen your faith and family."
      />

      {/* Events Section */}
      <section
        className="py-24 bg-slate-50"
        aria-labelledby="events-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <header>
              <span className="text-(--church-red) font-bold tracking-widest text-sm uppercase block mb-3">
                Schedule
              </span>
              <h2
                id="events-heading"
                className="text-4xl font-display font-bold text-(--church-navy)"
              >
                Calendar of Events
              </h2>
            </header>
          </div>

          <div className="grid lg:grid-cols-12 gap-12">
            {/* Weekly Services */}
            <aside className="lg:col-span-4 space-y-8">
              <div className="bg-(--church-red)/5 rounded-2xl p-8 border border-(--church-red)/10">
                <h4 className="font-display font-bold text-lg text-(--church-navy) mb-4">
                  Weekly Services
                </h4>
                <ul className="space-y-4 list-none">
                  {weeklyServices.map((service) => {
                    const Icon = service.icon
                    return (
                      <li key={service.title} className="flex gap-4 items-start">
                        <div
                          className="bg-white p-2 rounded-lg shadow-sm text-(--church-red)"
                          aria-hidden="true"
                        >
                          <Icon size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-(--church-navy)">
                            {service.title}
                          </p>
                          <p className="text-sm text-slate-500">
                            <time>{service.time}</time>
                          </p>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </aside>

            {/* Events List */}
            <div className="lg:col-span-8">
              <ul className="grid md:grid-cols-2 gap-6 list-none">
                {events.map((event) => (
                  <li key={event.title}>
                    <article className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-800 flex flex-col h-full">
                      <figure className="relative h-56 overflow-hidden">
                        <Image
                          src={event.imageUrl}
                          alt={event.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div
                          className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"
                          aria-hidden="true"
                        />
                        {event.featured && (
                          <span className="absolute top-4 right-4 bg-(--church-red) text-white px-3 py-1 rounded-full text-xs font-bold uppercase shadow-lg">
                            Featured
                          </span>
                        )}
                        <figcaption className="absolute bottom-4 left-4 text-white">
                          <div className="flex items-center gap-2 mb-1">
                            <Calendar
                              className="text-(--church-red)"
                              size={18}
                              aria-hidden="true"
                            />
                            <time className="font-bold text-lg">{event.date}</time>
                          </div>
                        </figcaption>
                      </figure>
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="mb-4">
                          <h3 className="text-2xl font-display font-bold mb-2 text-(--church-navy) group-hover:text-(--church-red) transition-colors">
                            {event.title}
                          </h3>
                          <p className="text-slate-500 text-sm line-clamp-2">
                            {event.description}
                          </p>
                        </div>
                        <dl className="space-y-2 mb-6 text-sm text-slate-600">
                          <div className="flex items-center gap-3">
                            <dt className="sr-only">Time</dt>
                            <Clock
                              className="text-(--church-red)"
                              size={18}
                              aria-hidden="true"
                            />
                            <dd>
                              <time>{event.time}</time>
                            </dd>
                          </div>
                          <div className="flex items-center gap-3">
                            <dt className="sr-only">Location</dt>
                            <MapPin
                              className="text-(--church-red)"
                              size={18}
                              aria-hidden="true"
                            />
                            <dd>{event.location}</dd>
                          </div>
                        </dl>
                        <footer className="mt-auto pt-6 border-t border-slate-100">
                          <Link
                            href="/contact"
                            className={`w-full py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
                              event.featured
                                ? 'bg-(--church-red) hover:bg-(--church-red)/90 text-white'
                                : 'bg-slate-100 hover:bg-(--church-red) hover:text-white text-(--church-navy)'
                            }`}
                          >
                            {event.featured ? 'Register Now' : 'Contact Us to Register'}
                            {event.featured && (
                              <ArrowRight size={14} aria-hidden="true" />
                            )}
                          </Link>
                        </footer>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Us CTA */}
      <section
        className="py-20 bg-(--church-red) relative overflow-hidden"
        aria-labelledby="visit-heading"
      >
        <div
          className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"
          aria-hidden="true"
        />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2
            id="visit-heading"
            className="text-4xl font-display font-bold text-white mb-4"
          >
            Come Visit Us
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
            Services begin Sunday at 9:30 AM at {SITE_CONFIG.address.street} — right off Main
            Street in Lewisville. We&apos;ll know your name when you walk in.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <Link
              href="/contact"
              className="bg-(--church-navy) text-white px-8 py-4 rounded-full font-bold hover:bg-(--church-navy)/90 transition-colors shadow-xl"
            >
              Plan Your Visit
            </Link>
            <Link
              href={`https://maps.google.com/?q=${encodeURIComponent(`${SITE_CONFIG.address.street}, ${SITE_CONFIG.address.city}, ${SITE_CONFIG.address.state} ${SITE_CONFIG.address.zip}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-colors shadow-xl inline-flex items-center justify-center gap-2"
            >
              Get Directions <ExternalLink size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
