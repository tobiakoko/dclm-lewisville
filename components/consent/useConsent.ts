'use client'

import { useSyncExternalStore } from 'react'
import { readConsent, subscribeConsent, type ConsentChoice } from '@/lib/consent'

/** The stored choice; `undefined` during server rendering, `null` when not chosen yet */
export function useConsent(): ConsentChoice | null | undefined {
  return useSyncExternalStore(subscribeConsent, readConsent, () => undefined)
}
