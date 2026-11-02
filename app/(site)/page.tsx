import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/sections/home/Hero'
import MinistriesPreview from '@/components/sections/home/MinistriesPreview'
import { QuickInfo, SundayBar } from '@/components/sections/home/QuickInfo'
import { WhatToExpect } from '@/components/sections/home/WhatToExpect'
import { PastorsWelcome } from '@/components/sections/home/PastorsWelcome'
import { Testimonies } from '@/components/sections/home/Testimonies'
import { Verse } from '@/components/sections/home/Verse'
import { Section } from '@/components/site/Section'
import { FeaturedMessage } from '@/components/site/FeaturedMessage'
import { getMessages } from '@/lib/sermons-data'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  // The home page uses the full name alone, without the "| name" template
  title: { absolute: SITE_CONFIG.name },
  description: SITE_CONFIG.description,
  alternates: { canonical: '/' },
}

// Order from BUILD-PLAN 2.5
export default async function HomePage() {
  const { featured } = await getMessages()

  return (
    <>
      <Hero />
      <SundayBar />
      <QuickInfo />
      <WhatToExpect />
      <PastorsWelcome />
      <Section id="latest-message" tone="paper" title="Latest message">
        <FeaturedMessage featured={featured} />
        <p className="mt-8">
          <Link href="/sermons" className="font-semibold text-emblem-sky-700 underline underline-offset-4">
            More sermons
          </Link>
        </p>
      </Section>
      <Testimonies />
      <Verse />
      <MinistriesPreview />
    </>
  )
}
