import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'benefitsSection',
  title: 'Benefits Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Section Subheading',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description: 'Lucide icon name',
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 4,
            },
            {
              name: 'image',
              title: 'Image (optional)',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'layout',
      title: 'Layout Style',
      type: 'string',
      options: {
        list: [
          { title: 'Grid', value: 'grid' },
          { title: 'Alternating', value: 'alternating' },
          { title: 'Cards', value: 'cards' },
        ],
      },
      initialValue: 'grid',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      benefits: 'benefits',
    },
    prepare({ title, benefits }) {
      return {
        title: `Benefits: ${title || 'Untitled'}`,
        subtitle: `${benefits?.length || 0} items`,
      }
    },
  },
})
