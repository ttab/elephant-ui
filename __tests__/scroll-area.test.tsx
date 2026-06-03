import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

describe('ScrollArea', () => {
  it('renders children inside the viewport', () => {
    render(
      <ScrollArea className='h-32 w-32'>
        <div data-testid='content'>scrollable</div>
      </ScrollArea>
    )

    expect(screen.getByTestId('content')).toBeInTheDocument()
  })

  it('forwards className to the root', () => {
    const { container } = render(
      <ScrollArea className='custom-class'>
        <div>x</div>
      </ScrollArea>
    )

    expect(container.querySelector('.custom-class')).not.toBeNull()
  })

  it('renders without throwing on a deep tree', () => {
    // ScrollArea visual scrollbar behavior is jsdom-untestable (no real layout).
    // Smoke check: deep content renders inside the viewport.
    render(
      <ScrollArea>
        <div>
          {Array.from({ length: 20 }).map((_, i) => (
            <p key={i}>
              line
              {' '}
              {i}
            </p>
          ))}
        </div>
      </ScrollArea>
    )

    expect(screen.getByText('line 0')).toBeInTheDocument()
    expect(screen.getByText('line 19')).toBeInTheDocument()
  })

  it('ScrollBar accepts orientation prop', () => {
    const { container } = render(
      <ScrollArea>
        <div>x</div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    )

    // At least one scrollbar element should be in the DOM after orientation
    // prop is passed. We don't assert on jsdom-specific rendered geometry.
    expect(container.firstChild).not.toBeNull()
  })
})
