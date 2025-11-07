import { client } from '@/lib/sanity/client'
import { sermonsQuery } from '@/lib/sanity/queries'
import SermonCard from '@/components/SermonCard'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Sermons',
  description: 'Listen to recent sermons and teachings from DCLM Lewisville.',
}

export default async function SermonsPage() {
  const sermons = await client.fetch(sermonsQuery)

  return (
    <div className="py-16">
      {/* Hero */}
      <section className="bg-linear-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container text-center">
          <h1 className="font-heading text-5xl font-bold mb-4">Sermons</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Grow in your faith through biblical teaching and powerful messages
          </p>
        </div>
      </section>

      {/* Sermons List */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sermons.map((sermon) => (
              <SermonCard key={sermon._id} sermon={sermon} />
            ))}
          </div>

          {/* Load More (if implementing pagination) */}
          {sermons.length >= 12 && (
            <div className="text-center mt-12">
              <Button size="lg">Load More Sermons</Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}