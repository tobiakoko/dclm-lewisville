import { defineField, defineType } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export default defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        { type: 'hero' },
        { type: 'featuresList' },
        { type: 'benefitsSection' },
        { type: 'aboutSection' },
        { type: 'ctaSection' },
        { type: 'ctaFormSection' },
        { type: 'faqSection' },
        {
          type: 'reference',
          name: 'ministriesRef',
          title: 'Ministries Section',
          to: [{ type: 'ministry' }],
        },
        {
          type: 'reference',
          name: 'testimonialsRef',
          title: 'Testimonials Section',
          to: [{ type: 'testimonial' }],
        },
        {
          type: 'reference',
          name: 'teamRef',
          title: 'Team Section',
          to: [{ type: 'person' }],
        },
      ],
    }),
    defineField({
      name: 'content',
      title: 'Page Content (Legacy)',
      type: 'blockContent',
      description: 'Use "Page Sections" above for the new flexible layout builder',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
})