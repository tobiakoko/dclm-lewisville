import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { Button } from '@/components/ui/button'
import { urlForImage } from '@/lib/sanity/image'
import { Heart, Users, Book, Target } from 'lucide-react'

const iconMap: Record<string, any> = {
  Heart,
  Users,
  Book,
  Target,
}

interface Stat {
  number: string
  label: string
  icon?: string
}

interface AboutSectionProps {
  heading?: string
  subheading?: string
  content?: any
  image?: any
  stats?: Stat[]
  button?: {
    text: string
    href: string
  }
  layout?: 'image-left' | 'image-right' | 'centered'
}

export default function AboutSection({
  heading = 'About Our Church',
  subheading = 'Building faith, community, and hope together',
  content,
  image,
  stats = [],
  button,
  layout = 'image-right',
}: AboutSectionProps) {
  if (layout === 'centered') {
    return (
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            {/* Header */}
            {heading && (
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                {subheading}
              </p>
            )}

            {/* Image */}
            {image && (
              <div className="relative h-96  overflow-hidden shadow-2xl mb-12">
                <Image
                  src={urlForImage(image).url()}
                  alt={heading || 'About'}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Content */}
            {content && (
              <div className="prose prose-lg max-w-3xl mx-auto mb-12">
                <PortableText value={content} />
              </div>
            )}

            {/* Stats */}
            {stats.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                {stats.map((stat, index) => {
                  const Icon = stat.icon ? iconMap[stat.icon] : null
                  return (
                    <div key={index} className="text-center">
                      {Icon && (
                        <Icon className="w-8 h-8 text-primary mx-auto mb-2" />
                      )}
                      <div className="font-heading text-4xl font-bold text-primary mb-2">
                        {stat.number}
                      </div>
                      <div className="text-sm text-muted-foreground uppercase tracking-wide">
                        {stat.label}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Button */}
            {button && (
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary">
                <Link href={button.href}>{button.text}</Link>
              </Button>
            )}
          </div>
        </div>
      </section>
    )
  }

  const imageOnLeft = layout === 'image-left'

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div
          className={`flex flex-col lg:flex-row gap-12 items-center ${
            imageOnLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
          }`}
        >
          {/* Image Side */}
          {image && (
            <div className="flex-1 relative">
              <div className="relative h-[500px]  overflow-hidden shadow-2xl">
                <Image
                  src={urlForImage(image).url()}
                  alt={heading || 'About'}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Stats Overlay */}
              {stats.length > 0 && (
                <div className="absolute -bottom-8 -right-8 bg-white  shadow-2xl p-6 hidden lg:block">
                  <div className="grid grid-cols-2 gap-6">
                    {stats.slice(0, 4).map((stat, index) => {
                      const Icon = stat.icon ? iconMap[stat.icon] : null
                      return (
                        <div key={index} className="text-center">
                          {Icon && <Icon className="w-6 h-6 text-primary mx-auto mb-1" />}
                          <div className="font-heading text-2xl font-bold text-primary">
                            {stat.number}
                          </div>
                          <div className="text-xs text-muted-foreground">{stat.label}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Content Side */}
          <div className="flex-1 space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary  px-4 py-2 text-sm font-medium">
              <Heart className="w-4 h-4" />
              <span>Our Story</span>
            </div>

            {/* Header */}
            {heading && (
              <h2 className="font-heading text-4xl md:text-5xl font-bold">{heading}</h2>
            )}
            {subheading && (
              <p className="text-xl text-muted-foreground">{subheading}</p>
            )}

            {/* Content */}
            {content && (
              <div className="prose prose-lg max-w-none">
                <PortableText value={content} />
              </div>
            )}

            {/* Button */}
            {button && (
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-primary hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Link href={button.href}>{button.text}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
