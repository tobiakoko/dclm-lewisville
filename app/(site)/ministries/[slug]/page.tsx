import { client } from '@/lib/sanity/client'
import { ministryQuery } from '@/lib/sanity/queries'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import { PortableText } from '@portabletext/react'
import { Calendar, Clock, MapPin, Mail, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Timeline from '@/components/sections/Timeline'
import Testimonials from '@/components/sections/Testimonials'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const ministry = await client.fetch(ministryQuery, { slug: params.slug })

    if (!ministry) return {}

    return {
      title: ministry.name,
      description: ministry.description,
    }
  } catch (error) {
    console.warn('Failed to fetch ministry metadata (this is expected during build without Sanity credentials)', error)
    return {}
  }
}

export default async function MinistryDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  let ministry = null

  try {
    ministry = await client.fetch(ministryQuery, { slug: params.slug })
  } catch (error) {
    console.warn('Failed to fetch ministry (this is expected during build without Sanity credentials)', error)
  }

  if (!ministry) {
    notFound()
  }

  return (
    <div className="py-16">
      {/* Hero */}
      <section className="bg-linear-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container">
          <h1 className="font-heading text-5xl font-bold mb-4">
            {ministry.name}
          </h1>
          <p className="text-xl max-w-2xl">{ministry.mission}</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Images */}
              {ministry.images && ministry.images.length > 0 && (
                <div className="mb-8 rounded-lg overflow-hidden">
                  <Image
                    src={urlFor(ministry.images[0]).width(800).height(400).url()}
                    alt={ministry.name}
                    width={800}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              )}

              {/* Description */}
              <div className="prose prose-lg max-w-none mb-12">
                <PortableText value={ministry.fullDescription} />
              </div>

              {/* Activities */}
              {ministry.activities && ministry.activities.length > 0 && (
                <div className="mb-12">
                  <h2 className="font-heading text-3xl font-bold mb-6">
                    Our Programs & Activities
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {ministry.activities.map((activity: { title: string; description: string }, idx: number) => (
                      <div key={idx} className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="font-bold text-lg mb-2">{activity.title}</h3>
                        <p className="text-gray-600">{activity.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Milestones */}
              {ministry.milestones && ministry.milestones.length > 0 && (
                <div className="mb-12">
                  <h2 className="font-heading text-3xl font-bold mb-6">
                    Ministry Milestones
                  </h2>
                  <Timeline
                    events={ministry.milestones.map((m: { date: string; title: string; description: string }) => ({
                      year: new Date(m.date).getFullYear().toString(),
                      title: m.title,
                      description: m.description,
                    }))}
                  />
                </div>
              )}

              {/* Testimonials */}
              {ministry.testimonials && ministry.testimonials.length > 0 && (
                <div className="mb-12">
                  <h2 className="font-heading text-3xl font-bold mb-6">
                    Member Stories
                  </h2>
                  <Testimonials testimonials={ministry.testimonials} />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                <h3 className="font-heading text-xl font-bold mb-6">
                  Ministry Information
                </h3>

                {/* Leader */}
                {ministry.leader && (
                  <div className="mb-6 pb-6 border-b">
                    <div className="flex items-center space-x-4 mb-3">
                      {ministry.leader.photo && (
                        <Image
                          src={urlFor(ministry.leader.photo).width(80).height(80).url()}
                          alt={ministry.leader.name}
                          width={80}
                          height={80}
                          className="rounded-full"
                        />
                      )}
                      <div>
                        <div className="font-bold">{ministry.leader.name}</div>
                        <div className="text-sm text-gray-600">
                          {ministry.leader.title}
                        </div>
                      </div>
                    </div>
                    {ministry.leader.bio && (
                      <p className="text-sm text-gray-600">{ministry.leader.bio}</p>
                    )}
                  </div>
                )}

                {/* Meeting Times */}
                {ministry.meetingDay && ministry.meetingTime && (
                  <div className="mb-4">
                    <div className="flex items-center text-gray-700 mb-2">
                      <Calendar size={20} className="mr-3 text-blue-600" />
                      <div>
                        <div className="font-medium">Meeting Day</div>
                        <div className="text-sm">
                          {ministry.meetingDay.charAt(0).toUpperCase() + ministry.meetingDay.slice(1)}s
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-700 mb-2">
                      <Clock size={20} className="mr-3 text-blue-600" />
                      <div>
                        <div className="font-medium">Time</div>
                        <div className="text-sm">{ministry.meetingTime}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Location */}
                {ministry.location && (
                  <div className="flex items-center text-gray-700 mb-4">
                    <MapPin size={20} className="mr-3 text-blue-600" />
                    <div>
                      <div className="font-medium">Location</div>
                      <div className="text-sm">{ministry.location}</div>
                    </div>
                  </div>
                )}

                {/* Contact */}
                {(ministry.contactEmail || ministry.leader?.email || ministry.leader?.phone) && (
                  <div className="mb-6">
                    <h4 className="font-bold mb-3">Contact</h4>
                    {(ministry.contactEmail || ministry.leader?.email) && (
                      <div className="flex items-center text-gray-700 mb-2">
                        <Mail size={18} className="mr-3 text-blue-600" />
                        <a
                          href={`mailto:${ministry.contactEmail || ministry.leader?.email}`}
                          className="text-sm hover:text-blue-600"
                        >
                          {ministry.contactEmail || ministry.leader?.email}
                        </a>
                      </div>
                    )}
                    {ministry.leader?.phone && (
                      <div className="flex items-center text-gray-700">
                        <Phone size={18} className="mr-3 text-blue-600" />
                        <a
                          href={`tel:${ministry.leader.phone}`}
                          className="text-sm hover:text-blue-600"
                        >
                          {ministry.leader.phone}
                        </a>
                      </div>
                    )}
                  </div>
                )}

                <Button asChild className="w-full">
                  <Link href="/contact">Get Involved</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}