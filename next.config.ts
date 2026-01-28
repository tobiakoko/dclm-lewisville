import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbopackUseSystemTlsCerts: true,
    optimizePackageImports: ['lucide-react', 'framer-motion', 'gsap'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  compress: true,
  poweredByHeader: false,
  async headers() {
    const isDev = process.env.NODE_ENV === 'development'

    // Relaxed CSP for Sanity Studio
    const studioCspHeader = `
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

    // Comprehensive Content Security Policy for main site
    const cspHeader = `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com ${isDev ? "'unsafe-eval'" : ''};
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      img-src 'self' blob: data: https://cdn.sanity.io https://images.unsplash.com https://lh3.googleusercontent.com ${isDev ? 'http://localhost:*' : ''};
      font-src 'self' https://fonts.gstatic.com;
      connect-src 'self' https://api.sanity.io https://*.sanity.io https://www.google-analytics.com ${isDev ? 'http://localhost:* ws://localhost:*' : ''};
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

    return [
      // Special CSP for Sanity Studio
      {
        source: '/studio/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: studioCspHeader,
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
      // Standard CSP for rest of the site
      {
        source: '/((?!studio).*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader,
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ]
  },
};

export default nextConfig;
