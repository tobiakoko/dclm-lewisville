import sermon from './sermon'
import ministry from './ministry'
import person from './person'
import event from './event'
import testimonial from './testimonial'
import page from './page'
import series from './series'
import siteSettings from './siteSettings'

// Object types
import blockContent from './objects/blockContent'
import socialMedia from './objects/socialMedia'
import seo from './objects/seo'
import activity from './objects/activity'
import milestone from './objects/milestone'

export const schemaTypes = [
  // Documents
  sermon,
  ministry,
  person,
  event,
  testimonial,
  page,
  series,
  siteSettings,

  // Objects
  blockContent,
  socialMedia,
  seo,
  activity,
  milestone,
]