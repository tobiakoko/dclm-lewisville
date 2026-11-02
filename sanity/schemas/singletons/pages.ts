import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons/Home'
import { DocumentTextIcon } from '@sanity/icons/DocumentText'
import { DocumentsIcon } from '@sanity/icons/Documents'

const VERBATIM_NOTE = 'VERBATIM: supplied by the church. Change only with the pastor’s approval, word for word.'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({ name: 'heroTitle', title: 'Hero title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'heroSubtitle', title: 'Hero sentence', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'whatToExpect', title: 'What visitors should expect', type: 'array', of: [{ type: 'titledText' }], validation: (r) => r.required().length(4) }),
    defineField({ name: 'welcomeHeading', title: 'Pastor’s Welcome heading', type: 'string', description: VERBATIM_NOTE, validation: (r) => r.required() }),
    defineField({ name: 'welcome', title: 'Pastor’s Welcome', type: 'richText', description: VERBATIM_NOTE, validation: (r) => r.required() }),
    defineField({
      name: 'verse',
      title: 'The Bible Verse We Live By',
      type: 'object',
      fields: [
        defineField({ name: 'text', title: 'Verse', type: 'text', rows: 3, validation: (r) => r.required() }),
        defineField({ name: 'reference', title: 'Reference', type: 'string', validation: (r) => r.required() }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Home page' }) },
})

export const visitPage = defineType({
  name: 'visitPage',
  title: 'Plan Your Visit',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'serviceLines',
      title: 'Service times in plain English',
      type: 'richText',
      description: 'One paragraph per meeting. A paragraph starting with a meeting’s name is shown on that meeting’s card.',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'sections', title: 'Sections', type: 'array', of: [{ type: 'titledText' }], validation: (r) => r.required() }),
  ],
  preview: { prepare: () => ({ title: 'Plan Your Visit' }) },
})

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About page',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({ name: 'whoWeAre', title: 'Who we are', type: 'titledText', validation: (r) => r.required() }),
    defineField({ name: 'story', title: 'Mission and vision', type: 'array', of: [{ type: 'storySection' }], validation: (r) => r.required() }),
    defineField({
      name: 'doctrinesIntro',
      title: 'Bible doctrines introduction',
      type: 'object',
      description: VERBATIM_NOTE,
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'references', title: 'References', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'quotation', title: 'Quotation', type: 'text', rows: 4, validation: (r) => r.required() }),
        defineField({ name: 'statement', title: 'Statement', type: 'string', validation: (r) => r.required() }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'About page' }) },
})

export const givePage = defineType({
  name: 'givePage',
  title: 'Give page',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'ways',
      title: 'Ways to give',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'wayToGive',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
            defineField({
              name: 'detail',
              title: 'Details',
              type: 'text',
              rows: 3,
              initialValue: 'Information will be provided shortly.',
              description: 'Only facts the church has confirmed. No security or tax claims.',
              validation: (r) => r.required(),
            }),
          ],
        },
      ],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: { prepare: () => ({ title: 'Give page' }) },
})

export const legalPages = defineType({
  name: 'legalPages',
  title: 'Privacy and Terms',
  type: 'document',
  icon: DocumentsIcon,
  fields: [
    defineField({ name: 'lastUpdated', title: 'Last updated', type: 'date', validation: (r) => r.required() }),
    defineField({ name: 'effectiveDate', title: 'Privacy Policy effective date line', type: 'string', initialValue: 'Effective date: [launch date]', validation: (r) => r.required() }),
    defineField({
      name: 'privacy',
      title: 'Privacy Policy',
      type: 'richText',
      description: 'The final “Contact.” line is added from Church details.',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'copyright', title: 'Copyright Policy', type: 'richText', validation: (r) => r.required() }),
    defineField({ name: 'waiver', title: 'Waiver and Release', type: 'richText', validation: (r) => r.required() }),
  ],
  preview: { prepare: () => ({ title: 'Privacy and Terms' }) },
})

export const singletonTypes = [homePage, visitPage, aboutPage, givePage, legalPages]
