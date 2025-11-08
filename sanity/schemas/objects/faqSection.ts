import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'faqSection',
  title: 'FAQ Section',
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
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'answer',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      faqs: 'faqs',
    },
    prepare({ title, faqs }) {
      return {
        title: `FAQ: ${title || 'Untitled'}`,
        subtitle: `${faqs?.length || 0} questions`,
      }
    },
  },
})
