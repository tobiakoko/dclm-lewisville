import { defineField, defineType } from 'sanity'
import { UserIcon } from '@sanity/icons/User'

/** A leader on the About page. Bios marked verbatim must stay word for word. */
export default defineType({
  name: 'person',
  title: 'Leader',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({ name: 'key', title: 'Key', type: 'slug', description: 'Short stable id, e.g. agbo.', validation: (r) => r.required() }),
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'title', title: 'Title', type: 'string', description: 'e.g. Local Pastor', validation: (r) => r.required() }),
    defineField({ name: 'subtitle', title: 'Line under the name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'shortBio', title: 'Short bio (card)', type: 'richText', validation: (r) => r.required() }),
    defineField({ name: 'fullBio', title: 'Full bio (Read more)', type: 'richText', validation: (r) => r.required() }),
    defineField({ name: 'verbatim', title: 'Bio is verbatim', type: 'boolean', initialValue: false, description: 'Supplied by the church to be published word for word.' }),
    defineField({ name: 'photo', title: 'Photo', type: 'imageWithAlt' }),
    defineField({ name: 'order', title: 'Order', type: 'number', validation: (r) => r.required().integer().min(0) }),
  ],
  orderings: [{ title: 'Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'title', media: 'photo' } },
})
