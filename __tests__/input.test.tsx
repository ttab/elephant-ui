import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import { Input } from '@/components/ui/input'

describe('Input', () => {
  it('renders a native input', () => {
    render(<Input placeholder='email' />)
    expect(screen.getByPlaceholderText('email').tagName).toBe('INPUT')
  })

  it('forwards className', () => {
    render(<Input placeholder='email' className='custom-class' />)
    expect(screen.getByPlaceholderText('email')).toHaveClass('custom-class')
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<Input ref={ref} placeholder='email' />)
    expect(ref.current?.tagName).toBe('INPUT')
  })

  it('captures user typing via onChange', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Input placeholder='email' onChange={handleChange} />)

    await user.type(screen.getByPlaceholderText('email'), 'hi')

    expect(handleChange).toHaveBeenCalled()
  })

  it('type attribute passes through', () => {
    render(<Input type='password' placeholder='pw' />)
    expect(screen.getByPlaceholderText('pw')).toHaveAttribute('type', 'password')
  })

  it('disabled attribute is respected', () => {
    render(<Input placeholder='email' disabled />)
    expect(screen.getByPlaceholderText('email')).toBeDisabled()
  })
})
