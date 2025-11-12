import { Suspense } from 'react'
import { Metadata } from 'next'
import { WhatWeBelieveSection } from '@/components/sections/WhatWeBelieve'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: `What We Believe | ${SITE_CONFIG.shortName}`,
  description: 'Our foundational Bible doctrines and theological beliefs at Deeper Life Bible Church Lewisville. Learn about our faith, practices, and commitment to biblical truth.',
  openGraph: {
    title: `What We Believe | ${SITE_CONFIG.shortName}`,
    description: 'Our foundational Bible doctrines and theological beliefs at Deeper Life Bible Church Lewisville.',
    url: `${SITE_CONFIG.url}/about/what-we-believe`,
    siteName: SITE_CONFIG.name,
    type: 'website',
  },
}

// Loading skeleton component
function WhatWeBelieveSkeleton() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-7xl animate-pulse">
      <div className="mx-4 grid min-h-[calc(100vh-3.5rem)] grid-cols-1 border-x md:mx-0 md:grid-cols-5 md:border-x-0 lg:border-x">
        {/* Left Column Skeleton */}
        <div className="space-y-6 px-6 pt-16 pb-8 md:col-span-2 md:border-r md:pr-8 lg:px-12">
          <div className="space-y-4">
            <div className="h-4 w-32 bg-muted rounded" />
            <div className="h-12 w-3/4 bg-muted rounded" />
            <div className="h-1 w-20 bg-muted rounded-full" />
          </div>
          
          <div className="space-y-4">
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-3/4 bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded mt-6" />
            <div className="h-4 w-5/6 bg-muted rounded" />
          </div>
        </div>

        {/* Right Column Skeleton */}
        <div className="md:col-span-3 md:pl-8 lg:pl-12">
          <div className="py-8 px-6 space-y-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="border-b border-border pb-4">
                <div className="h-6 w-2/3 bg-muted rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function WhatWeBelievePage() {
  return (
    <main className="min-h-screen bg-background">
      <Suspense fallback={<WhatWeBelieveSkeleton />}>
        <WhatWeBelieveSection />
      </Suspense>
    </main>
  )
}