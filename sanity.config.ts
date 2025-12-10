'use client'

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schemaTypes} from './sanity/schemas'
import {structure} from './sanity/structure'

const isDevelopment = process.env.NODE_ENV === 'development'

export default defineConfig({
  name: 'default',
  title: 'DCLM Lewisville',
  basePath: '/studio',
  projectId,
  dataset,

  schema: {
    types: schemaTypes,
  },

  plugins: [
    structureTool({structure}),
    // Vision is a development tool for querying with GROQ from inside the Studio
    // Only enabled in development for security
    // https://www.sanity.io/docs/the-vision-plugin
    ...(isDevelopment ? [visionTool({defaultApiVersion: apiVersion})] : []),
  ],
})
