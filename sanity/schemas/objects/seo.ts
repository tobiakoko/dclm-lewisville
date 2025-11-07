import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Custom title for search engines (max 60 chars)',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Custom description for search engines (max 160 chars)',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'metaImage',
      title: 'Meta Image',
      type: 'image',
      description: 'Image for social media sharing (1200x630px recommended)',
    }),
  ],
})