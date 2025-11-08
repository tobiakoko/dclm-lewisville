import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ctaFormSection',
  title: 'CTA Form Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'formType',
      title: 'Form Type',
      type: 'string',
      options: {
        list: [
          { title: 'Newsletter Signup', value: 'newsletter' },
          { title: 'Contact Form', value: 'contact' },
          { title: 'Prayer Request', value: 'prayer' },
          { title: 'Visitor Info', value: 'visitor' },
        ],
      },
      initialValue: 'newsletter',
    }),
    defineField({
      name: 'submitButtonText',
      title: 'Submit Button Text',
      type: 'string',
      initialValue: 'Submit',
    }),
    defineField({
      name: 'successMessage',
      title: 'Success Message',
      type: 'text',
      rows: 2,
      initialValue: 'Thank you! We will be in touch soon.',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      formType: 'formType',
    },
    prepare({ title, formType }) {
      return {
        title: `Form: ${title || 'Untitled'}`,
        subtitle: formType,
      }
    },
  },
})
