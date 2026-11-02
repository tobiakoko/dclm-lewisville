import Hero from '@/components/sections/home/Hero'
import MinistriesPreview from '@/components/sections/home/MinistriesPreview'
import { QuickInfo } from '@/components/sections/home/QuickInfo'
import { WhatToExpect } from '@/components/sections/home/WhatToExpect'
import { PastorsWelcome } from '@/components/sections/home/PastorsWelcome'
import { Testimonies } from '@/components/sections/home/Testimonies'
import { Verse } from '@/components/sections/home/Verse'

// Content comes from lib/constants.ts and lib/content until Phase 3 wires Sanity.
export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickInfo />
      <WhatToExpect />
      <PastorsWelcome />
      <Testimonies />
      <Verse />
      <MinistriesPreview />
    </>
  )
}
