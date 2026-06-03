import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'

import { Separator } from '@/components/ui/separator'

describe('Separator', () => {
  it('renders a separator', () => {
    const { container } = render(<Separator />)
    expect(container.firstChild).not.toBeNull()
  })

  it('default orientation is horizontal', () => {
    const { container } = render(<Separator />)
    const sep = container.firstChild as HTMLElement
    expect(sep).toHaveAttribute('data-orientation', 'horizontal')
    expect(sep.className).toMatch(/h-px/)
    expect(sep.className).toMatch(/w-full/)
  })

  it('vertical orientation applies vertical classes', () => {
    const { container } = render(<Separator orientation='vertical' />)
    const sep = container.firstChild as HTMLElement
    expect(sep).toHaveAttribute('data-orientation', 'vertical')
    expect(sep.className).toMatch(/w-px/)
    expect(sep.className).toMatch(/h-full/)
  })

  it('forwards className', () => {
    const { container } = render(<Separator className='custom-class' />)
    expect((container.firstChild as HTMLElement).className).toMatch(/custom-class/)
  })

  it('decorative=false sets aria-orientation and role', () => {
    const { container } = render(<Separator decorative={false} orientation='vertical' />)
    const sep = container.firstChild as HTMLElement
    expect(sep).toHaveAttribute('role', 'separator')
    expect(sep).toHaveAttribute('aria-orientation', 'vertical')
  })
})
