import { defineField, defineType } from 'sanity'
import { CalendarIcon } from '@sanity/icons/Calendar'

/** A special event. Weekly meetings live in Church details → Schedule. */
export default defineType({
  name: 'event',
  title: 'Special event',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'start', title: 'Starts', type: 'datetime', description: 'Central Time.', validation: (r) => r.required() }),
    defineField({ name: 'end', title: 'Ends', type: 'datetime', validation: (r) => r.min(r.valueOfField('start')) }),
    defineField({ name: 'location', title: 'Location', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'mode',
      title: 'How to attend',
      type: 'string',
      options: {
        list: [
          { title: 'In person', value: 'in-person' },
          { title: 'Online', value: 'online' },
          { title: 'In person and online', value: 'both' },
        ],
        layout: 'radio',
      },
      initialValue: 'in-person',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'registrationUrl', title: 'Registration link', type: 'url' }),
  ],
  orderings: [{ title: 'Start', name: 'start', by: [{ field: 'start', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'start' } },
})
