import * as React from 'react'
import { render, screen } from '@/__tests__/utils/test-utils'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'

describe('Card Components', () => {
  describe('Card', () => {
    it('should render correctly', () => {
      render(<Card>Card Content</Card>)
      expect(screen.getByText('Card Content')).toBeInTheDocument()
    })

    it('should apply custom className', () => {
      render(<Card className="custom-card">Content</Card>)
      const card = screen.getByText('Content').parentElement

      expect(card).toHaveClass('custom-card')
    })
  })

  describe('CardHeader', () => {
    it('should render correctly', () => {
      render(<CardHeader>Header Content</CardHeader>)
      expect(screen.getByText('Header Content')).toBeInTheDocument()
    })

    it('should apply custom className', () => {
      render(<CardHeader className="custom-header">Header</CardHeader>)
      const header = screen.getByText('Header')

      expect(header).toHaveClass('custom-header')
    })
  })

  describe('CardTitle', () => {
    it('should render correctly', () => {
      render(<CardTitle>Title</CardTitle>)
      expect(screen.getByText('Title')).toBeInTheDocument()
    })

    it('should apply custom className', () => {
      render(<CardTitle className="custom-title">Title</CardTitle>)
      const title = screen.getByText('Title')

      expect(title).toHaveClass('custom-title')
    })
  })

  describe('CardDescription', () => {
    it('should render correctly', () => {
      render(<CardDescription>Description text</CardDescription>)
      expect(screen.getByText('Description text')).toBeInTheDocument()
    })

    it('should apply custom className', () => {
      render(<CardDescription className="custom-desc">Description</CardDescription>)
      const desc = screen.getByText('Description')

      expect(desc).toHaveClass('custom-desc')
    })
  })

  describe('CardContent', () => {
    it('should render correctly', () => {
      render(<CardContent>Content</CardContent>)
      expect(screen.getByText('Content')).toBeInTheDocument()
    })

    it('should apply custom className', () => {
      render(<CardContent className="custom-content">Content</CardContent>)
      const content = screen.getByText('Content')

      expect(content).toHaveClass('custom-content')
    })
  })

  describe('CardFooter', () => {
    it('should render correctly', () => {
      render(<CardFooter>Footer</CardFooter>)
      expect(screen.getByText('Footer')).toBeInTheDocument()
    })

    it('should apply custom className', () => {
      render(<CardFooter className="custom-footer">Footer</CardFooter>)
      const footer = screen.getByText('Footer')

      expect(footer).toHaveClass('custom-footer')
    })
  })

  describe('Complete Card', () => {
    it('should render all components together', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card description text</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is the card content</p>
          </CardContent>
          <CardFooter>
            <button>Action</button>
          </CardFooter>
        </Card>
      )

      expect(screen.getByText('Card Title')).toBeInTheDocument()
      expect(screen.getByText('Card description text')).toBeInTheDocument()
      expect(screen.getByText('This is the card content')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /action/i })).toBeInTheDocument()
    })
  })
})
