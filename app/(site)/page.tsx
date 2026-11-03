import type { Metadata } from 'next'
import Hero from '@/components/sections/home/Hero'
import MinistriesPreview from '@/components/sections/home/MinistriesPreview'
import { QuickInfo } from '@/components/sections/home/QuickInfo'
import { InfoBar } from '@/components/sections/home/InfoBar'
import { LatestMessage } from '@/components/sections/home/LatestMessage'
import { WhatToExpect } from '@/components/sections/home/WhatToExpect'
import { PastorsWelcome } from '@/components/sections/home/PastorsWelcome'
import { Testimonies } from '@/components/sections/home/Testimonies'
import { Verse } from '@/components/sections/home/Verse'
import { getHomeContent, getMinistries, getSiteData } from '@/lib/data'
import { getMessages } from '@/lib/sermons-data'

export async function generateMetadata(): Promise<Metadata> {
  const { config } = await getSiteData()
  // The home page uses the full name alone, without the "| name" template
  return { title: { absolute: config.name }, description: config.description, alternates: { canonical: '/' } }
}

// Order from REDESIGN.md §3 (BUILD-PLAN 2.5, with the info bar in place of the Sunday bar)
export default async function HomePage() {
  const [{ config, schedule }, home, { ministries, outreach }] = await Promise.all([getSiteData(), getHomeContent(), getMinistries()])
  const { featured, lewisville } = await getMessages(config)

  return (
    <>
      <Hero config={config} schedule={schedule} hero={home.hero} />
      <InfoBar config={config} schedule={schedule} />
      <QuickInfo config={config} schedule={schedule} />
      <PastorsWelcome welcome={home.welcome} localPastor={config.localPastor} />
      <WhatToExpect items={home.whatToExpect} />
      <LatestMessage featured={featured} recent={lewisville} config={config} schedule={schedule} />
      {home.testimony && <Testimonies testimony={home.testimony} />}
      <Verse verse={home.verse} />
      <MinistriesPreview ministries={ministries} outreach={outreach} />
    </>
  )
}
