const ID = /^[A-Za-z0-9_-]{11}$/

/** The 11-character video ID from a youtube.com or youtu.be URL, or null */
export function youTubeId(url: string | null | undefined): string | null {
  if (!url) return null
  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    return null
  }
  const host = parsed.hostname.replace(/^www\.|^m\./, '')
  let candidate: string | null = null
  if (host === 'youtu.be') candidate = parsed.pathname.slice(1).split('/')[0]
  else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
    if (parsed.pathname === '/watch') candidate = parsed.searchParams.get('v')
    else {
      const match = /^\/(?:embed|live|shorts)\/([^/]+)/.exec(parsed.pathname)
      candidate = match ? match[1] : null
    }
  }
  return candidate && ID.test(candidate) ? candidate : null
}

/** Privacy-enhanced embed URL (no cookies until the viewer plays the video) */
export function youTubeEmbedUrl(id: string): string {
  return `https://www.youtube-nocookie.com/embed/${id}`
}
