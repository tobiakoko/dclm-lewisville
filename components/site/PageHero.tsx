import Image, { type StaticImageData } from 'next/image'
import type { ReactNode } from 'react'
import { Container } from '@/components/site/Section'

/**
 * Page title band: a title, one sentence, and optionally a real photo behind a navy-950
 * overlay of at least 70% (DESIGN-SYSTEM.md color rules).
 */
export function PageHero({
  title,
  sentence,
  photo,
  children,
}: {
  title: string
  sentence?: ReactNode
  photo?: StaticImageData
  children?: ReactNode
}) {
  return (
    <header className="on-dark relative isolate overflow-hidden bg-navy-950 text-white">
      {photo && (
        <>
          <Image src={photo} alt="" fill priority placeholder="blur" sizes="100vw" className="-z-20 object-cover" />
          <div className="absolute inset-0 -z-10 bg-navy-950/80" aria-hidden="true" />
        </>
      )}
      <Container className="py-14 md:py-20">
        <h1 className="max-w-3xl text-white">{title}</h1>
        {sentence && <p className="mt-4 max-w-prose text-lg md:text-xl">{sentence}</p>}
        {children && <div className="mt-6">{children}</div>}
      </Container>
    </header>
  )
}
