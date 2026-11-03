import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"
import { contactInboxProblem, deploymentEnv } from "./contact/inbox"

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here.
   * This way you can ensure the app isn't built with invalid env vars.
   */
  server: {
    RESEND_API_KEY: z.string().optional(),
    /** Where form email goes. Production: info@deeperlifelewisville.org; anywhere else, a test inbox */
    CONTACT_INBOX: z.email().optional(),
    /** Sender on a domain verified in Resend, e.g. "Website <website@example.org>" */
    CONTACT_FROM: z.string().min(3).optional(),
    SANITY_API_TOKEN: z.string().optional(),
    SANITY_REVALIDATE_SECRET: z.string().min(16).optional(),
    UPSTASH_REDIS_REST_URL: z.string().url().optional(),
    UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    /** Set by Vercel: production, preview or development */
    VERCEL_ENV: z.enum(["production", "preview", "development"]).optional(),
  },

  /**
   * Specify your client-side environment variables schema here.
   * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
    NEXT_PUBLIC_SANITY_DATASET: z.string().min(1),
    NEXT_PUBLIC_SANITY_API_VERSION: z.string().default("2025-10-28"),
    NEXT_PUBLIC_SITE_URL: z.string().url().default("https://deeperlifelewisville.org"),
    NEXT_PUBLIC_GA_ID: z.string().optional(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    // Server
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    CONTACT_INBOX: process.env.CONTACT_INBOX,
    CONTACT_FROM: process.env.CONTACT_FROM,
    SANITY_API_TOKEN: process.env.SANITY_API_TOKEN,
    SANITY_REVALIDATE_SECRET: process.env.SANITY_REVALIDATE_SECRET,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_ENV: process.env.VERCEL_ENV,
    // Client
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined.
   * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
})

// Previews and local builds must never email the church (CLAUDE.md rule 4)
const inboxProblem = process.env.SKIP_ENV_VALIDATION
  ? null
  : contactInboxProblem(env.CONTACT_INBOX, deploymentEnv(env.VERCEL_ENV))
if (inboxProblem) throw new Error(`❌ Invalid environment variables: ${inboxProblem}`)

// The seed-content fallback is for CI and local test builds only; the live site must render an
// error rather than fallback content if Sanity fails (CLAUDE.md rule 5)
if (process.env.SANITY_DEV_FALLBACK === 'true' && env.VERCEL_ENV === 'production') {
  throw new Error('❌ Invalid environment variables: SANITY_DEV_FALLBACK must not be set in production.')
}
