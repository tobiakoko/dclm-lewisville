import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ThemeProvider } from 'next-themes'

// Custom wrapper component that includes all providers
function AllTheProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      {children}
    </ThemeProvider>
  )
}

// Custom render function that includes providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => {
  return render(ui, { wrapper: AllTheProviders, ...options })
}

// Helper to render with custom wrapper
export const renderWithProviders = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => {
  return customRender(ui, options)
}

// Helper to render without providers (for simple unit tests)
export const renderWithoutProviders = (
  ui: ReactElement,
  options?: RenderOptions,
) => {
  return render(ui, options)
}

// Re-export everything from React Testing Library
export * from '@testing-library/react'

// Override render method with our custom one
export { customRender as render }

// Export user-event for convenience
export { default as userEvent } from '@testing-library/user-event'
