import { objectTypes } from './objects'
import siteSettings from './singletons/siteSettings'
import { singletonTypes } from './singletons/pages'
import person from './documents/person'
import { ministry, outreachArea } from './documents/ministry'
import doctrine from './documents/doctrine'
import event from './documents/event'
import sermon from './documents/sermon'
import testimonial from './documents/testimonial'

/** Singleton document ids are their type names (see sanity/structure) */
export const SINGLETONS = ['siteSettings', 'homePage', 'visitPage', 'aboutPage', 'givePage', 'legalPages'] as const

export const schemaTypes = [
  siteSettings,
  ...singletonTypes,
  person,
  ministry,
  outreachArea,
  doctrine,
  event,
  sermon,
  testimonial,
  ...objectTypes,
]
