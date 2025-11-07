import Link from 'next/link'
import SermonCard from '@/components/SermonCard'
import { Button } from '@/components/ui/button'
import { Sermon } from '@/lib/types'
import { Sparkles, ArrowRight } from 'lucide-react'

interface SermonsListProps {
  sermons: Sermon[]
  featured?: boolean
}

export default function SermonsList({ sermons, featured = false }: SermonsListProps) {
  return (
    <section className="py-24 bg-gradient-to-b from-muted/30 via-white to-muted/30 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              {featured ? 'Latest Messages' : 'Sermon Archive'}
            </span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {featured ? 'Recent Sermons' : 'All Sermons'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Listen to powerful biblical messages that will strengthen your faith and draw you closer to God
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {sermons.map((sermon, index) => (
            <div
              key={sermon._id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <SermonCard sermon={sermon} />
            </div>
          ))}
        </div>

        {featured && (
          <div className="text-center mt-16 animate-fade-in-up animate-delay-500">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300 hover:scale-105 group text-lg px-8 py-6 h-auto"
            >
              <Link href="/sermons" className="flex items-center gap-2">
                View All Sermons
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}