import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, MapPin, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Event } from '@/lib/types'
import { urlFor } from '@/lib/sanity/client'

interface UpcomingEventsProps {
  events: Event[]
  limit?: number
  showViewAll?: boolean
}

export default function UpcomingEvents({
  events,
  limit = 3,
  showViewAll = true
}: UpcomingEventsProps) {
  // Filter to only show upcoming events
  const upcomingEvents = events
    .filter((event) => new Date(event.date) >= new Date())
    .slice(0, limit)

  if (upcomingEvents.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full px-4 py-2 mb-6">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Upcoming Events</span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Join Us for Upcoming Events
            </h2>
          </div>
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No upcoming events at this time. Check back soon!</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full px-4 py-2 mb-6">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Upcoming Events</span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Join Us for Upcoming Events
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mark your calendars and be part of special gatherings in our community
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {upcomingEvents.map((event, index) => (
            <div
              key={event._id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 animate-fade-in-up hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Event Image */}
              {event.image ? (
                <div className="relative h-48 overflow-hidden">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              ) : (
                <div className="relative h-48 bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Calendar className="w-16 h-16 text-white/80" />
                </div>
              )}

              {/* Event Details */}
              <div className="p-6">
                <h3 className="font-heading text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {event.title}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar size={16} className="mr-2 text-primary flex-shrink-0" />
                    <span className="line-clamp-1">
                      {new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock size={16} className="mr-2 text-primary flex-shrink-0" />
                    <span className="line-clamp-1">
                      {new Date(event.date).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                      })}
                      {event.endDate && ` - ${new Date(event.endDate).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                      })}`}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin size={16} className="mr-2 text-primary flex-shrink-0" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                </div>

                {event.description && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {event.description}
                  </p>
                )}

                <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        {showViewAll && (
          <div className="text-center animate-fade-in-up animate-delay-500">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300 hover:scale-105 group"
            >
              <Link href="/events" className="flex items-center gap-2">
                View All Events
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
