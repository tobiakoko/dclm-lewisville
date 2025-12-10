import * as React from 'react'
import { render, screen } from '@/__tests__/utils/test-utils'
import { Badge } from '@/components/ui/badge'

describe('Badge', () => {
  it('should render correctly', () => {
    render(<Badge>Test Badge</Badge>)
    expect(screen.getByText('Test Badge')).toBeInTheDocument()
  })

  it('should apply default variant', () => {
    render(<Badge>Default</Badge>)
    const badge = screen.getByText('Default')

    expect(badge).toHaveClass('bg-primary')
  })

  it('should apply secondary variant', () => {
    render(<Badge variant="secondary">Secondary</Badge>)
    const badge = screen.getByText('Secondary')

    expect(badge).toHaveClass('bg-muted')
  })

  it('should apply destructive variant', () => {
    render(<Badge variant="destructive">Destructive</Badge>)
    const badge = screen.getByText('Destructive')

    expect(badge).toHaveClass('bg-destructive')
  })

  it('should apply outline variant', () => {
    render(<Badge variant="outline">Outline</Badge>)
    const badge = screen.getByText('Outline')

    expect(badge).toHaveClass('border')
  })

  it('should apply custom className', () => {
    render(<Badge className="custom-class">Custom</Badge>)
    const badge = screen.getByText('Custom')

    expect(badge).toHaveClass('custom-class')
    expect(badge).toHaveClass('inline-flex')
  })

  it('should render with different content types', () => {
    const { rerender } = render(<Badge>Text</Badge>)
    expect(screen.getByText('Text')).toBeInTheDocument()

    rerender(<Badge>{123}</Badge>)
    expect(screen.getByText('123')).toBeInTheDocument()

    rerender(<Badge><span>Nested</span></Badge>)
    expect(screen.getByText('Nested')).toBeInTheDocument()
  })

  it('should support onClick handler', async () => {
    const handleClick = jest.fn()
    render(<Badge onClick={handleClick}>Clickable</Badge>)

    const badge = screen.getByText('Clickable')
    await badge.click()

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
