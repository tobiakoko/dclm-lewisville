import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity/client'

export const dynamic = 'force-dynamic'

interface HealthCheckResult {
  status: 'healthy' | 'degraded' | 'unhealthy'
  timestamp: string
  uptime: number
  checks: {
    sanity: {
      status: 'ok' | 'error'
      responseTime?: number
      error?: string
    }
    environment: {
      status: 'ok' | 'error'
      variables: {
        resendApiKey: boolean
        sanityProjectId: boolean
        sanityDataset: boolean
      }
    }
  }
}

export async function GET() {
  const startTime = Date.now()
  const healthCheck: HealthCheckResult = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    checks: {
      sanity: {
        status: 'ok',
      },
      environment: {
        status: 'ok',
        variables: {
          resendApiKey: !!process.env.RESEND_API_KEY,
          sanityProjectId: !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
          sanityDataset: !!process.env.NEXT_PUBLIC_SANITY_DATASET,
        },
      },
    },
  }

  // Check Sanity connection
  try {
    const sanityStart = Date.now()
    await client.fetch('count(*[_type == "siteSettings"])')
    const sanityResponseTime = Date.now() - sanityStart

    healthCheck.checks.sanity = {
      status: 'ok',
      responseTime: sanityResponseTime,
    }
  } catch (error) {
    healthCheck.checks.sanity = {
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
    }
    healthCheck.status = 'degraded'
  }

  // Check environment variables
  if (!healthCheck.checks.environment.variables.resendApiKey) {
    healthCheck.status = 'degraded'
  }

  if (
    !healthCheck.checks.environment.variables.sanityProjectId ||
    !healthCheck.checks.environment.variables.sanityDataset
  ) {
    healthCheck.status = 'unhealthy'
  }

  const statusCode = healthCheck.status === 'healthy' ? 200 : healthCheck.status === 'degraded' ? 207 : 503

  return NextResponse.json(healthCheck, {
    status: statusCode,
    headers: {
      'Cache-Control': 'no-store, must-revalidate',
      'X-Response-Time': `${Date.now() - startTime}ms`,
    },
  })
}
