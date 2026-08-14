import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const IS_DEV = process.env.NODE_ENV === 'development'

// Relaxed CSP for Sanity Studio
function studioCspHeader(): string {
  return `
    default-src 'self' 'unsafe-inline' 'unsafe-eval';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.sanity.io https://*.sanity.work https://*.sanity-cdn.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: https://*.sanity.io https://cdn.sanity.io;
    font-src 'self' 'unsafe-inline' data: https://fonts.gstatic.com;
    connect-src 'self' https://*.sanity.io https://*.sanity.work wss://*.sanity.work https://*.api.sanity.io;
    frame-src 'self' https://*.sanity.io;
    frame-ancestors 'self' https://*.sanity.io;
    worker-src 'self' blob:;
    child-src 'self' blob:;
  `.replace(/\s{2,}/g, ' ').trim()
}

// Strict nonce-based CSP for the main site
function siteCspHeader(nonce: string): string {
  return `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://www.googletagmanager.com https://www.google-analytics.com ${IS_DEV ? "'unsafe-eval'" : ''};
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: https://cdn.sanity.io https://images.unsplash.com https://lh3.googleusercontent.com ${IS_DEV ? 'http://localhost:*' : ''};
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://api.sanity.io https://*.sanity.io https://www.google-analytics.com ${IS_DEV ? 'http://localhost:* ws://localhost:*' : ''};
    frame-src 'self' https://www.google.com https://maps.google.com https://www.youtube.com;
    frame-ancestors 'none';
    base-uri 'self';
    form-action 'self';
    object-src 'none';
    media-src 'self' https://cdn.sanity.io;
    worker-src 'self' blob:;
    child-src blob:;
    manifest-src 'self';
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim()
}

export function proxy(request: NextRequest) {
  const nonce = crypto.randomBytes(16).toString('base64')
  const isStudio = request.nextUrl.pathname.startsWith('/studio')
  const cspHeader = isStudio ? studioCspHeader() : siteCspHeader(nonce)

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set('Content-Security-Policy', cspHeader)

  const response = NextResponse.next({ request: { headers: requestHeaders } })

  response.headers.set('Content-Security-Policy', cspHeader)
  response.headers.set('X-Frame-Options', isStudio ? 'SAMEORIGIN' : 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')

  return response
}

export const config = {
  matcher: [
    {
      source:
        '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|.*\\.(?:png|jpg|jpeg|svg|webp|ico|avif|mp3|pdf|txt|woff2?)$).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}