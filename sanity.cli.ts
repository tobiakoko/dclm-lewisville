/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from 'sanity/cli'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

export default defineCliConfig({
  api: { projectId, dataset },
  // `npm run typegen`: schema → sanity/schema.json → query result types
  typegen: {
    path: './{app,lib,components}/**/*.{ts,tsx}',
    schema: './sanity/schema.json',
    generates: './sanity/types.generated.ts',
  },
})
