import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import { Button } from '@/components/ui/button'

describe('Button', () => {
  describe('native button activation', () => {
    it('fires onClick on mouse click', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>click me</Button>)

      await user.click(screen.getByRole('button', { name: 'click me' }))

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('fires onClick when focused and Enter is pressed', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>click me</Button>)

      const button = screen.getByRole('button', { name: 'click me' })
      button.focus()
      await user.keyboard('{Enter}')

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('fires onClick when focused and Space is pressed', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>click me</Button>)

      const button = screen.getByRole('button', { name: 'click me' })
      button.focus()
      await user.keyboard(' ')

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('disabled suppresses onClick', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(<Button onClick={handleClick} disabled>click me</Button>)

      await user.click(screen.getByRole('button', { name: 'click me' }))

      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('variant classes', () => {
    it('applies variant=default class', () => {
      render(<Button>default</Button>)
      expect(screen.getByRole('button')).toHaveClass('bg-primary')
    })

    it('applies variant=outline class', () => {
      render(<Button variant='outline'>outline</Button>)
      expect(screen.getByRole('button')).toHaveClass('border')
    })

    it('applies size=sm class', () => {
      render(<Button size='sm'>sm</Button>)
      expect(screen.getByRole('button')).toHaveClass('h-9')
    })
  })

  describe('regression: native render produces real <button>', () => {
    // Locks: useRender with defaultTagName: 'button' MUST produce a native <button>
    // so consumer keydown handlers see event.target as HTMLButtonElement, and so
    // native Enter/Space activation runs without Base UI's div-button emulation.
    it('default render produces a <button> element', () => {
      render(<Button>label</Button>)
      const el = screen.getByRole('button', { name: 'label' })
      expect(el.tagName).toBe('BUTTON')
    })
  })

  describe('regression: render prop substitution', () => {
    // Locks: Migration replaced `asChild` with the `render` prop. Passing an
    // anchor element must produce a real <a> (not a nested button) with merged
    // className. This is the post-migration replacement contract.
    it('render={<a/>} produces an anchor with merged className and no nested <button>', () => {
      render(
        <Button render={<a href='/x'>link</a>} className='custom-class'>
          link
        </Button>
      )
      const anchor = screen.getByRole('link', { name: 'link' })
      expect(anchor.tagName).toBe('A')
      expect(anchor).toHaveAttribute('href', '/x')
      expect(anchor.className).toMatch(/custom-class/)
      // No native <button> should exist when rendering as anchor.
      expect(screen.queryByRole('button')).toBeNull()
    })

    it('forwards ref to the rendered element regardless of render prop', () => {
      const ref = React.createRef<HTMLButtonElement>()
      const { rerender } = render(<Button ref={ref}>native</Button>)
      expect(ref.current?.tagName).toBe('BUTTON')

      const ref2 = React.createRef<HTMLButtonElement>()
      rerender(<Button ref={ref2} render={<a href='/x'>link</a>}>link</Button>)
      // ref points at the rendered element regardless of tag.
      expect(ref2.current?.tagName).toBe('A')
    })
  })

  describe('regression: anchor render + global Enter keydown preventDefault', () => {
    // Locks bug #7 from migration: useNavigationKeys (document-level keydown
    // listener in elephant-chrome) called preventDefault on Enter, which
    // suppressed native <button> Enter-activation. For anchors, Enter activation
    // is not native (anchors don't fire click on Enter), so a global handler
    // that preventDefaults Enter must NOT mistakenly fire the anchor's onClick.
    it('Enter on focused anchor does not synthesize a click via Button wrapper', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()

      // Install a document-level keydown listener that swallows Enter, mimicking
      // the consumer-side useNavigationKeys scenario.
      const swallow = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          e.preventDefault()
        }
      }
      document.addEventListener('keydown', swallow)

      try {
        render(
          <Button
            render={<a href='/x' onClick={handleClick}>link</a>}
          >
            link
          </Button>
        )

        const anchor = screen.getByRole('link', { name: 'link' })
        anchor.focus()
        await user.keyboard('{Enter}')

        // Anchors don't natively activate on Enter; with the global keydown
        // suppression in place, the Button wrapper must not synthesize a click.
        expect(handleClick).not.toHaveBeenCalled()
      } finally {
        document.removeEventListener('keydown', swallow)
      }
    })
  })
})
