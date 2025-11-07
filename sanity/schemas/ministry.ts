import { defineField, defineType } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export default defineType({
  name: 'ministry',
  title: 'Ministries',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Ministry Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      description: 'Brief description for listing pages',
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: 'mission',
      title: 'Mission Statement',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Lucide icon name (e.g., "Users", "Heart", "BookOpen")',
      initialValue: 'Users',
    }),
    defineField({
      name: 'leader',
      title: 'Ministry Leader',
      type: 'reference',
      to: [{ type: 'person' }],
    }),
    defineField({
      name: 'meetingDay',
      title: 'Meeting Day',
      type: 'string',
      options: {
        list: [
          { title: 'Sunday', value: 'sunday' },
          { title: 'Monday', value: 'monday' },
          { title: 'Tuesday', value: 'tuesday' },
          { title: 'Wednesday', value: 'wednesday' },
          { title: 'Thursday', value: 'thursday' },
          { title: 'Friday', value: 'friday' },
          { title: 'Saturday', value: 'saturday' },
        ],
      },
    }),
    defineField({
      name: 'meetingTime',
      title: 'Meeting Time',
      type: 'string',
      description: 'e.g., "7:00 PM - 9:00 PM"',
    }),
    defineField({
      name: 'location',
      title: 'Meeting Location',
      type: 'string',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'activities',
      title: 'Key Activities/Programs',
      type: 'array',
      of: [{ type: 'activity' }],
    }),
    defineField({
      name: 'milestones',
      title: 'Ministry Milestones',
      type: 'array',
      of: [{ type: 'milestone' }],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which to display (lower numbers first)',
      initialValue: 100,
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Is this ministry currently active?',
      initialValue: true,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      leader: 'leader.name',
      media: 'images.0',
    },
    prepare(selection) {
      const { title, leader } = selection
      return {
        ...selection,
        subtitle: leader ? `Led by ${leader}` : 'No leader assigned',
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