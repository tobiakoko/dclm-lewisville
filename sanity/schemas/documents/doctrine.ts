import { defineField, defineType } from 'sanity'
import { BookIcon } from '@sanity/icons/Book'

const VERBATIM = 'VERBATIM: change only with the pastor’s approval, word for word. Don’t correct spelling or references.'

export default defineType({
  name: 'doctrine',
  title: 'Doctrine',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', description: VERBATIM, validation: (r) => r.required() }),
    defineField({ name: 'body', title: 'Doctrine', type: 'text', rows: 8, description: VERBATIM, validation: (r) => r.required() }),
    defineField({ name: 'references', title: 'Scripture references', type: 'text', rows: 3, description: VERBATIM, validation: (r) => r.required() }),
    defineField({ name: 'order', title: 'Order', type: 'number', validation: (r) => r.required().integer().min(1) }),
  ],
  orderings: [{ title: 'Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', order: 'order' }, prepare: ({ title, order }) => ({ title, subtitle: `Doctrine ${order}` }) },
})
