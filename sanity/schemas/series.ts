import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'series',
  title: 'Sermon Series',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Series Title',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Series Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})