import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

describe('Alert', () => {
  it('renders with role=alert', () => {
    render(
      <Alert>
        <AlertTitle>heads up</AlertTitle>
        <AlertDescription>something happened</AlertDescription>
      </Alert>
    )

    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('renders title and description', () => {
    render(
      <Alert>
        <AlertTitle>heads up</AlertTitle>
        <AlertDescription>body text</AlertDescription>
      </Alert>
    )

    expect(screen.getByText('heads up').tagName).toBe('H5')
    expect(screen.getByText('body text')).toBeInTheDocument()
  })

  it('forwards className on root', () => {
    render(<Alert className='custom-class'>x</Alert>)
    expect(screen.getByRole('alert')).toHaveClass('custom-class')
  })

  it('applies variant=destructive class', () => {
    render(<Alert variant='destructive'>x</Alert>)
    expect(screen.getByRole('alert').className).toMatch(/destructive/)
  })

  it('applies default variant classes when no variant prop is passed', () => {
    render(<Alert>x</Alert>)
    const alert = screen.getByRole('alert')
    expect(alert).toHaveClass('bg-background', 'text-foreground')
    expect(alert.className).not.toMatch(/destructive/)
  })
})
