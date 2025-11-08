import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'featuresList',
  title: 'Features List Section',
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
      name: 'features',
      title: 'Features',
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
              rows: 3,
            },
            {
              name: 'link',
              title: 'Link (optional)',
              type: 'object',
              fields: [
                {
                  name: 'text',
                  title: 'Link Text',
                  type: 'string',
                },
                {
                  name: 'href',
                  title: 'URL',
                  type: 'string',
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      features: 'features',
    },
    prepare({ title, features }) {
      return {
        title: `Features: ${title || 'Untitled'}`,
        subtitle: `${features?.length || 0} items`,
      }
    },
  },
})
