import { render, screen } from '@/__tests__/utils/test-utils'
import { Input } from '@/components/ui/input'
import userEvent from '@testing-library/user-event'

describe('Input', () => {
  it('should render correctly', () => {
    render(<Input placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('should handle text input', async () => {
    const user = userEvent.setup()
    render(<Input placeholder="Type here" />)

    const input = screen.getByPlaceholderText('Type here')
    await user.type(input, 'Hello World')

    expect(input).toHaveValue('Hello World')
  })

  it('should handle onChange events', async () => {
    const user = userEvent.setup()
    const handleChange = jest.fn()

    render(<Input onChange={handleChange} placeholder="Type here" />)

    const input = screen.getByPlaceholderText('Type here')
    await user.type(input, 'test')

    expect(handleChange).toHaveBeenCalled()
  })

  it('should be disabled when disabled prop is true', () => {
    render(<Input disabled placeholder="Disabled" />)

    expect(screen.getByPlaceholderText('Disabled')).toBeDisabled()
  })

  it('should handle different input types', () => {
    const { rerender } = render(<Input type="text" placeholder="Text" />)
    expect(screen.getByPlaceholderText('Text')).toHaveAttribute('type', 'text')

    rerender(<Input type="email" placeholder="Email" />)
    expect(screen.getByPlaceholderText('Email')).toHaveAttribute('type', 'email')

    rerender(<Input type="password" placeholder="Password" />)
    expect(screen.getByPlaceholderText('Password')).toHaveAttribute('type', 'password')

    rerender(<Input type="number" placeholder="Number" />)
    expect(screen.getByPlaceholderText('Number')).toHaveAttribute('type', 'number')
  })

  it('should apply custom className', () => {
    render(<Input className="custom-class" placeholder="Custom" />)
    const input = screen.getByPlaceholderText('Custom')

    expect(input).toHaveClass('custom-class')
    expect(input).toHaveClass('rounded-md')
  })

  it('should handle defaultValue', () => {
    render(<Input defaultValue="Initial value" />)
    expect(screen.getByDisplayValue('Initial value')).toBeInTheDocument()
  })

  it('should handle value prop (controlled)', async () => {
    const user = userEvent.setup()
    const TestComponent = () => {
      const [value, setValue] = React.useState('')

      return (
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Controlled"
        />
      )
    }

    render(<TestComponent />)
    const input = screen.getByPlaceholderText('Controlled')

    await user.type(input, 'controlled value')
    expect(input).toHaveValue('controlled value')
  })

  describe('accessibility', () => {
    it('should support aria-label', () => {
      render(<Input aria-label="Username input" />)
      expect(screen.getByLabelText('Username input')).toBeInTheDocument()
    })

    it('should support aria-invalid', () => {
      render(<Input aria-invalid="true" placeholder="Invalid" />)
      const input = screen.getByPlaceholderText('Invalid')
      expect(input).toHaveAttribute('aria-invalid', 'true')
    })

    it('should support aria-describedby', () => {
      render(
        <>
          <Input aria-describedby="error-message" placeholder="Input" />
          <div id="error-message">Error message</div>
        </>
      )
      const input = screen.getByPlaceholderText('Input')
      expect(input).toHaveAttribute('aria-describedby', 'error-message')
    })

    it('should support required attribute', () => {
      render(<Input required placeholder="Required" />)
      expect(screen.getByPlaceholderText('Required')).toBeRequired()
    })
  })

  describe('form integration', () => {
    it('should work within a form', async () => {
      const user = userEvent.setup()
      const handleSubmit = jest.fn((e) => e.preventDefault())

      render(
        <form onSubmit={handleSubmit}>
          <Input name="username" placeholder="Username" />
          <button type="submit">Submit</button>
        </form>
      )

      const input = screen.getByPlaceholderText('Username')
      await user.type(input, 'testuser')
      await user.click(screen.getByRole('button', { name: /submit/i }))

      expect(handleSubmit).toHaveBeenCalled()
    })
  })
})

// Import React for controlled component test
import * as React from 'react'
