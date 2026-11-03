import { defineField, defineType } from 'sanity'
import { CogIcon } from '@sanity/icons/Cog'

/** Every branch fact (CLAUDE.md rule 3). One document, id "siteSettings". */
export default defineType({
  name: 'siteSettings',
  title: 'Church details',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'church', title: 'Church', default: true },
    { name: 'schedule', title: 'Schedule' },
    { name: 'links', title: 'Links' },
    { name: 'locations', title: 'Other locations' },
  ],
  fields: [
    defineField({ name: 'name', title: 'Church name', type: 'string', group: 'church', validation: (r) => r.required() }),
    defineField({ name: 'shortName', title: 'Header name', type: 'string', group: 'church', description: 'Shown in the header, e.g. “Deeper Life Bible Church · Lewisville”.', validation: (r) => r.required() }),
    defineField({ name: 'affiliation', title: 'Affiliation', type: 'string', group: 'church', validation: (r) => r.required() }),
    defineField({ name: 'region', title: 'Region', type: 'string', group: 'church', validation: (r) => r.required() }),
    defineField({ name: 'regionalOverseer', title: 'Regional Overseer', type: 'string', group: 'church', validation: (r) => r.required() }),
    defineField({ name: 'localPastor', title: 'Local Pastor', type: 'string', group: 'church', validation: (r) => r.required() }),
    defineField({ name: 'address', title: 'Address', type: 'postalAddress', group: 'church', validation: (r) => r.required() }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      group: 'church',
      description: 'Written as (469) 939-6994.',
      validation: (r) => r.required().regex(/^\(\d{3}\) \d{3}-\d{4}$/, { name: '(xxx) xxx-xxxx' }),
    }),
    defineField({ name: 'email', title: 'Email', type: 'string', group: 'church', validation: (r) => r.required().email() }),
    defineField({ name: 'officeHours', title: 'Office hours', type: 'text', rows: 3, group: 'church', validation: (r) => r.required() }),
    defineField({ name: 'timeZone', title: 'Time zone', type: 'string', group: 'church', initialValue: 'America/Chicago', readOnly: true }),

    defineField({ name: 'schedule', title: 'Weekly meetings', type: 'array', group: 'schedule', of: [{ type: 'serviceTime' }], validation: (r) => r.required().min(1) }),
    defineField({
      name: 'scheduleExceptions',
      title: 'Schedule changes',
      type: 'array',
      group: 'schedule',
      description: 'One-off changes such as a cancelled meeting. Past dates are ignored.',
      of: [{ type: 'scheduleException' }],
    }),

    defineField({
      name: 'youtube',
      title: 'YouTube',
      type: 'object',
      group: 'links',
      validation: (r) => r.required(),
      fields: [
        defineField({ name: 'channelId', title: 'Channel ID', type: 'string', description: 'Starts with UC. Used for the video feed and the live check.', validation: (r) => r.required().regex(/^UC[A-Za-z0-9_-]{22}$/, { name: 'channel ID' }) }),
        defineField({ name: 'channel', title: 'Channel link', type: 'url', validation: (r) => r.required() }),
        defineField({ name: 'streams', title: 'Live streams link', type: 'url', validation: (r) => r.required() }),
      ],
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social media',
      type: 'object',
      group: 'links',
      description: 'Leave a link empty to hide its icon.',
      fields: [
        defineField({ name: 'facebook', title: 'Facebook', type: 'url' }),
        defineField({ name: 'instagram', title: 'Instagram', type: 'url' }),
      ],
    }),
    defineField({
      name: 'dclm',
      title: 'DCLM links',
      type: 'object',
      group: 'links',
      validation: (r) => r.required(),
      fields: [
        defineField({ name: 'prayerRequestHub', title: 'Prayer Request Hub', type: 'url', validation: (r) => r.required() }),
        defineField({ name: 'webcast', title: 'Webcast', type: 'url', validation: (r) => r.required() }),
        defineField({ name: 'followUs', title: 'Follow us page', type: 'url', validation: (r) => r.required() }),
        defineField({ name: 'youtubeChannelId', title: 'Headquarters YouTube channel ID', type: 'string', validation: (r) => r.required().regex(/^UC[A-Za-z0-9_-]{22}$/, { name: 'channel ID' }) }),
      ],
    }),
    defineField({ name: 'otherLocations', title: 'Our other locations', type: 'array', group: 'locations', of: [{ type: 'otherLocation' }] }),
  ],
  preview: { prepare: () => ({ title: 'Church details' }) },
})
