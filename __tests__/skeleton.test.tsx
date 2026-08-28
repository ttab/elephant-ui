import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'

import { Skeleton } from '@/components/ui/skeleton'

describe('Skeleton', () => {
  it('renders an element', () => {
    const { container } = render(<Skeleton />)
    expect(container.firstChild).not.toBeNull()
  })

  it('forwards className', () => {
    const { container } = render(<Skeleton className='h-8 w-8' />)
    const el = container.firstChild as HTMLElement
    expect(el).toHaveClass('h-8')
    expect(el).toHaveClass('w-8')
  })

  it('applies animation class by default', () => {
    const { container } = render(<Skeleton />)
    const el = container.firstChild as HTMLElement
    // shadcn skeleton uses `animate-pulse` for the loading shimmer.
    expect(el.className).toMatch(/animate-pulse/)
  })
})
