'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface VideoBackgroundProps {
  videoSrc?: string
  fallbackImage: string
  overlay?: boolean
  overlayOpacity?: number
  children?: React.ReactNode
  className?: string
}

export default function VideoBackground({
  videoSrc,
  fallbackImage,
  overlay = true,
  overlayOpacity = 0.5,
  children,
  className = '',
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [useVideo, setUseVideo] = useState(false)

  useEffect(() => {
    // Only use video on larger screens and when not on reduced motion
    const mediaQuery = window.matchMedia('(min-width: 1024px)')
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    setUseVideo(mediaQuery.matches && !prefersReducedMotion.matches && !!videoSrc)

    const handleResize = () => {
      setUseVideo(mediaQuery.matches && !prefersReducedMotion.matches && !!videoSrc)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [videoSrc])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background Image (always present as fallback) */}
      <div className="absolute inset-0 z-0">
        <Image
          src={fallbackImage}
          alt="Background"
          fill
          className="object-cover"
          quality={90}
          priority
          sizes="100vw"
        />
      </div>

      {/* Background Video (only on desktop, no reduced motion) */}
      {useVideo && videoSrc && (
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className={`w-full h-full object-cover transition-opacity duration-1000 ${
              isVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoadedData={() => setIsVideoLoaded(true)}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      )}

      {/* Overlay */}
      {overlay && (
        <div
          className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/50 to-black/70"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Content */}
      <div className="relative z-20">{children}</div>
    </div>
  )
}
