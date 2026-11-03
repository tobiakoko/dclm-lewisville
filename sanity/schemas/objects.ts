import { defineArrayMember, defineField, defineType } from 'sanity'

/**
 * Paragraphs with bold and italic only: the formatting SITE-CONTENT.md uses. Keeping it this
 * small means the church's wording renders exactly as supplied.
 */
export const richText = defineType({
  name: 'richText',
  title: 'Text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [{ title: 'Paragraph', value: 'normal' }],
      lists: [],
      marks: {
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Italic', value: 'em' },
        ],
        annotations: [],
      },
    }),
  ],
})

export const postalAddress = defineType({
  name: 'postalAddress',
  title: 'Address',
  type: 'object',
  fields: [
    defineField({ name: 'street', title: 'Street', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'city', title: 'City', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'state', title: 'State', type: 'string', validation: (r) => r.required().length(2) }),
    defineField({ name: 'zip', title: 'ZIP code', type: 'string', validation: (r) => r.required().regex(/^\d{5}$/, { name: '5-digit ZIP' }) }),
    defineField({ name: 'country', title: 'Country code', type: 'string', initialValue: 'US', validation: (r) => r.required().length(2) }),
  ],
  options: { columns: 2 },
})

const CLOCK = /^([01]\d|2[0-3]):[0-5]\d$/

export const serviceTime = defineType({
  name: 'serviceTime',
  title: 'Weekly meeting',
  type: 'object',
  fields: [
    defineField({ name: 'key', title: 'Key', type: 'slug', description: 'Short stable id, e.g. sunday-worship. Don’t change it once set.', validation: (r) => r.required() }),
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'day',
      title: 'Day',
      type: 'string',
      options: { list: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'start', title: 'Start (24-hour, HH:MM)', type: 'string', validation: (r) => r.required().regex(CLOCK, { name: 'HH:MM' }) }),
    defineField({ name: 'end', title: 'End (24-hour, HH:MM)', type: 'string', description: 'Leave empty if there is no set end time.', validation: (r) => r.regex(CLOCK, { name: 'HH:MM' }) }),
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
      validation: (r) => r.required(),
    }),
    defineField({ name: 'description', title: 'One-line description', type: 'string', validation: (r) => r.required().max(160) }),
    defineField({
      name: 'joinUrl',
      title: 'Join link (Zoom or YouTube)',
      type: 'url',
      description: 'Leave empty until the link exists; the site then shows “[Zoom link to come]”.',
    }),
  ],
  preview: { select: { title: 'name', day: 'day', start: 'start' }, prepare: ({ title, day, start }) => ({ title, subtitle: `${day ?? ''} ${start ?? ''}` }) },
})

export const scheduleException = defineType({
  name: 'scheduleException',
  title: 'Schedule change',
  type: 'object',
  fields: [
    defineField({ name: 'date', title: 'Date', type: 'date', validation: (r) => r.required() }),
    defineField({ name: 'meeting', title: 'Meeting key', type: 'string', description: 'The key of the weekly meeting this changes, e.g. friday-revival-hour.', validation: (r) => r.required() }),
    defineField({ name: 'cancelled', title: 'Cancelled', type: 'boolean', initialValue: false }),
    defineField({ name: 'note', title: 'Note for visitors', type: 'string', validation: (r) => r.required().max(160) }),
  ],
  preview: { select: { title: 'note', subtitle: 'date' } },
})

export const otherLocation = defineType({
  name: 'otherLocation',
  title: 'Other location',
  type: 'object',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'address', title: 'Address', type: 'postalAddress', validation: (r) => r.required() }),
    defineField({ name: 'serviceTimes', title: 'Service times', type: 'string', initialValue: '[Service times to be confirmed]', validation: (r) => r.required() }),
  ],
})

export const titledText = defineType({
  name: 'titledText',
  title: 'Titled text',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'body', title: 'Text', type: 'richText', validation: (r) => r.required() }),
  ],
  preview: { select: { title: 'title' } },
})

export const storySection = defineType({
  name: 'storySection',
  title: 'About section',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'body', title: 'Opening text', type: 'richText', validation: (r) => r.required() }),
    defineField({ name: 'list', title: 'List', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'closing', title: 'Text after the list', type: 'richText' }),
  ],
  preview: { select: { title: 'title' } },
})

export const imageWithAlt = defineType({
  name: 'imageWithAlt',
  title: 'Photo',
  type: 'image',
  options: { hotspot: true },
  fields: [
    defineField({
      name: 'alt',
      title: 'Description (alt text)',
      type: 'string',
      description: 'Describe only what is visible. Never caption a photo as the church building unless it is.',
      validation: (r) => r.required(),
    }),
  ],
})

export const objectTypes = [richText, postalAddress, serviceTime, scheduleException, otherLocation, titledText, storySection, imageWithAlt]
