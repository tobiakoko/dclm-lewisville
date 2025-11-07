import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'activity',
  title: 'Activity',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Activity Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Lucide icon name',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})