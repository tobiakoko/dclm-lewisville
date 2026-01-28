import { client } from '@/lib/sanity/client'
import { teamQuery } from '@/lib/sanity/queries'
import PageHero from '@/components/sections/PageHero'
import { Heart, Users, Book, Mail, Phone } from 'lucide-react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import MinistriesPreview from '@/components/sections/home/MinistriesPreview'
import { ministriesQuery } from '@/lib/sanity/queries'

export const metadata = {
  title: 'Our Ministers & Leadership',
  description: 'Meet the dedicated ministers and leaders serving at DCLM Lewisville.',
}

export default async function MinistersPage() {
  let team = []
  let ministries = []

  try {
    team = await client.fetch(teamQuery)
  } catch (error) {
    console.warn('Failed to fetch team data (this is expected during build without Sanity credentials)', error)
  }

  try {
    ministries = await client.fetch(ministriesQuery)
  } catch (error) {
    console.warn('Failed to fetch ministries data (this is expected during build without Sanity credentials)', error)
  }

  return (
    <>
      {/* Hero Section */}
      <PageHero
        title="Our Ministers & Leadership"
        subtitle="Meet Our Team"
        description="Dedicated servants of God called to shepherd, teach, and guide our congregation in faith and righteousness"
        variant="simple"
      />

      {/* Main Leadership Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full px-4 py-2 mb-6">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Leadership Team</span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Shepherding God&apos;s Flock
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our ministers are committed to serving with excellence, integrity, and a heart for God&apos;s people
            </p>
          </div>

          {/* Leadership Grid with Enhanced Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {team.map((member: any, index: number) => (
              <div
                key={member._id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-primary/30 animate-fade-in-up hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Photo */}
                <div className="aspect-square relative bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  {member.photo ? (
                    <Image
                      src={urlFor(member.photo).width(600).height(600).url()}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-secondary">
                      <Users className="w-24 h-24 text-white/50" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="font-heading text-2xl font-bold mb-1 group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary font-semibold mb-1">{member.title}</p>
                  {member.role && (
                    <p className="text-xs text-gray-500 mb-4">{member.role}</p>
                  )}

                  {member.shortBio && (
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-4">
                      {member.shortBio}
                    </p>
                  )}

                  {/* Contact Info */}
                  <div className="space-y-2 pt-4 border-t border-gray-100">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="inline-flex items-center text-sm text-gray-600 hover:text-primary transition-colors group/link"
                      >
                        <Mail size={16} className="mr-2 flex-shrink-0" />
                        <span className="group-hover/link:underline">Contact</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Our Leadership Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Principles that guide our service and ministry
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: <Book className="w-8 h-8 text-white" />,
                title: 'Biblical Foundation',
                description: 'Leading according to the teachings and principles of God\'s Word'
              },
              {
                icon: <Heart className="w-8 h-8 text-white" fill="currentColor" />,
                title: 'Servant Leadership',
                description: 'Following Christ\'s example of humble, selfless service to others'
              },
              {
                icon: <Users className="w-8 h-8 text-white" />,
                title: 'Spiritual Shepherding',
                description: 'Caring for and guiding God\'s people with wisdom and compassion'
              },
              {
                icon: <Heart className="w-8 h-8 text-white" />,
                title: 'Holy Living',
                description: 'Maintaining integrity and godliness in all aspects of life and ministry'
              }
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-primary/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary via-secondary to-accent rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  {value.icon}
                </div>
                <h3 className="font-heading text-lg font-bold mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scripture Section */}
      <section className="py-16 bg-gradient-to-br from-primary via-secondary to-accent text-white">
        <div className="container max-w-4xl text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20">
            <Book className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <blockquote className="text-2xl md:text-3xl font-medium italic mb-6 leading-relaxed">
              &quot;Obey your leaders and submit to them, for they are keeping watch over your souls,
              as those who will have to give an account. Let them do this with joy and not with groaning,
              for that would be of no advantage to you.&quot;
            </blockquote>
            <cite className="text-white/80 text-lg">— Hebrews 13:17 (ESV)</cite>
          </div>
        </div>
      </section>

      {/* Ministries Section */}
      <MinistriesPreview ministries={ministries.slice(0, 6)} />

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="container max-w-3xl text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
            Want to Connect with Our Leadership?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            We&apos;re here to serve you and answer any questions you may have about our church,
            faith, or ministry opportunities.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Contact Us
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </section>
    </>
  )
}
