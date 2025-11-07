import Link from 'next/link'
import SermonCard from '@/components/SermonCard'
import { Button } from '@/components/ui/button'
import { Sermon } from '@/lib/types'

interface SermonsListProps {
  sermons: Sermon[]
  featured?: boolean
}

export default function SermonsList({ sermons, featured = false }: SermonsListProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            {featured ? 'Recent Sermons' : 'All Sermons'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Listen to powerful biblical messages that will strengthen your faith
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sermons.map((sermon) => (
            <SermonCard key={sermon._id} sermon={sermon} />
          ))}
        </div>

        {featured && (
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/sermons">View All Sermons</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}