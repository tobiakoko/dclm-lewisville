import { CHURCH_INBOX, contactInboxProblem, deploymentEnv } from '@/lib/contact/inbox'
import { SITE_CONFIG } from '@/lib/constants'

describe('contact inbox rules', () => {
  it('guards the same address the site publishes', () => {
    expect(CHURCH_INBOX).toBe(SITE_CONFIG.email)
  })

  it('treats only a Vercel production deployment as production', () => {
    expect(deploymentEnv('production')).toBe('production')
    expect(deploymentEnv('preview')).toBe('preview')
    expect(deploymentEnv(undefined)).toBe('development')
    expect(deploymentEnv('development')).toBe('development')
  })

  it.each(['preview', 'development'] as const)('rejects the church inbox in %s', (env) => {
    expect(contactInboxProblem(CHURCH_INBOX, env)).toMatch(/must not be/)
    expect(contactInboxProblem(` ${CHURCH_INBOX.toUpperCase()} `, env)).toMatch(/must not be/)
  })

  it('allows the church inbox in production and a test inbox anywhere', () => {
    expect(contactInboxProblem(CHURCH_INBOX, 'production')).toBeNull()
    expect(contactInboxProblem('tester@example.com', 'preview')).toBeNull()
    expect(contactInboxProblem(undefined, 'development')).toBeNull()
  })
})
