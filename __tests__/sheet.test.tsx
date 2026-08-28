import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { type KeyboardEvent as ReactKeyboardEvent, useState } from 'react'

import { fireEvent } from '@testing-library/react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'

function ControlledSheet({
  defaultOpen,
  side
}: { defaultOpen?: boolean, side?: 'top' | 'bottom' | 'left' | 'right' } = {}) {
  const [open, setOpen] = useState(defaultOpen ?? false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>open</SheetTrigger>
      <SheetContent side={side} defaultClose>
        <SheetTitle>sheet title</SheetTitle>
        <SheetDescription>sheet body</SheetDescription>
        <SheetClose>internal close</SheetClose>
      </SheetContent>
    </Sheet>
  )
}

describe('Sheet', () => {
  describe('open/close', () => {
    it('opens on trigger click', async () => {
      const user = userEvent.setup({ pointerEventsCheck: 0 })
      render(<ControlledSheet />)

      expect(screen.queryByText('sheet body')).toBeNull()

      await user.click(screen.getByRole('button', { name: 'open' }))

      expect(await screen.findByText('sheet body')).toBeInTheDocument()
    })

    it('closes on Escape', async () => {
      const user = userEvent.setup({ pointerEventsCheck: 0 })
      render(<ControlledSheet defaultOpen />)

      await screen.findByText('sheet body')
      await user.keyboard('{Escape}')

      await waitFor(() => {
        expect(screen.queryByText('sheet body')).toBeNull()
      })
    })

    it('closes when SheetClose is activated', async () => {
      const user = userEvent.setup({ pointerEventsCheck: 0 })
      render(<ControlledSheet />)

      await user.click(screen.getByRole('button', { name: 'open' }))
      await screen.findByText('sheet body')

      await user.click(screen.getByRole('button', { name: 'internal close' }))

      await waitFor(() => {
        expect(screen.queryByText('sheet body')).toBeNull()
      })
    })
  })

  describe('side variant', () => {
    it('applies side-right slide animation classes by default', async () => {
      const user = userEvent.setup({ pointerEventsCheck: 0 })
      render(<ControlledSheet />)

      await user.click(screen.getByRole('button', { name: 'open' }))
      const body = await screen.findByText('sheet body')
      const popup = body.closest('[role=dialog]')
      expect(popup?.className).toMatch(/right-0/)
    })

    it('applies side-left slide animation classes', async () => {
      const user = userEvent.setup({ pointerEventsCheck: 0 })
      render(<ControlledSheet side='left' />)

      await user.click(screen.getByRole('button', { name: 'open' }))
      const body = await screen.findByText('sheet body')
      const popup = body.closest('[role=dialog]')
      expect(popup?.className).toMatch(/left-0/)
    })
  })

  describe('Header and Footer', () => {
    it('renders SheetHeader and SheetFooter with forwarded className', async () => {
      const user = userEvent.setup({ pointerEventsCheck: 0 })
      render(
        <Sheet>
          <SheetTrigger>open</SheetTrigger>
          <SheetContent>
            <SheetHeader className='hd'>head</SheetHeader>
            <SheetTitle>title</SheetTitle>
            <SheetFooter className='ft'>foot</SheetFooter>
          </SheetContent>
        </Sheet>
      )

      await user.click(screen.getByRole('button', { name: 'open' }))
      expect(await screen.findByText('head')).toHaveClass('hd')
      expect(screen.getByText('foot')).toHaveClass('ft')
    })
  })

  describe('allowPropagationForKeys', () => {
    it('an empty allowPropagationForKeys array short-circuits without stopping any keys', async () => {
      const user = userEvent.setup({ pointerEventsCheck: 0 })
      render(
        <Sheet>
          <SheetTrigger>open</SheetTrigger>
          <SheetContent allowPropagationForKeys={[]}>
            <SheetTitle>title</SheetTitle>
            <SheetDescription>body</SheetDescription>
          </SheetContent>
        </Sheet>
      )

      await user.click(screen.getByRole('button', { name: 'open' }))
      const body = await screen.findByText('body')
      const popup = body.closest('[role=dialog]')!

      // `?.length` evaluates to 0 → falsy → no inner loop.
      fireEvent.keyDown(popup, { key: 'a' })
      expect(popup).toBeInTheDocument()
    })

    it('iterates the allow list and forwards onKeyDown', async () => {
      const user = userEvent.setup({ pointerEventsCheck: 0 })
      const onKeyDown = vi.fn()
      render(
        <Sheet>
          <SheetTrigger>open</SheetTrigger>
          <SheetContent allowPropagationForKeys={['Enter']} onKeyDown={onKeyDown}>
            <SheetTitle>title</SheetTitle>
            <SheetDescription>body</SheetDescription>
          </SheetContent>
        </Sheet>
      )

      await user.click(screen.getByRole('button', { name: 'open' }))
      const body = await screen.findByText('body')
      const popup = body.closest('[role=dialog]')!

      // Fire one key NOT in allow list (true branch in `key !== 'Enter'`) and one
      // that IS (false branch). Both keys forward through onKeyDown.
      fireEvent.keyDown(popup, { key: 'a' })
      fireEvent.keyDown(popup, { key: 'Enter' })

      const keys = onKeyDown.mock.calls.map((c) => (c[0] as ReactKeyboardEvent).key)
      expect(keys).toContain('a')
      expect(keys).toContain('Enter')
    })
  })

  describe('regression: reopen after Escape (#6)', () => {
    // Locks: Sheet (built on Base UI Dialog) must clean up modal state on
    // Escape so a subsequent open works. The migration hit a leak where the
    // sheet couldn't be reopened without a page refresh.
    it('can be reopened after closing with Escape', async () => {
      const user = userEvent.setup({ pointerEventsCheck: 0 })
      render(<ControlledSheet />)

      const trigger = screen.getByRole('button', { name: 'open' })

      await user.click(trigger)
      await screen.findByText('sheet body')

      await user.keyboard('{Escape}')
      await waitFor(() => {
        expect(screen.queryByText('sheet body')).toBeNull()
      })

      await user.click(trigger)
      expect(await screen.findByText('sheet body')).toBeInTheDocument()
    })
  })
})
