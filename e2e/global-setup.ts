import { chromium, FullConfig } from '@playwright/test'

async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use

  // You can add global setup here, such as:
  // - Starting a database
  // - Seeding test data
  // - Setting up authentication tokens

  console.log(`Starting tests against ${baseURL}`)
}

export default globalSetup
