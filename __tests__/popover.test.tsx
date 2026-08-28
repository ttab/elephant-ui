import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

function renderBasic(extraContentProps: Record<string, unknown> = {}) {
  return render(
    <Popover>
      <PopoverTrigger>open</PopoverTrigger>
      <PopoverContent {...extraContentProps}>
        <p>popover body</p>
      </PopoverContent>
    </Popover>
  )
}

describe('Popover', () => {
  describe('open/close', () => {
    it('opens on trigger click', async () => {
      const user = userEvent.setup()
      renderBasic()

      expect(screen.queryByText('popover body')).toBeNull()

      await user.click(screen.getByRole('button', { name: 'open' }))

      expect(screen.getByText('popover body')).toBeInTheDocument()
    })

    it('closes on Escape', async () => {
      const user = userEvent.setup()
      renderBasic()

      await user.click(screen.getByRole('button', { name: 'open' }))
      expect(screen.getByText('popover body')).toBeInTheDocument()

      await user.keyboard('{Escape}')

      await waitFor(() => {
        expect(screen.queryByText('popover body')).toBeNull()
      })
    })

    it('closes on outside click', async () => {
      const user = userEvent.setup()
      render(
        <div>
          <button type='button'>outside</button>
          <Popover>
            <PopoverTrigger>open</PopoverTrigger>
            <PopoverContent>
              <p>popover body</p>
            </PopoverContent>
          </Popover>
        </div>
      )

      await user.click(screen.getByRole('button', { name: 'open' }))
      expect(screen.getByText('popover body')).toBeInTheDocument()

      await user.click(screen.getByRole('button', { name: 'outside' }))

      await waitFor(() => {
        expect(screen.queryByText('popover body')).toBeNull()
      })
    })
  })

  describe('controlled state', () => {
    it('calls onOpenChange when trigger is activated', async () => {
      const user = userEvent.setup()
      const handleOpenChange = vi.fn()
      render(
        <Popover onOpenChange={handleOpenChange}>
          <PopoverTrigger>open</PopoverTrigger>
          <PopoverContent>body</PopoverContent>
        </Popover>
      )

      await user.click(screen.getByRole('button', { name: 'open' }))

      expect(handleOpenChange).toHaveBeenCalledWith(true, expect.anything())
    })
  })

  describe('regression: reopen after Escape', () => {
    // Locks: Popover must remount cleanly after Escape-close so consumers don't
    // hit aria-hidden / cleanup leaks that block subsequent opens.
    it('can be reopened after closing with Escape', async () => {
      const user = userEvent.setup()
      renderBasic()

      const trigger = screen.getByRole('button', { name: 'open' })
      await user.click(trigger)
      expect(screen.getByText('popover body')).toBeInTheDocument()

      await user.keyboard('{Escape}')
      await waitFor(() => {
        expect(screen.queryByText('popover body')).toBeNull()
      })

      await user.click(trigger)
      expect(await screen.findByText('popover body')).toBeInTheDocument()
    })
  })

  describe('regression: className routing to Positioner (#8)', () => {
    // Locks: PopoverContent className must reach the Positioner so consumer
    // overrides like `z-100` win against in-app stacking. The Popup is static
    // inside the Positioner; z-utilities on a static element have no effect.
    it('className lands on the Positioner element', async () => {
      const user = userEvent.setup()
      renderBasic({ className: 'unit-test-marker' })

      await user.click(screen.getByRole('button', { name: 'open' }))

      // Find the popup, then walk to its parent Positioner (the element Base UI
      // sets data-side / data-align on).
      const popup = await screen.findByText('popover body')
      // Popup is inside Positioner; Positioner carries data-side.
      const positioner = popup.closest('[data-side]')
      expect(positioner).not.toBeNull()
      expect(positioner?.className).toMatch(/unit-test-marker/)
    })
  })

  describe('regression: allowPropagationForKeys', () => {
    // Locks: consumer-supplied keys must propagate up from the popup so parent
    // listeners can react (e.g. Tab in a wrapping focus manager). Non-listed
    // keys remain stopped.
    it('lets listed keys bubble while stopping others', async () => {
      const user = userEvent.setup()
      const parentKeyDown = vi.fn()

      render(
        <div onKeyDown={parentKeyDown}>
          <Popover>
            <PopoverTrigger>open</PopoverTrigger>
            <PopoverContent allowPropagationForKeys={['Enter']}>
              <input type='text' aria-label='input' />
            </PopoverContent>
          </Popover>
        </div>
      )

      await user.click(screen.getByRole('button', { name: 'open' }))
      const input = await screen.findByLabelText('input')
      input.focus()

      await user.keyboard('{Enter}')
      const enterKeys = parentKeyDown.mock.calls.filter((args) => {
        const event = args[0] as React.KeyboardEvent
        return event.key === 'Enter'
      })
      expect(enterKeys.length).toBeGreaterThan(0)

      parentKeyDown.mockClear()
      await user.keyboard('a')
      const aKeys = parentKeyDown.mock.calls.filter((args) => {
        const event = args[0] as React.KeyboardEvent
        return event.key === 'a'
      })
      expect(aKeys.length).toBe(0)
    })
  })
})
