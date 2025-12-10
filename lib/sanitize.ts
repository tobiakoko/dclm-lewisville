/**
 * Sanitizes HTML content to prevent XSS attacks
 * @param html - The HTML string to sanitize
 * @param allowedTags - Optional array of allowed HTML tags (default: basic formatting tags)
 * @returns Sanitized HTML string safe for rendering
 */
export async function sanitizeHtml(
  html: string,
  allowedTags?: string[]
): Promise<string> {
  // Dynamic import to avoid loading DOMPurify during build
  const DOMPurify = (await import('isomorphic-dompurify')).default
  const defaultAllowedTags = ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a']

  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: allowedTags || defaultAllowedTags,
    ALLOWED_ATTR: ['href', 'target', 'rel'],
    ALLOW_DATA_ATTR: false,
  })
}

/**
 * Escapes HTML special characters to prevent XSS
 * Use this for plain text that should be displayed as-is
 * @param text - The text to escape
 * @returns Escaped string safe for HTML context
 */
export function escapeHtml(text: string): string {
  const htmlEscapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  }

  return text.replace(/[&<>"'/]/g, (char) => htmlEscapeMap[char] || char)
}

/**
 * Strips all HTML tags from a string
 * @param html - The HTML string to strip
 * @returns Plain text with no HTML tags
 */
export async function stripHtml(html: string): Promise<string> {
  // Dynamic import to avoid loading DOMPurify during build
  const DOMPurify = (await import('isomorphic-dompurify')).default
  return DOMPurify.sanitize(html, { ALLOWED_TAGS: [] })
}
