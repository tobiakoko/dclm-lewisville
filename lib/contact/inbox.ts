/** The church's real inbox; only production may send form email here (CLAUDE.md rule 4) */
export const CHURCH_INBOX = 'info@deeperlifelewisville.org'

export type DeploymentEnv = 'production' | 'preview' | 'development'

/**
 * Vercel sets VERCEL_ENV. Anything that isn't a Vercel production deployment (local dev,
 * `next start` on a laptop, CI, previews) counts as non-production.
 */
export function deploymentEnv(vercelEnv: string | undefined): DeploymentEnv {
  return vercelEnv === 'production' || vercelEnv === 'preview' ? vercelEnv : 'development'
}

/** An error message when CONTACT_INBOX would email the church from outside production */
export function contactInboxProblem(inbox: string | undefined, env: DeploymentEnv): string | null {
  if (!inbox) return null
  if (env !== 'production' && inbox.trim().toLowerCase() === CHURCH_INBOX) {
    return `CONTACT_INBOX must not be ${CHURCH_INBOX} outside production (this is ${env}). Use a test inbox.`
  }
  return null
}
