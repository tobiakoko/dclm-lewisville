import type { StaticImageData } from 'next/image'
import type { Photo } from '@/lib/data'

export interface PhotoSource {
  src: string | StaticImageData
  alt: string
  blurDataURL?: string
}

/** A photo uploaded in Sanity wins; otherwise the real photo bundled in app/assets, if any */
export function pickPhoto(fromSanity: Photo | undefined, bundled: { src: StaticImageData; alt: string } | undefined): PhotoSource | undefined {
  if (fromSanity) return { src: fromSanity.url, alt: fromSanity.alt, blurDataURL: fromSanity.lqip }
  return bundled
}
