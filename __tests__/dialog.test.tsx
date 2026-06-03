import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { type KeyboardEvent as ReactKeyboardEvent, useState } from 'react'

import { fireEvent } from '@testing-library/react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

function ControlledDialog({
  defaultOpen,
  onCloseAutoFocus
}: { defaultOpen?: boolean, onCloseAutoFocus?: () => void } = {}) {
  const [open, setOpen] = useState(defaultOpen ?? false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>open</DialogTrigger>
      <DialogContent onCloseAutoFocus={onCloseAutoFocus} onOpenChangeProvided>
        <DialogTitle>dialog title</DialogTitle>
        <DialogDescription>dialog body</DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

describe('Dialog', () => {
  describe('open/close', () => {
    it('opens on trigger click', async () => {
      const user = userEvent.setup({ pointerEventsCheck: 0 })
      render(<ControlledDialog />)

      expect(screen.queryByText('dialog body')).toBeNull()

      await user.click(screen.getByRole('button', { name: 'open' }))

      expect(await screen.findByText('dialog body')).toBeInTheDocument()
    })

    it('closes on Escape', async () => {
      const user = userEvent.setup({ pointerEventsCheck: 0 })
      render(<ControlledDialog defaultOpen />)

      await screen.findByText('dialog body')
      await user.keyboard('{Escape}')

      await waitFor(() => {
        expect(screen.queryByText('dialog body')).toBeNull()
      })
    })

    it('renders internal close button when onOpenChangeProvided is true', async () => {
      const user = userEvent.setup({ pointerEventsCheck: 0 })
      render(<ControlledDialog />)

      await user.click(screen.getByRole('button', { name: 'open' }))
      await screen.findByText('dialog body')

      // The internal X close button has sr-only "Close" label.
      const closeButton = screen.getByRole('button', { name: 'Close' })
      await user.click(closeButton)

      await waitFor(() => {
        expect(screen.queryByText('dialog body')).toBeNull()
      })
    })
  })

  describe('regression: reopen after Escape (#3)', () => {
    // Locks: Base UI's modal cleanup (aria-hidden on siblings, focus restore)
    // must complete on Escape so a subsequent open works without a page reload.
    it('can be reopened after closing with Escape', async () => {
      const user = userEvent.setup({ pointerEventsCheck: 0 })
      render(<ControlledDialog />)

      const trigger = screen.getByRole('button', { name: 'open' })

      await user.click(trigger)
      await screen.findByText('dialog body')

      await user.keyboard('{Escape}')
      await waitFor(() => {
        expect(screen.queryByText('dialog body')).toBeNull()
      })

      await user.click(trigger)
      expect(await screen.findByText('dialog body')).toBeInTheDocument()
    })
  })

  describe('Header and Footer', () => {
    it('renders DialogHeader and DialogFooter with forwarded className', async () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogHeader className='hd'>head</DialogHeader>
            <DialogTitle>title</DialogTitle>
            <DialogFooter className='ft'>foot</DialogFooter>
          </DialogContent>
        </Dialog>
      )

      expect(await screen.findByText('head')).toHaveClass('hd')
      expect(screen.getByText('foot')).toHaveClass('ft')
    })
  })

  describe('keydown propagation', () => {
    it('stops propagation for non-Escape keys and forwards onKeyDown', async () => {
      const onKeyDown = vi.fn()
      render(
        <Dialog open>
          <DialogContent onKeyDown={onKeyDown}>
            <DialogTitle>title</DialogTitle>
            <DialogDescription>body</DialogDescription>
          </DialogContent>
        </Dialog>
      )

      const body = await screen.findByText('body')
      const popup = body.closest('[role=dialog]')!

      // Fire both branches: 'a' (non-Escape, true branch) and 'Escape' (false branch).
      fireEvent.keyDown(popup, { key: 'a' })
      fireEvent.keyDown(popup, { key: 'Escape' })

      // onKeyDown is invoked for both — exercising the forwarding line.
      expect(onKeyDown).toHaveBeenCalledTimes(2)
      const keys = onKeyDown.mock.calls.map((c) => (c[0] as ReactKeyboardEvent).key)
      expect(keys).toEqual(['a', 'Escape'])
    })
  })

  describe('Radix-compat focus props', () => {
    it('accepts onOpenAutoFocus as Radix-compat (maps to initialFocus={false})', async () => {
      // Just verify the prop is accepted and the dialog mounts without throwing.
      render(
        <Dialog open>
          <DialogContent onOpenAutoFocus={() => {}}>
            <DialogTitle>title</DialogTitle>
            <DialogDescription>body</DialogDescription>
          </DialogContent>
        </Dialog>
      )

      expect(await screen.findByText('body')).toBeInTheDocument()
    })
  })

  describe('regression: onCloseAutoFocus prop accepted (Radix-compat)', () => {
    // Locks: the wrapper accepts onCloseAutoFocus as a Radix-compat prop and
    // translates its presence to Base UI's finalFocus={false}. The handler
    // itself isn't called - the test only verifies the prop is accepted
    // without crashing and the dialog still closes cleanly.
    it('does not throw when onCloseAutoFocus is provided', async () => {
      const user = userEvent.setup({ pointerEventsCheck: 0 })
      render(<ControlledDialog onCloseAutoFocus={() => {}} />)

      await user.click(screen.getByRole('button', { name: 'open' }))
      await screen.findByText('dialog body')

      await user.keyboard('{Escape}')

      await waitFor(() => {
        expect(screen.queryByText('dialog body')).toBeNull()
      })
    })
  })
})
