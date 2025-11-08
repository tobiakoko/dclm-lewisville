import Image from 'next/image'
import { Heart, Users, Book, Target, Compass, Sparkles } from 'lucide-react'
import { urlForImage } from '@/lib/sanity/image'

const iconMap: Record<string, any> = {
  Heart,
  Users,
  Book,
  Target,
  Compass,
  Sparkles,
}

interface Benefit {
  icon?: string
  title: string
  description: string
  image?: any
}

interface BenefitsSectionProps {
  heading?: string
  subheading?: string
  benefits: Benefit[]
  layout?: 'grid' | 'alternating' | 'cards'
}

export default function BenefitsSection({
  heading = 'Why Join Our Community',
  subheading = 'Experience the benefits of being part of our church family',
  benefits = [],
  layout = 'grid',
}: BenefitsSectionProps) {
  if (layout === 'alternating') {
    return (
      <section className="py-20">
        <div className="container">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            {heading && (
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="text-lg md:text-xl text-muted-foreground">{subheading}</p>
            )}
          </div>

          {/* Alternating Layout */}
          <div className="space-y-24">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon ? iconMap[benefit.icon] || Heart : Heart
              const isEven = index % 2 === 0

              return (
                <div
                  key={index}
                  className={`flex flex-col lg:flex-row gap-12 items-center ${
                    !isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Image */}
                  {benefit.image && (
                    <div className="flex-1 relative h-96  overflow-hidden shadow-2xl">
                      <Image
                        src={urlForImage(benefit.image).url()}
                        alt={benefit.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 space-y-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary  flex items-center justify-center">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-heading text-3xl font-bold">{benefit.title}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  if (layout === 'cards') {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            {heading && (
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="text-lg md:text-xl text-muted-foreground">{subheading}</p>
            )}
          </div>

          {/* Cards Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon ? iconMap[benefit.icon] || Heart : Heart

              return (
                <div
                  key={index}
                  className="group relative bg-white  p-8 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/10 to-secondary/10  blur-3xl group-hover:scale-150 transition-transform duration-500" />

                  <div className="relative">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary  flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-2xl font-bold mb-4">{benefit.title}</h3>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  // Default: Grid Layout
  return (
    <section className="py-20">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {heading && (
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">{heading}</h2>
          )}
          {subheading && (
            <p className="text-lg md:text-xl text-muted-foreground">{subheading}</p>
          )}
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon ? iconMap[benefit.icon] || Heart : Heart

            return (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                {/* Icon */}
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary  flex items-center justify-center mx-auto mb-6 group-hover:shadow-xl transition-shadow">
                  <Icon className="w-10 h-10 text-white" />
                </div>

                {/* Title */}
                <h3 className="font-heading text-2xl font-bold mb-4">{benefit.title}</h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
