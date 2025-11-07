import { client } from '@/lib/sanity/client'
import { ministriesQuery } from '@/lib/sanity/queries'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import * as Icons from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Ministries',
  description: 'Explore the various ministries at DCLM Lewisville and find your place to serve.',
}

export default async function MinistriesPage() {
  const ministries = await client.fetch(ministriesQuery)

  return (
    <div className="py-16">
      {/* Hero */}
      <section className="bg-linear-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container text-center">
          <h1 className="font-heading text-5xl font-bold mb-4">Our Ministries</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Find your place to serve, grow, and connect with others in faith
          </p>
        </div>
      </section>

      {/* Ministries Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ministries.map((ministry) => {
              const IconComponent = Icons[ministry.icon as keyof typeof Icons] || Icons.Users
              
              return (
                <Link
                  key={ministry._id}
                  href={`/ministries/${ministry.slug.current}`}
                  className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
                >
                  {/* Ministry Image or Icon */}
                  <div className="h-48 bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <IconComponent className="text-white" size={64} />
                  </div>

                  <div className="p-6">
                    <h3 className="font-heading text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                      {ministry.name}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {ministry.description}
                    </p>

                    {ministry.leader && (
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <span className="font-medium">Led by:</span>
                        <span className="ml-2">{ministry.leader.name}</span>
                      </div>
                    )}

                    {ministry.meetingDay && ministry.meetingTime && (
                      <div className="text-sm text-gray-600 mb-4">
                        <div className="font-medium">Meeting Time:</div>
                        <div>
                          {ministry.meetingDay.charAt(0).toUpperCase() + ministry.meetingDay.slice(1)}s at {ministry.meetingTime}
                        </div>
                      </div>
                    )}

                    <Button variant="outline" className="w-full">
                      Learn More
                    </Button>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Get Involved CTA */}
      <section className="py-16 bg-white">
        <div className="container max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Ready to Get Involved?
          </h2>
          <p className="text-gray-600 mb-8">
            We&apos;d love to help you find the perfect place to serve and grow in your faith. 
            Contact us to learn more about any of our ministries.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
