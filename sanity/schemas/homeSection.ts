import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export default defineType({
  name: 'homeSection',
  title: 'Homepage Sections',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'sectionId',
      title: 'Section ID',
      type: 'string',
      description: 'Unique identifier for this section',
      options: {
        list: [
          { title: 'Hero Carousel', value: 'heroCarousel' },
          { title: 'Pastor Welcome', value: 'pastorWelcome' },
          { title: 'Give Section', value: 'giveSection' },
          { title: 'CTA Section', value: 'ctaSection' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      description: 'Show or hide this section on the homepage',
      initialValue: true,
    }),
    defineField({
      name: 'heroSlides',
      title: 'Hero Carousel Slides',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title', validation: (Rule) => Rule.required() },
            { name: 'subtitle', type: 'string', title: 'Subtitle' },
            { name: 'description', type: 'text', title: 'Description', rows: 3 },
            {
              name: 'image',
              type: 'image',
              title: 'Background Image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'ctaText',
              type: 'string',
              title: 'CTA Button Text',
              initialValue: 'Learn More',
            },
            { name: 'ctaLink', type: 'string', title: 'CTA Button Link', initialValue: '/about' },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'subtitle',
              media: 'image',
            },
          },
        },
      ],
      hidden: ({ document }) => document?.sectionId !== 'heroCarousel',
    }),
    defineField({
      name: 'welcomeMessage',
      title: 'Pastor Welcome Message',
      type: 'object',
      fields: [
        { name: 'heading', type: 'string', title: 'Heading' },
        { name: 'content', type: 'blockContent', title: 'Message Content' },
        { name: 'signature', type: 'string', title: 'Signature Line' },
        { name: 'tagline', type: 'string', title: 'Tagline/Quote' },
      ],
      hidden: ({ document }) => document?.sectionId !== 'pastorWelcome',
    }),
    defineField({
      name: 'giveContent',
      title: 'Give Section Content',
      type: 'object',
      fields: [
        { name: 'heading', type: 'string', title: 'Heading' },
        { name: 'description', type: 'text', title: 'Description', rows: 3 },
        { name: 'churchGivingTitle', type: 'string', title: 'Church Giving Title' },
        { name: 'churchGivingDescription', type: 'text', title: 'Church Giving Description' },
        { name: 'gckGivingTitle', type: 'string', title: 'GCK Giving Title' },
        { name: 'gckGivingDescription', type: 'text', title: 'GCK Giving Description' },
        { name: 'gckGivingUrl', type: 'url', title: 'GCK Giving URL' },
        { name: 'scriptureVerse', type: 'text', title: 'Scripture Verse' },
        { name: 'scriptureReference', type: 'string', title: 'Scripture Reference' },
      ],
      hidden: ({ document }) => document?.sectionId !== 'giveSection',
    }),
    defineField({
      name: 'ctaContent',
      title: 'CTA Section Content',
      type: 'object',
      fields: [
        { name: 'heading', type: 'string', title: 'Heading' },
        { name: 'highlightedText', type: 'string', title: 'Highlighted Text in Heading' },
        { name: 'primaryButtonText', type: 'string', title: 'Primary Button Text' },
        { name: 'primaryButtonLink', type: 'string', title: 'Primary Button Link' },
        { name: 'secondaryButtonText', type: 'string', title: 'Secondary Button Text' },
        { name: 'secondaryButtonLink', type: 'string', title: 'Secondary Button Link' },
      ],
      hidden: ({ document }) => document?.sectionId !== 'ctaSection',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      sectionId: 'sectionId',
      enabled: 'enabled',
    },
    prepare(selection) {
      const { title, sectionId, enabled } = selection
      return {
        title: title,
        subtitle: `${sectionId} - ${enabled ? 'Enabled' : 'Disabled'}`,
      }
    },
  },
})
