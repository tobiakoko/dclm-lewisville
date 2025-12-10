import { defineConfig } from 'sanity'
import { structure } from './structure'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

const isDevelopment = process.env.NODE_ENV === 'development'

export default defineConfig({
  name: 'dclm-lewisville',
  title: 'DCLM Lewisville',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [
    structureTool({ structure}),
    // Vision is a development tool - only enabled in development for security
    ...(isDevelopment ? [visionTool()] : []),
  ],

  schema: {
    types: schemaTypes,
  },
})