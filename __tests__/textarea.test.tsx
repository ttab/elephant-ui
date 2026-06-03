import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import { Textarea } from '@/components/ui/textarea'

describe('Textarea', () => {
  it('renders a native textarea', () => {
    render(<Textarea placeholder='msg' />)
    expect(screen.getByPlaceholderText('msg').tagName).toBe('TEXTAREA')
  })

  it('forwards className', () => {
    render(<Textarea placeholder='msg' className='custom-class' />)
    expect(screen.getByPlaceholderText('msg')).toHaveClass('custom-class')
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLTextAreaElement>()
    render(<Textarea ref={ref} placeholder='msg' />)
    expect(ref.current?.tagName).toBe('TEXTAREA')
  })

  it('captures user typing via onChange', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Textarea placeholder='msg' onChange={handleChange} />)

    await user.type(screen.getByPlaceholderText('msg'), 'hi')

    expect(handleChange).toHaveBeenCalled()
  })

  it('disabled attribute is respected', () => {
    render(<Textarea placeholder='msg' disabled />)
    expect(screen.getByPlaceholderText('msg')).toBeDisabled()
  })
})
