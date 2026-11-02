// The visitor's analytics-cookie choice, kept in this browser only.
export type ConsentChoice = 'granted' | 'denied'

export const CONSENT_STORAGE_KEY = 'analytics-consent'
const CHANGE_EVENT = 'analytics-consent-change'

/** null when the visitor hasn't chosen (or storage is unavailable) */
export function readConsent(): ConsentChoice | null {
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    return value === 'granted' || value === 'denied' ? value : null
  } catch {
    return null
  }
}

/** Saves a choice, or clears it (null) so the banner asks again */
export function writeConsent(choice: ConsentChoice | null): void {
  try {
    if (choice) window.localStorage.setItem(CONSENT_STORAGE_KEY, choice)
    else window.localStorage.removeItem(CONSENT_STORAGE_KEY)
  } catch {
    // Storage blocked: the choice lasts for this page view only
  }
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

export function subscribeConsent(onChange: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, onChange)
  window.addEventListener('storage', onChange)
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange)
    window.removeEventListener('storage', onChange)
  }
}

/**
 * The Google Analytics measurement ID, only in production and only when it looks real
 * (BUILD-PLAN 2.16). null means analytics is off and no consent banner is shown.
 */
export function gaMeasurementId(
  // Named directly so Next.js inlines the build-time value (it can't inline `process.env` as a whole)
  env: { NODE_ENV?: string; NEXT_PUBLIC_GA_ID?: string } = {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  }
): string | null {
  const id = env.NEXT_PUBLIC_GA_ID ?? ''
  return env.NODE_ENV === 'production' && /^G-[A-Z0-9]{6,}$/.test(id) ? id : null
}
