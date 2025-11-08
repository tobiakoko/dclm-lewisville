import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutSection',
  title: 'About Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'stats',
      title: 'Statistics (optional)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'number',
              title: 'Number',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: 'button',
      title: 'Button (optional)',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
        },
        {
          name: 'href',
          title: 'Link',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Image Left', value: 'image-left' },
          { title: 'Image Right', value: 'image-right' },
          { title: 'Centered', value: 'centered' },
        ],
      },
      initialValue: 'image-right',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: `About: ${title || 'Untitled'}`,
      }
    },
  },
})
