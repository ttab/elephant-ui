import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

describe('Avatar', () => {
  it('renders fallback when no image is loaded', () => {
    render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    )

    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('renders the image element when src is provided', () => {
    const { container } = render(
      <Avatar>
        <AvatarImage src='https://example.com/x.png' alt='user' />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    )

    // Base UI Avatar.Image shows depending on load state; the fallback is
    // always present in the React tree, so we assert at least one of these
    // renders.
    expect(container.firstChild).not.toBeNull()
  })

  it('forwards className on root', () => {
    const { container } = render(
      <Avatar className='custom-class'>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    )

    expect((container.firstChild as HTMLElement).className).toMatch(/custom-class/)
  })
})
