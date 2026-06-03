import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'

import { Checkbox } from '@/components/ui/checkbox'

describe('Checkbox', () => {
  it('renders unchecked by default', () => {
    render(<Checkbox aria-label='accept' />)
    const cb = screen.getByRole('checkbox', { name: 'accept' })
    expect(cb).toHaveAttribute('data-unchecked')
  })

  it('toggles checked state on click (uncontrolled)', async () => {
    const user = userEvent.setup()
    render(<Checkbox aria-label='accept' />)

    const cb = screen.getByRole('checkbox', { name: 'accept' })
    await user.click(cb)
    expect(cb).toHaveAttribute('data-checked')

    await user.click(cb)
    expect(cb).toHaveAttribute('data-unchecked')
  })

  it('controlled checked prop reflects state', () => {
    render(<Checkbox aria-label='accept' checked />)
    expect(screen.getByRole('checkbox', { name: 'accept' })).toHaveAttribute('data-checked')
  })

  it('fires onCheckedChange', async () => {
    const user = userEvent.setup()
    const handleCheckedChange = vi.fn()
    function Controlled() {
      const [checked, setChecked] = useState(false)
      return (
        <Checkbox
          aria-label='accept'
          checked={checked}
          onCheckedChange={(next) => {
            handleCheckedChange(next)
            setChecked(Boolean(next))
          }}
        />
      )
    }
    render(<Controlled />)

    await user.click(screen.getByRole('checkbox', { name: 'accept' }))

    expect(handleCheckedChange).toHaveBeenCalledWith(true)
  })

  it('disabled suppresses interaction', async () => {
    const user = userEvent.setup()
    const handleCheckedChange = vi.fn()
    render(
      <Checkbox aria-label='accept' disabled onCheckedChange={handleCheckedChange} />
    )

    await user.click(screen.getByRole('checkbox', { name: 'accept' }))

    expect(handleCheckedChange).not.toHaveBeenCalled()
  })

  it('indeterminate state is reflected via data-indeterminate', () => {
    render(<Checkbox aria-label='accept' indeterminate />)
    expect(screen.getByRole('checkbox', { name: 'accept' }))
      .toHaveAttribute('data-indeterminate')
  })
})
