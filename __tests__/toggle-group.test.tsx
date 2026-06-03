import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

describe('ToggleGroup', () => {
  it('renders items', () => {
    render(
      <ToggleGroup type='single'>
        <ToggleGroupItem value='bold' aria-label='bold'>B</ToggleGroupItem>
        <ToggleGroupItem value='italic' aria-label='italic'>I</ToggleGroupItem>
      </ToggleGroup>
    )

    expect(screen.getByRole('button', { name: 'bold' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'italic' })).toBeInTheDocument()
  })

  it('fires onValueChange on item click in single mode', async () => {
    const user = userEvent.setup()
    const handleValueChange = vi.fn()
    render(
      <ToggleGroup type='single' onValueChange={handleValueChange}>
        <ToggleGroupItem value='bold' aria-label='bold'>B</ToggleGroupItem>
        <ToggleGroupItem value='italic' aria-label='italic'>I</ToggleGroupItem>
      </ToggleGroup>
    )

    await user.click(screen.getByRole('button', { name: 'bold' }))

    expect(handleValueChange).toHaveBeenCalled()
  })

  it('regression: type prop translates to Base UI multiple flag', () => {
    // Locks: elephant-ui's ToggleGroup wrapper translates Radix-style
    // type='single'|'multiple' to Base UI's `multiple` boolean. If this
    // shim is removed, consumers passing `type='multiple'` get a TS error
    // because Base UI doesn't have a `type` prop.
    const { container } = render(
      <ToggleGroup type='multiple'>
        <ToggleGroupItem value='bold' aria-label='bold'>B</ToggleGroupItem>
      </ToggleGroup>
    )

    // Base UI sets data-multiple on the group root when multiple is true.
    expect(container.querySelector('[data-multiple]')).not.toBeNull()
  })

  it('shares variant/size context with items', () => {
    render(
      <ToggleGroup type='single' variant='outline' size='sm'>
        <ToggleGroupItem value='bold' aria-label='bold'>B</ToggleGroupItem>
      </ToggleGroup>
    )

    const item = screen.getByRole('button', { name: 'bold' })
    // outline variant produces border class on items.
    expect(item).toHaveClass('border')
    // size=sm produces h-9 on items.
    expect(item).toHaveClass('h-9')
  })
})
