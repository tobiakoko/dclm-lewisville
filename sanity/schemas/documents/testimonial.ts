import { defineField, defineType } from 'sanity'
import { HeartIcon } from '@sanity/icons/Heart'

/** A real testimony, published with the member's agreement. Never invent one. */
export default defineType({
  name: 'testimonial',
  title: 'Testimony',
  type: 'document',
  icon: HeartIcon,
  fields: [
    defineField({ name: 'name', title: 'Name as shown', type: 'string', description: 'e.g. “Bro K”.', validation: (r) => r.required() }),
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'content', title: 'Testimony', type: 'text', rows: 6, validation: (r) => r.required() }),
    defineField({ name: 'sourceUrl', title: 'Where it was first published', type: 'url' }),
    defineField({ name: 'featured', title: 'Show on the home page', type: 'boolean', initialValue: false }),
  ],
  preview: { select: { title: 'name', subtitle: 'title' } },
})
