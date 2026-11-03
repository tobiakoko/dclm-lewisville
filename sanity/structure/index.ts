import type { StructureResolver } from 'sanity/structure'
import { CogIcon } from '@sanity/icons/Cog'
import { HomeIcon } from '@sanity/icons/Home'
import { DocumentTextIcon } from '@sanity/icons/DocumentText'
import { DocumentsIcon } from '@sanity/icons/Documents'
import { UserIcon } from '@sanity/icons/User'
import { UsersIcon } from '@sanity/icons/Users'
import { BookIcon } from '@sanity/icons/Book'
import { CalendarIcon } from '@sanity/icons/Calendar'
import { PlayIcon } from '@sanity/icons/Play'
import { HeartIcon } from '@sanity/icons/Heart'

const SINGLETON_ITEMS = [
  { id: 'siteSettings', title: 'Church details', icon: CogIcon },
  { id: 'homePage', title: 'Home page', icon: HomeIcon },
  { id: 'visitPage', title: 'Plan Your Visit', icon: DocumentTextIcon },
  { id: 'aboutPage', title: 'About page', icon: DocumentTextIcon },
  { id: 'givePage', title: 'Give page', icon: DocumentTextIcon },
  { id: 'legalPages', title: 'Privacy and Terms', icon: DocumentsIcon },
] as const

const LISTS = [
  { type: 'person', title: 'Leaders', icon: UserIcon },
  { type: 'ministry', title: 'Ministries', icon: UsersIcon },
  { type: 'outreachArea', title: 'Outreach', icon: UsersIcon },
  { type: 'doctrine', title: 'Doctrines', icon: BookIcon },
  { type: 'event', title: 'Special events', icon: CalendarIcon },
  { type: 'sermon', title: 'Sermons', icon: PlayIcon },
  { type: 'testimonial', title: 'Testimonies', icon: HeartIcon },
] as const

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      ...SINGLETON_ITEMS.map((item) =>
        S.listItem().title(item.title).icon(item.icon).id(item.id).child(S.document().schemaType(item.id).documentId(item.id).title(item.title))
      ),
      S.divider(),
      ...LISTS.map((list) => S.documentTypeListItem(list.type).title(list.title).icon(list.icon)),
    ])
