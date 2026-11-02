import type { NextConfig } from "next";

const IS_DEV = process.env.NODE_ENV === 'development'

const policy = (directives: string[]) => directives.filter(Boolean).join('; ')

/**
 * Site CSP (BUILD-PLAN 2.15 and 3.0 option b). Pages are cached and shared, so there is no
 * per-request nonce: scripts are limited to this origin plus inline scripts (Next.js's own
 * bootstrap and the consent-gated Google Analytics snippet). Frames: YouTube (nocookie) and
 * Google Maps only. Images go through /_next/image; sermon audio plays from cdn.sanity.io.
 */
const SITE_CSP = policy([
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com${IS_DEV ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' blob: data: https://www.google-analytics.com https://www.googletagmanager.com${IS_DEV ? ' http://localhost:*' : ''}`,
  "font-src 'self'",
  `connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com${IS_DEV ? ' http://localhost:* ws://localhost:*' : ''}`,
  'frame-src https://www.google.com https://www.youtube-nocookie.com',
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "media-src 'self' https://cdn.sanity.io",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
])

/** Relaxed CSP for the embedded Sanity Studio at /studio */
const STUDIO_CSP = policy([
  "default-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.sanity.io https://*.sanity.work https://*.sanity-cdn.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' blob: data: https://*.sanity.io https://cdn.sanity.io",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https://*.sanity.io https://*.sanity.work wss://*.sanity.work https://*.api.sanity.io",
  "frame-src 'self' https://*.sanity.io",
  "frame-ancestors 'self' https://*.sanity.io",
  "worker-src 'self' blob:",
  "child-src 'self' blob:",
])

const SHARED_HEADERS = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
]

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      // YouTube video thumbnails (sermons)
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/vi/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  compress: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        // Everything except the Studio
        source: '/((?!studio).*)',
        headers: [...SHARED_HEADERS, { key: 'Content-Security-Policy', value: SITE_CSP }, { key: 'X-Frame-Options', value: 'DENY' }],
      },
      {
        source: '/studio/:path*',
        headers: [...SHARED_HEADERS, { key: 'Content-Security-Policy', value: STUDIO_CSP }, { key: 'X-Frame-Options', value: 'SAMEORIGIN' }],
      },
      {
        source: '/studio',
        headers: [...SHARED_HEADERS, { key: 'Content-Security-Policy', value: STUDIO_CSP }, { key: 'X-Frame-Options', value: 'SAMEORIGIN' }],
      },
    ]
  },
  async redirects() {
    return [
      // The old leadership page; its content now lives on About (BUILD-PLAN 2.7)
      { source: '/ministers', destination: '/about#leadership', permanent: true },
    ]
  },
};

export default nextConfig;