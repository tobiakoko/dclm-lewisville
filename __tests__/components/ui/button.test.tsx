import { render, screen } from '@/__tests__/utils/test-utils'
import { Button } from '@/components/ui/button'
import userEvent from '@testing-library/user-event'

describe('Button', () => {
  it('should render correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('should handle click events', async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()

    render(<Button onClick={handleClick}>Click me</Button>)

    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>)

    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('should not call onClick when disabled', async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()

    render(<Button disabled onClick={handleClick}>Click me</Button>)

    await user.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  describe('variants', () => {
    it('should apply default variant by default', () => {
      render(<Button>Default</Button>)
      const button = screen.getByRole('button')

      expect(button).toHaveClass('bg-primary')
    })

    it('should apply accent variant', () => {
      render(<Button variant="accent">Accent</Button>)
      const button = screen.getByRole('button')

      expect(button).toHaveClass('bg-accent')
    })

    it('should apply destructive variant', () => {
      render(<Button variant="destructive">Delete</Button>)
      const button = screen.getByRole('button')

      expect(button).toHaveClass('bg-destructive')
    })

    it('should apply outline variant', () => {
      render(<Button variant="outline">Outline</Button>)
      const button = screen.getByRole('button')

      expect(button).toHaveClass('border-2')
    })

    it('should apply secondary variant', () => {
      render(<Button variant="secondary">Secondary</Button>)
      const button = screen.getByRole('button')

      expect(button).toHaveClass('bg-muted')
    })

    it('should apply ghost variant', () => {
      render(<Button variant="ghost">Ghost</Button>)
      const button = screen.getByRole('button')

      expect(button).toHaveClass('hover:bg-muted')
    })

    it('should apply link variant', () => {
      render(<Button variant="link">Link</Button>)
      const button = screen.getByRole('button')

      expect(button).toHaveClass('underline-offset-4')
    })
  })

  describe('sizes', () => {
    it('should apply default size by default', () => {
      render(<Button>Default Size</Button>)
      const button = screen.getByRole('button')

      expect(button).toHaveClass('h-12')
    })

    it('should apply small size', () => {
      render(<Button size="sm">Small</Button>)
      const button = screen.getByRole('button')

      expect(button).toHaveClass('h-10')
    })

    it('should apply large size', () => {
      render(<Button size="lg">Large</Button>)
      const button = screen.getByRole('button')

      expect(button).toHaveClass('h-14')
    })

    it('should apply icon size', () => {
      render(<Button size="icon">🔍</Button>)
      const button = screen.getByRole('button')

      expect(button).toHaveClass('size-12')
    })
  })

  describe('custom className', () => {
    it('should merge custom className with base classes', () => {
      render(<Button className="custom-class">Custom</Button>)
      const button = screen.getByRole('button')

      expect(button).toHaveClass('custom-class')
      expect(button).toHaveClass('inline-flex')
    })
  })

  describe('asChild prop', () => {
    it('should render as child when asChild is true', () => {
      render(
        <Button asChild>
          <a href="/test">Link Button</a>
        </Button>
      )

      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '/test')
    })
  })

  describe('accessibility', () => {
    it('should have proper button role', () => {
      render(<Button>Accessible Button</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should support aria-label', () => {
      render(<Button aria-label="Close dialog">×</Button>)
      expect(screen.getByRole('button', { name: /close dialog/i })).toBeInTheDocument()
    })

    it('should support aria-disabled', () => {
      render(<Button aria-disabled="true">Disabled</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-disabled', 'true')
    })
  })
})
