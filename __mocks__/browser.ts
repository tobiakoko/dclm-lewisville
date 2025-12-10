import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

// Setup MSW worker for browser environment (development/debugging)
export const worker = setupWorker(...handlers)
