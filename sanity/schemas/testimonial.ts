import { defineField, defineType } from 'sanity'
import { HeartIcon } from '@sanity/icons'

export default defineType({
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  icon: HeartIcon,
  fields: [
    defineField({
      name: 'content',
      title: 'Testimonial Content',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authorTitle',
      title: 'Author Title/Role',
      type: 'string',
      description: 'e.g., "Church Member", "Youth Ministry"',
    }),
    defineField({
      name: 'photo',
      title: 'Author Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'ministry',
      title: 'Related Ministry',
      type: 'reference',
      to: [{ type: 'ministry' }],
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Display on homepage',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'content',
      media: 'photo',
    },
  },
})