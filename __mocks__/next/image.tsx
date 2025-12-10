import * as React from 'react'

// Mock Next.js Image component for testing
const MockImage = ({
  src,
  alt,
  width,
  height,
  fill,
  className,
  priority,
  loading,
  quality,
  ...props
}: React.ComponentProps<'img'> & {
  src: string | { src: string }
  alt: string
  width?: number
  height?: number
  fill?: boolean
  priority?: boolean
  loading?: 'lazy' | 'eager'
  quality?: number
}) => {
  const imgSrc = typeof src === 'object' ? src.src : src

  return (
    <img
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      data-priority={priority}
      loading={loading}
      {...props}
    />
  )
}

MockImage.displayName = 'NextImage'

export default MockImage
