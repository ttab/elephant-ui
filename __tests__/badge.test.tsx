import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import { Badge } from '@/components/ui/badge'

describe('Badge', () => {
  it('renders content', () => {
    render(<Badge>new</Badge>)
    expect(screen.getByText('new')).toBeInTheDocument()
  })

  it('forwards className', () => {
    render(<Badge className='custom-class'>new</Badge>)
    expect(screen.getByText('new')).toHaveClass('custom-class')
  })

  it('applies a default variant class', () => {
    render(<Badge>new</Badge>)
    // Default variant produces a bg-primary class.
    expect(screen.getByText('new').className).toMatch(/bg-primary/)
  })

  it('applies variant=destructive class', () => {
    render(<Badge variant='destructive'>x</Badge>)
    expect(screen.getByText('x').className).toMatch(/destructive/)
  })

  it('passes through HTML attributes (data-*)', () => {
    render(<Badge data-testid='b'>x</Badge>)
    expect(screen.getByTestId('b')).toBeInTheDocument()
  })
})
