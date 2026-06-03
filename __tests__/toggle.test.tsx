import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'

import { Toggle } from '@/components/ui/toggle'

describe('Toggle', () => {
  it('renders an unpressed toggle by default', () => {
    render(<Toggle>bold</Toggle>)
    const toggle = screen.getByRole('button', { name: 'bold' })
    expect(toggle).not.toHaveAttribute('data-pressed')
  })

  it('toggles pressed state on click', async () => {
    const user = userEvent.setup()
    function Controlled() {
      const [pressed, setPressed] = useState(false)
      return <Toggle pressed={pressed} onPressedChange={setPressed}>bold</Toggle>
    }
    render(<Controlled />)

    const toggle = screen.getByRole('button', { name: 'bold' })
    expect(toggle).not.toHaveAttribute('data-pressed')

    await user.click(toggle)
    expect(toggle).toHaveAttribute('data-pressed')

    await user.click(toggle)
    expect(toggle).not.toHaveAttribute('data-pressed')
  })

  it('fires onPressedChange callback', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Toggle onPressedChange={handleChange}>bold</Toggle>)

    await user.click(screen.getByRole('button', { name: 'bold' }))

    expect(handleChange).toHaveBeenCalledWith(true, expect.anything())
  })

  it('disabled suppresses interaction', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Toggle disabled onPressedChange={handleChange}>bold</Toggle>)

    await user.click(screen.getByRole('button', { name: 'bold' }))

    expect(handleChange).not.toHaveBeenCalled()
  })

  it('applies variant=outline class', () => {
    render(<Toggle variant='outline'>bold</Toggle>)
    expect(screen.getByRole('button')).toHaveClass('border')
  })
})
