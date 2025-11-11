import { cn, formatDate, formatTime } from '@/lib/utils'

describe('Utils', () => {
  describe('cn', () => {
    it('should merge class names correctly', () => {
      expect(cn('foo', 'bar')).toBe('foo bar')
    })

    it('should handle conditional classes', () => {
      expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz')
    })

    it('should merge Tailwind classes correctly', () => {
      expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4')
    })

    it('should handle empty inputs', () => {
      expect(cn()).toBe('')
    })

    it('should handle undefined and null', () => {
      expect(cn('foo', undefined, null, 'bar')).toBe('foo bar')
    })

    it('should handle arrays', () => {
      expect(cn(['foo', 'bar'], 'baz')).toBe('foo bar baz')
    })

    it('should handle objects', () => {
      expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz')
    })
  })

  describe('formatDate', () => {
    it('should format string date correctly', () => {
      const date = '2024-01-15'
      const result = formatDate(date)
      expect(result).toBe('January 15, 2024')
    })

    it('should format Date object correctly', () => {
      const date = new Date('2024-06-20')
      const result = formatDate(date)
      expect(result).toBe('June 20, 2024')
    })

    it('should handle different months', () => {
      expect(formatDate('2024-12-25')).toBe('December 25, 2024')
      expect(formatDate('2024-03-01')).toBe('March 1, 2024')
    })

    it('should handle leap year dates', () => {
      expect(formatDate('2024-02-29')).toBe('February 29, 2024')
    })

    it('should handle ISO 8601 format', () => {
      const result = formatDate('2024-01-15T10:30:00Z')
      expect(result).toMatch(/January 1[45], 2024/)
    })
  })

  describe('formatTime', () => {
    it('should format string time correctly with AM', () => {
      const date = '2024-01-15T09:30:00'
      const result = formatTime(date)
      expect(result).toMatch(/9:30\s*AM/)
    })

    it('should format string time correctly with PM', () => {
      const date = '2024-01-15T15:45:00'
      const result = formatTime(date)
      expect(result).toMatch(/3:45\s*PM/)
    })

    it('should format Date object correctly', () => {
      const date = new Date('2024-01-15T14:20:00')
      const result = formatTime(date)
      expect(result).toMatch(/2:20\s*PM/)
    })

    it('should handle midnight correctly', () => {
      const date = '2024-01-15T00:00:00'
      const result = formatTime(date)
      expect(result).toMatch(/12:00\s*AM/)
    })

    it('should handle noon correctly', () => {
      const date = '2024-01-15T12:00:00'
      const result = formatTime(date)
      expect(result).toMatch(/12:00\s*PM/)
    })

    it('should pad minutes with zero', () => {
      const date = '2024-01-15T10:05:00'
      const result = formatTime(date)
      expect(result).toMatch(/10:05\s*AM/)
    })
  })
})
