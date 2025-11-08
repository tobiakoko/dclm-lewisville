import { client } from '@/lib/sanity/client'
import { eventsQuery } from '@/lib/sanity/queries'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import { formatDate, formatTime } from '@/lib/utils'
import { Calendar, Clock, MapPin, ExternalLink, Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import PageHero from '@/components/sections/PageHero'

export const metadata = {
  title: 'Events',
  description: 'Stay updated with upcoming events and special services at DCLM Lewisville.',
}

export default async function EventsPage() {
  const events = await client.fetch(eventsQuery)

  const upcomingEvents = events.filter((event: any) => new Date(event.date) >= new Date())
  const pastEvents = events.filter((event: any) => new Date(event.date) < new Date())

  return (
    <div>
      {/* Hero */}
      <PageHero
        title="Events"
        subtitle="Join us for special services, conferences, and community gatherings"
        variant="simple"
      />

      {/* Upcoming Events */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full px-4 py-2 mb-6">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Coming Soon</span>
            </div>
            <h2 className="font-heading text-4xl font-bold mb-4">Upcoming Events</h2>
          </div>

          {upcomingEvents.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-2xl">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No upcoming events at this time. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {upcomingEvents.map((event: any, index: number) => (
                <div
                  key={event._id}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-primary/30 animate-fade-in-up hover:-translate-y-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Event Image */}
                  {event.image ? (
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={urlFor(event.image).width(600).height(400).url()}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {event.featured && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                          <Sparkles className="w-3 h-3" />
                          Featured
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                  ) : (
                    <div className="relative h-56 bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <Calendar className="w-16 h-16 text-white/80" />
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="font-heading text-2xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {event.title}
                    </h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar size={16} className="mr-2 text-primary flex-shrink-0" />
                        <span className="line-clamp-1">{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock size={16} className="mr-2 text-primary flex-shrink-0" />
                        <span className="line-clamp-1">
                          {formatTime(event.date)}
                          {event.endDate && ` - ${formatTime(event.endDate)}`}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin size={16} className="mr-2 text-primary flex-shrink-0" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                    </div>

                    {event.description && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                        {event.description}
                      </p>
                    )}

                    {event.ministry && (
                      <div className="mb-4">
                        <Link
                          href={`/ministries/${event.ministry.slug.current}`}
                          className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                        >
                          {event.ministry.name}
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    )}

                    {event.registrationLink && (
                      <Button asChild className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300">
                        <a
                          href={event.registrationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          Register Now
                          <ExternalLink size={16} />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container">
            <h2 className="font-heading text-3xl font-bold mb-8 text-center">Past Events</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {pastEvents.slice(0, 6).map((event: any, index: number) => (
                <div
                  key={event._id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden opacity-75 hover:opacity-100 transition-opacity"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {event.image ? (
                    <div className="relative h-40">
                      <Image
                        src={urlFor(event.image).width(400).height(300).url()}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-40 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <Calendar className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-bold mb-2 line-clamp-2">{event.title}</h3>
                    <p className="text-sm text-gray-600">{formatDate(event.date)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="container max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Want to Stay Updated?
          </h2>
          <p className="text-gray-600 mb-8">
            Subscribe to our newsletter to receive updates about upcoming events, sermons, and church news.
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
