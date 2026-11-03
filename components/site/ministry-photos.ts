import type { MinistryPhoto } from '@/components/site/Ministry'
import Women from '@/app/assets/women_ministry.jpeg'
import Children from '@/app/assets/ChildrenMinistry.jpeg'
import Youth from '@/app/assets/YouthMinistry.jpeg'
import Men from '@/app/assets/men_ministry.jpeg'
import Music from '@/app/assets/MusicMinistry.jpeg'

/** Real ministry photos from app/assets, with alt text describing only what is visible */
export const MINISTRY_PHOTOS: Record<string, MinistryPhoto> = {
  women: { src: Women, alt: 'Four women of the church standing together' },
  children: { src: Children, alt: 'A girl speaking at the pulpit' },
  youth: { src: Youth, alt: 'Young people standing during a service' },
  men: { src: Men, alt: 'Four men of the church standing together on the platform' },
  music: { src: Music, alt: 'Musicians playing keyboards during a service' },
}
