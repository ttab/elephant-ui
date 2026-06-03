import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'

import { Toaster } from '@/components/ui/sonner'

describe('Toaster (sonner)', () => {
  it('renders without throwing', () => {
    const { container } = render(<Toaster />)
    expect(container).toBeInTheDocument()
  })

  it('renders a sonner section element', () => {
    const { container } = render(<Toaster />)
    // Sonner mounts a section with aria-label="Notifications".
    const section = container.ownerDocument.querySelector('section[aria-label]')
    expect(section).not.toBeNull()
  })
})
