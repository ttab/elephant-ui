import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Label } from '@/components/ui/label'

describe('Label', () => {
  it('renders a native label element', () => {
    render(<Label>Email</Label>)
    expect(screen.getByText('Email').tagName).toBe('LABEL')
  })

  it('forwards className', () => {
    render(<Label className='custom-class'>x</Label>)
    expect(screen.getByText('x')).toHaveClass('custom-class')
  })

  it('htmlFor associates the label with a control', async () => {
    const user = userEvent.setup()
    render(
      <div>
        <Label htmlFor='email-input'>Email</Label>
        <input id='email-input' type='email' />
      </div>
    )

    await user.click(screen.getByText('Email'))

    // Clicking the label focuses the associated input.
    expect(document.activeElement?.id).toBe('email-input')
  })

  it('applies default label class', () => {
    render(<Label>x</Label>)
    expect(screen.getByText('x')).toHaveClass('font-medium')
  })
})
