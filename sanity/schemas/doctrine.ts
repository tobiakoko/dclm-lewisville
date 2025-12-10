import { defineField, defineType } from 'sanity'
import { BookIcon } from '@sanity/icons'

export default defineType({
  name: 'doctrine',
  title: 'Bible Doctrines',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Doctrine Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which to display (lower numbers first)',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'content',
      title: 'Doctrine Content',
      type: 'text',
      rows: 6,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'scripture',
      title: 'Scripture References',
      type: 'string',
      description: 'Bible verse references (e.g., "2 Timothy 3:16,17; Proverbs 30:5,6")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'The Bible & God', value: 'bible-god' },
          { title: 'Salvation & Christian Life', value: 'salvation' },
          { title: 'Church Ordinances', value: 'ordinances' },
          { title: 'End Times', value: 'end-times' },
          { title: 'Other Doctrines', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show in featured/summary lists',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      order: 'order',
      scripture: 'scripture',
    },
    prepare(selection) {
      const { title, order, scripture } = selection
      return {
        title: `${order}. ${title}`,
        subtitle: scripture,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
