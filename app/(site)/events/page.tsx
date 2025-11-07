import { client } from '@/lib/sanity/client'
import { eventsQuery } from '@/lib/sanity/queries'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import { formatDate, formatTime } from '@/lib/utils'
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata = {
  title: 'Events',
  description: 'Stay updated with upcoming events and special services at DCLM Lewisville.',
}
/*
const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": event.title,
  "startDate": event.date,
  "endDate": event.endDate,
  "location": {
    "@type": "Place",
    "name": "Deeper Life Bible Church Lewisville",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Church Street",
      "addressLocality": "Lewisville",
      "addressRegion": "TX",
      "postalCode": "75067"
    }
  },
  "description": event.description,
  "image": event.image,
  "organizer": {
    "@type": "Organization",
    "name": "DCLM Lewisville"
  }
}
*/

export default async function EventsPage() {
  const events = await client.fetch(eventsQuery)

  const upcomingEvents = events.filter((event) => new Date(event.date) >= new Date())
  const pastEvents = events.filter((event) => new Date(event.date) < new Date())

  return (
    <div className="py-16">
      {/* Hero */}
      <section className="bg-linear-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container text-center">
          <h1 className="font-heading text-5xl font-bold mb-4">Events</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Join us for special services, conferences, and community gatherings
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="font-heading text-3xl font-bold mb-8">Upcoming Events</h2>
          
          {upcomingEvents.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600">No upcoming events at this time. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {upcomingEvents.map((event) => (
                <div
                  key={event._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {/* Event Image */}
                  {event.image && (
                    <div className="relative h-56">
                      <Image
                        src={urlFor(event.image).width(600).height(400).url()}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                      {event.featured && (
                        <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">
                          Featured
                        </div>
                      )}
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="font-heading text-2xl font-bold mb-3">{event.title}</h3>

                    <div className="space-y-2 mb-4 text-gray-600">
                      <div className="flex items-center">
                        <Calendar size={18} className="mr-3 text-blue-600" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={18} className="mr-3 text-blue-600" />
                        <span>
                          {formatTime(event.date)}
                          {event.endDate && ` - ${formatTime(event.endDate)}`}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <MapPin size={18} className="mr-3 text-blue-600" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    {event.description && (
                      <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
                    )}

                    {event.ministry && (
                      <div className="mb-4">
                        <Link
                          href={`/ministries/${event.ministry.slug.current}`}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          {event.ministry.name} →
                        </Link>
                      </div>
                    )}

                    {event.registrationLink && (
                      <Button asChild className="w-full">
                        <a
                          href={event.registrationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Register Now
                          <ExternalLink size={16} className="ml-2" />
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
            <h2 className="font-heading text-3xl font-bold mb-8">Past Events</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {pastEvents.slice(0, 6).map((event) => (
                <div
                  key={event._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden opacity-75"
                >
                  {event.image && (
                    <div className="relative h-40">
                      <Image
                        src={urlFor(event.image).width(400).height(300).url()}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-bold mb-2">{event.title}</h3>
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
          <Button asChild size="lg">
            <Link href="/#newsletter">Subscribe to Newsletter</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}