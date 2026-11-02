import { defineField, defineType } from 'sanity'
import { UsersIcon } from '@sanity/icons/Users'

const fields = (kind: 'ministry' | 'outreach area') => [
  defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
  defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (r) => r.required() }),
  defineField({ name: 'body', title: `About this ${kind}`, type: 'richText', validation: (r) => r.required() }),
  defineField({ name: 'audience', title: 'Who it’s for', type: 'string', description: 'Only if the church has confirmed it.' }),
  defineField({ name: 'meetingInfo', title: 'When it meets', type: 'string', description: 'Only real, confirmed times.' }),
  defineField({
    name: 'contactEmail',
    title: 'Contact email',
    type: 'string',
    description: 'A church address only (never a member’s personal email). Empty means “Send us a message” goes to the contact form.',
    validation: (r) => r.email(),
  }),
  defineField({ name: 'photo', title: 'Photo', type: 'imageWithAlt' }),
  defineField({ name: 'order', title: 'Order', type: 'number', validation: (r) => r.required().integer().min(0) }),
]

export const ministry = defineType({
  name: 'ministry',
  title: 'Ministry',
  type: 'document',
  icon: UsersIcon,
  fields: fields('ministry'),
  orderings: [{ title: 'Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', media: 'photo' } },
})

export const outreachArea = defineType({
  name: 'outreachArea',
  title: 'Outreach area',
  type: 'document',
  icon: UsersIcon,
  fields: fields('outreach area'),
  orderings: [{ title: 'Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', media: 'photo' } },
})
