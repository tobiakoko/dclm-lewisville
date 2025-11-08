import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ctaSection',
  title: 'Call to Action Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'primaryButton',
      title: 'Primary Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'href',
          title: 'Link',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'secondaryButton',
      title: 'Secondary Button (optional)',
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
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          { title: 'Gradient', value: 'gradient' },
          { title: 'Image Background', value: 'image' },
          { title: 'Solid Color', value: 'solid' },
        ],
      },
      initialValue: 'gradient',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
    },
    prepare({ title, description }) {
      return {
        title: `CTA: ${title}`,
        subtitle: description,
      }
    },
  },
})
