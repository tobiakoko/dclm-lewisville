import Link from 'next/link'
import { Heart, Users, Book, Calendar, Music, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

const iconMap: Record<string, any> = {
  Heart,
  Users,
  Book,
  Calendar,
  Music,
  Sparkles,
}

interface Feature {
  icon?: string
  title: string
  description: string
  link?: {
    text: string
    href: string
  }
}

interface FeaturesListSectionProps {
  heading?: string
  subheading?: string
  features: Feature[]
}

export default function FeaturesListSection({
  heading = 'What We Offer',
  subheading = 'Discover the many ways you can grow and serve in our community',
  features = [],
}: FeaturesListSectionProps) {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          {heading && (
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-primary">
              {heading}
            </h2>
          )}
          {subheading && (
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">{subheading}</p>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon ? iconMap[feature.icon] || Heart : Heart
            return (
              <div
                key={index}
                className="group bg-white p-10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 border-gray-100 hover:border-primary/20 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className="w-20 h-20 bg-primary flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-secondary transition-all duration-300 shadow-lg">
                  <Icon className="w-10 h-10 text-white" />
                </div>

                {/* Title */}
                <h3 className="font-heading text-2xl md:text-3xl font-bold mb-5 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                  {feature.description}
                </p>

                {/* Link */}
                {feature.link && (
                  <Button
                    asChild
                    variant="ghost"
                    className="text-secondary hover:text-secondary/80 p-0 h-auto font-bold text-base group/link"
                  >
                    <Link href={feature.link.href} className="inline-flex items-center gap-2">
                      {feature.link.text}
                      <span className="group-hover/link:translate-x-2 transition-transform duration-300 text-xl">→</span>
                    </Link>
                  </Button>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
