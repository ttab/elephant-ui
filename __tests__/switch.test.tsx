import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'

import { Switch } from '@/components/ui/switch'

describe('Switch', () => {
  it('renders unchecked by default', () => {
    render(<Switch aria-label='wifi' />)
    const sw = screen.getByRole('switch', { name: 'wifi' })
    expect(sw).toHaveAttribute('data-unchecked')
  })

  it('toggles checked state on click (uncontrolled)', async () => {
    const user = userEvent.setup()
    render(<Switch aria-label='wifi' />)

    const sw = screen.getByRole('switch', { name: 'wifi' })
    await user.click(sw)
    expect(sw).toHaveAttribute('data-checked')
  })

  it('controlled checked prop reflects in data-checked', () => {
    render(<Switch aria-label='wifi' checked />)
    expect(screen.getByRole('switch', { name: 'wifi' })).toHaveAttribute('data-checked')
  })

  it('fires onCheckedChange', async () => {
    const user = userEvent.setup()
    const handleCheckedChange = vi.fn()
    function Controlled() {
      const [checked, setChecked] = useState(false)
      return (
        <Switch
          aria-label='wifi'
          checked={checked}
          onCheckedChange={(next) => {
            handleCheckedChange(next)
            setChecked(next)
          }}
        />
      )
    }
    render(<Controlled />)

    await user.click(screen.getByRole('switch', { name: 'wifi' }))

    expect(handleCheckedChange).toHaveBeenCalledWith(true)
  })

  it('disabled suppresses interaction', async () => {
    const user = userEvent.setup()
    const handleCheckedChange = vi.fn()
    render(
      <Switch aria-label='wifi' disabled onCheckedChange={handleCheckedChange} />
    )

    await user.click(screen.getByRole('switch', { name: 'wifi' }))

    expect(handleCheckedChange).not.toHaveBeenCalled()
  })
})
