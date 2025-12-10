import { defineField, defineType } from 'sanity'
import { CogIcon } from '@sanity/icons'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'logo',
      title: 'Church Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'address',
      title: 'Church Address',
      type: 'object',
      fields: [
        { name: 'street', type: 'string', title: 'Street Address' },
        { name: 'city', type: 'string', title: 'City' },
        { name: 'state', type: 'string', title: 'State' },
        { name: 'zip', type: 'string', title: 'ZIP Code' },
        { name: 'country', type: 'string', title: 'Country', initialValue: 'USA' },
      ],
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'servicesTimes',
      title: 'Service Times',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Service Name', validation: (Rule) => Rule.required() },
            { name: 'day', type: 'string', title: 'Day', validation: (Rule) => Rule.required() },
            { name: 'time', type: 'string', title: 'Time', validation: (Rule) => Rule.required() },
            { name: 'description', type: 'text', title: 'Description', rows: 2 },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'day',
              time: 'time',
            },
            prepare(selection) {
              const { title, subtitle, time } = selection
              return {
                title: title,
                subtitle: `${subtitle} - ${time}`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'socialMedia',
    }),
    defineField({
      name: 'aboutContent',
      title: 'About Content',
      type: 'object',
      description: 'Content for the About page',
      fields: [
        {
          name: 'mission',
          type: 'text',
          title: 'Mission Statement',
          rows: 4,
        },
        {
          name: 'vision',
          type: 'text',
          title: 'Vision Statement',
          rows: 4,
        },
        {
          name: 'historyTitle',
          type: 'string',
          title: 'History Section Title',
          initialValue: 'Our History',
        },
        {
          name: 'history',
          type: 'blockContent',
          title: 'Church History',
        },
        {
          name: 'founderInfo',
          type: 'object',
          title: 'Founder Information',
          fields: [
            { name: 'name', type: 'string', title: 'Name' },
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'bio', type: 'blockContent', title: 'Biography' },
            {
              name: 'photo',
              type: 'image',
              title: 'Photo',
              options: { hotspot: true },
            },
          ],
        },
        {
          name: 'coreBeliefs',
          type: 'array',
          title: 'Core Beliefs (Short List)',
          description: 'Brief list of core beliefs for the About page',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', type: 'string', title: 'Belief Title' },
                { name: 'description', type: 'text', title: 'Description', rows: 3 },
              ],
            },
          ],
        },
        {
          name: 'timeline',
          type: 'array',
          title: 'Church Timeline',
          description: 'Key milestones in church history',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'year', type: 'string', title: 'Year' },
                { name: 'title', type: 'string', title: 'Title' },
                { name: 'description', type: 'text', title: 'Description', rows: 2 },
              ],
              preview: {
                select: {
                  title: 'year',
                  subtitle: 'title',
                },
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'Default SEO Settings',
      type: 'seo',
      description: 'Default SEO settings for the site',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
