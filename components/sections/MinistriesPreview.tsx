import Link from 'next/link'
import * as Icons from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Ministry } from '@/lib/types'

interface MinistriesPreviewProps {
  ministries: Ministry[]
}

export default function MinistriesPreview({ ministries }: MinistriesPreviewProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Our Ministries
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find your place to serve and grow in community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {ministries.map((ministry) => {
            const IconComponent = (Icons[ministry.icon as keyof typeof Icons] as Icons.LucideIcon) || Icons.Users

            return (
              <Link
                key={ministry._id}
                href={`/ministries/${ministry.slug.current}`}
                className="group bg-gray-50 rounded-lg p-8 hover:bg-blue-50 hover:shadow-lg transition-all"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:scale-110 transition-all">
                  <IconComponent className="text-blue-600 group-hover:text-white transition-colors" size={32} />
                </div>
                <h3 className="font-heading text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                  {ministry.name}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {ministry.description}
                </p>
              </Link>
            )
          })}
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/ministries">View All Ministries</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}