import Link from 'next/link'
import * as Icons from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Ministry } from '@/lib/types'
import { Sparkles, ArrowRight } from 'lucide-react'

interface MinistriesPreviewProps {
  ministries: Ministry[]
}

export default function MinistriesPreview({ ministries }: MinistriesPreviewProps) {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Get Involved</span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Our Ministries
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find your place to serve, connect, and grow in community with others
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {ministries.map((ministry, index) => {
            const IconComponent = (Icons[ministry.icon as keyof typeof Icons] as Icons.LucideIcon) || Icons.Users

            return (
              <Link
                key={ministry._id}
                href={`/ministries/${ministry.slug.current}`}
                className="group relative bg-gradient-to-br from-white to-muted/30 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 border-2 border-border hover:border-primary/50 animate-fade-in-up hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-20 h-20 bg-gradient-to-br from-primary via-secondary to-accent rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500 group-hover:rotate-6">
                    <IconComponent className="text-white" size={36} />
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {ministry.name}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
                    {ministry.description}
                  </p>

                  {/* Learn more link */}
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            )
          })}
        </div>

        <div className="text-center animate-fade-in-up animate-delay-500">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300 hover:scale-105 group text-lg px-8 py-6 h-auto"
          >
            <Link href="/ministries" className="flex items-center gap-2">
              View All Ministries
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}