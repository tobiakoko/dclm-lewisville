import * as React from 'react'
import { render, screen } from '@/__tests__/utils/test-utils'
import { Textarea } from '@/components/ui/textarea'
import userEvent from '@testing-library/user-event'

describe('Textarea', () => {
  it('should render correctly', () => {
    render(<Textarea placeholder="Enter message" />)
    expect(screen.getByPlaceholderText('Enter message')).toBeInTheDocument()
  })

  it('should handle text input', async () => {
    const user = userEvent.setup()
    render(<Textarea placeholder="Type here" />)

    const textarea = screen.getByPlaceholderText('Type here')
    await user.type(textarea, 'Hello World')

    expect(textarea).toHaveValue('Hello World')
  })

  it('should handle onChange events', async () => {
    const user = userEvent.setup()
    const handleChange = jest.fn()

    render(<Textarea onChange={handleChange} placeholder="Type here" />)

    const textarea = screen.getByPlaceholderText('Type here')
    await user.type(textarea, 'test')

    expect(handleChange).toHaveBeenCalled()
  })

  it('should be disabled when disabled prop is true', () => {
    render(<Textarea disabled placeholder="Disabled" />)

    expect(screen.getByPlaceholderText('Disabled')).toBeDisabled()
  })

  it('should handle multiline text', async () => {
    const user = userEvent.setup()
    render(<Textarea placeholder="Multiline" />)

    const textarea = screen.getByPlaceholderText('Multiline')
    await user.type(textarea, 'Line 1{enter}Line 2{enter}Line 3')

    expect(textarea).toHaveValue('Line 1\nLine 2\nLine 3')
  })

  it('should apply custom className', () => {
    render(<Textarea className="custom-class" placeholder="Custom" />)
    const textarea = screen.getByPlaceholderText('Custom')

    expect(textarea).toHaveClass('custom-class')
  })

  it('should handle defaultValue', () => {
    render(<Textarea defaultValue="Initial value" />)
    expect(screen.getByDisplayValue('Initial value')).toBeInTheDocument()
  })

  it('should handle value prop (controlled)', async () => {
    const user = userEvent.setup()
    const TestComponent = () => {
      const [value, setValue] = React.useState('')

      return (
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Controlled"
        />
      )
    }

    render(<TestComponent />)
    const textarea = screen.getByPlaceholderText('Controlled')

    await user.type(textarea, 'controlled value')
    expect(textarea).toHaveValue('controlled value')
  })

  it('should respect rows attribute', () => {
    render(<Textarea rows={10} placeholder="Tall textarea" />)
    const textarea = screen.getByPlaceholderText('Tall textarea')

    expect(textarea).toHaveAttribute('rows', '10')
  })

  it('should respect maxLength attribute', async () => {
    const user = userEvent.setup()
    render(<Textarea maxLength={10} placeholder="Limited" />)
    const textarea = screen.getByPlaceholderText('Limited')

    await user.type(textarea, 'This is a very long text')

    expect((textarea as HTMLTextAreaElement).value.length).toBeLessThanOrEqual(10)
  })

  describe('accessibility', () => {
    it('should support aria-label', () => {
      render(<Textarea aria-label="Message input" />)
      expect(screen.getByLabelText('Message input')).toBeInTheDocument()
    })

    it('should support aria-invalid', () => {
      render(<Textarea aria-invalid="true" placeholder="Invalid" />)
      const textarea = screen.getByPlaceholderText('Invalid')
      expect(textarea).toHaveAttribute('aria-invalid', 'true')
    })

    it('should support required attribute', () => {
      render(<Textarea required placeholder="Required" />)
      expect(screen.getByPlaceholderText('Required')).toBeRequired()
    })
  })
})
