import { render, screen } from '@/__tests__/utils/test-utils'
import { Button } from '@/components/ui/button'
import userEvent from '@testing-library/user-event'

describe('Button', () => {
  it('renders a native button that responds to Enter, Space and clicks', async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Send</Button>)

    const button = screen.getByRole('button', { name: 'Send' })
    await user.click(button)
    expect(button).toHaveFocus()
    await user.keyboard('{Enter}')
    await user.keyboard(' ')
    expect(handleClick).toHaveBeenCalledTimes(3)
  })

  it('does nothing while disabled', async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()
    render(
      <Button disabled onClick={handleClick}>
        Send
      </Button>
    )
    await user.click(screen.getByRole('button'))
    expect(screen.getByRole('button')).toBeDisabled()
    expect(handleClick).not.toHaveBeenCalled()
  })

  it.each([
    ['primary', 'bg-heaven-600'],
    ['secondary', 'border-line-strong'],
    ['ghost', 'border-white/50'],
    ['light', 'bg-white'],
    ['link', 'underline'],
  ] as const)('applies the %s style from the design tokens', (variant, className) => {
    render(<Button variant={variant}>Label</Button>)
    expect(screen.getByRole('button')).toHaveClass(className)
  })

  it('defaults to a primary pill with a 52px tap target', () => {
    render(<Button>Plan your visit</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-heaven-600', 'rounded-pill', 'min-h-[52px]')
  })

  it('keeps a 44px tap target at the small size', () => {
    render(<Button size="sm">Give</Button>)
    expect(screen.getByRole('button')).toHaveClass('min-h-11')
  })

  it('renders its child as the element with asChild', () => {
    render(
      <Button asChild>
        <a href="/visit">Plan your visit</a>
      </Button>
    )
    const link = screen.getByRole('link', { name: 'Plan your visit' })
    expect(link).toHaveAttribute('href', '/visit')
    expect(link).toHaveClass('bg-heaven-600')
  })
})
