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
import { getHomeContent, getMinistries, getSiteData } from '@/lib/data'
import { getMessages } from '@/lib/sermons-data'

export async function generateMetadata(): Promise<Metadata> {
  const { config } = await getSiteData()
  // The home page uses the full name alone, without the "| name" template
  return { title: { absolute: config.name }, description: config.description, alternates: { canonical: '/' } }
}

// Order from BUILD-PLAN 2.5
export default async function HomePage() {
  const [{ config, schedule }, home, { ministries }] = await Promise.all([getSiteData(), getHomeContent(), getMinistries()])
  const { featured } = await getMessages(config)

  return (
    <>
      <Hero config={config} schedule={schedule} hero={home.hero} />
      <SundayBar config={config} schedule={schedule} />
      <QuickInfo schedule={schedule} />
      <WhatToExpect items={home.whatToExpect} />
      <PastorsWelcome welcome={home.welcome} localPastor={config.localPastor} />
      <Section id="latest-message" tone="paper" title="Latest message">
        <FeaturedMessage featured={featured} config={config} schedule={schedule} />
        <p className="mt-8">
          <Link href="/sermons" className="font-semibold text-emblem-sky-700 underline underline-offset-4">
            More sermons
          </Link>
        </p>
      </Section>
      {home.testimony && <Testimonies testimony={home.testimony} />}
      <Verse verse={home.verse} />
      <MinistriesPreview ministries={ministries} />
    </>
  )
}
