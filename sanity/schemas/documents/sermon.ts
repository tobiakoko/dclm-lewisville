import { defineField, defineType } from 'sanity'
import { PlayIcon } from '@sanity/icons/Play'

/** A recorded message. Lewisville uploads also arrive from the YouTube feed automatically. */
export default defineType({
  name: 'sermon',
  title: 'Sermon',
  type: 'document',
  icon: PlayIcon,
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'speaker', title: 'Speaker', type: 'string', description: 'Only the real speaker; leave empty if unknown.' }),
    defineField({ name: 'date', title: 'Date', type: 'date', validation: (r) => r.required() }),
    defineField({
      name: 'youtubeId',
      title: 'YouTube video ID',
      type: 'string',
      description: 'The 11 characters after watch?v= in the video link.',
      validation: (r) => r.required().regex(/^[A-Za-z0-9_-]{11}$/, { name: 'video ID' }),
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      options: {
        list: [
          { title: 'Lewisville', value: 'lewisville' },
          { title: 'DCLM Headquarters', value: 'hq' },
        ],
        layout: 'radio',
      },
      initialValue: 'lewisville',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
  ],
  orderings: [{ title: 'Newest first', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] }],
  preview: { select: { title: 'title', subtitle: 'date' } },
})
