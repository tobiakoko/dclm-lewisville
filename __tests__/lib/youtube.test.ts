import { youTubeEmbedUrl, youTubeId } from '@/lib/youtube'

describe('youTubeId', () => {
  it.each([
    ['https://www.youtube.com/watch?v=abcdefghijk', 'abcdefghijk'],
    ['https://youtube.com/watch?v=abcdefghijk&t=30s', 'abcdefghijk'],
    ['https://youtu.be/abcdefghijk?si=x', 'abcdefghijk'],
    ['https://www.youtube.com/embed/abcdefghijk', 'abcdefghijk'],
    ['https://www.youtube.com/live/abcdefghijk', 'abcdefghijk'],
    ['https://m.youtube.com/watch?v=abc_def-123', 'abc_def-123'],
  ])('reads %s', (url, id) => {
    expect(youTubeId(url)).toBe(id)
  })

  it.each([undefined, null, '', 'not a url', 'https://vimeo.com/123', 'https://www.youtube.com/watch?v=short', 'https://evil.example/watch?v=abcdefghijk'])(
    'returns null for %p',
    (url) => {
      expect(youTubeId(url)).toBeNull()
    }
  )

  it('embeds through the privacy-enhanced domain', () => {
    expect(youTubeEmbedUrl('abcdefghijk')).toBe('https://www.youtube-nocookie.com/embed/abcdefghijk')
  })
})
