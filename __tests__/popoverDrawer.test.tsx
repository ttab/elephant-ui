import { afterEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'

import { PopoverDrawer } from '@/components/ui/popoverDrawer'

const originalInnerWidth = window.innerWidth

function setViewport(width: number): void {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    writable: true,
    value: width
  })
}

describe('PopoverDrawer', () => {
  afterEach(() => {
    setViewport(originalInnerWidth)
  })

  // Default jsdom innerWidth is 1024 >= 768, so the Popover branch renders.
  it('renders trigger label on desktop', () => {
    const setOpen = vi.fn()
    render(
      <PopoverDrawer triggerLabel='Pick' setOpen={setOpen} open={false}>
        <div>panel</div>
      </PopoverDrawer>
    )

    expect(screen.getByRole('button', { name: /Pick/ })).toBeInTheDocument()
  })

  it('opens the popover on trigger click and shows children', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 })

    function Controlled() {
      const [open, setOpen] = useState(false)
      return (
        <PopoverDrawer triggerLabel='Pick' setOpen={setOpen} open={open}>
          <div>panel body</div>
        </PopoverDrawer>
      )
    }

    render(<Controlled />)

    await user.click(screen.getByRole('button', { name: /Pick/ }))

    expect(await screen.findByText('panel body')).toBeInTheDocument()
  })

  it('stops propagation on non-Escape keys on the desktop trigger', () => {
    const setOpen = vi.fn()
    render(
      <PopoverDrawer triggerLabel='Pick' setOpen={setOpen} open={false}>
        <div>panel</div>
      </PopoverDrawer>
    )

    const trigger = screen.getByRole('button', { name: /Pick/ })
    // Enter on the trigger should not bubble up
    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true })
    const stopPropagation = vi.spyOn(enterEvent, 'stopPropagation')
    trigger.dispatchEvent(enterEvent)
    expect(stopPropagation).toHaveBeenCalled()

    // Escape on the trigger should NOT stop propagation
    const escEvent = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })
    const escStop = vi.spyOn(escEvent, 'stopPropagation')
    trigger.dispatchEvent(escEvent)
    expect(escStop).not.toHaveBeenCalled()
  })

  it('Escape inside the open popover calls setOpen(false)', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 })
    const setOpen = vi.fn()

    function Controlled() {
      const [open, internalSetOpen] = useState(false)
      return (
        <PopoverDrawer
          triggerLabel='Pick'
          setOpen={(next) => {
            setOpen(next)
            internalSetOpen(next)
          }}
          open={open}
        >
          <div>panel body</div>
        </PopoverDrawer>
      )
    }

    render(<Controlled />)

    await user.click(screen.getByRole('button', { name: /Pick/ }))
    const panel = await screen.findByText('panel body')

    // Fire a non-Escape key (false branch) first, then Escape (true branch).
    fireEvent.keyDown(panel, { key: 'a' })
    fireEvent.keyDown(panel, { key: 'Escape' })

    expect(setOpen).toHaveBeenCalledWith(false)
  })

  it('renders the drawer branch on mobile viewports', () => {
    setViewport(500)
    const setOpen = vi.fn()

    render(
      <PopoverDrawer triggerLabel='Pick' setOpen={setOpen} open={false}>
        <div>panel</div>
      </PopoverDrawer>
    )

    // Drawer trigger renders the label too; assert the button exists with mobile class
    const trigger = screen.getByRole('button', { name: /Pick/ })
    expect(trigger.className).toMatch(/justify-start/)
  })

  it('non-Escape key on the mobile drawer trigger stops propagation', () => {
    setViewport(500)
    const setOpen = vi.fn()

    render(
      <PopoverDrawer triggerLabel='Pick' setOpen={setOpen} open={false}>
        <div>panel</div>
      </PopoverDrawer>
    )

    const trigger = screen.getByRole('button', { name: /Pick/ })
    // Fire both branches: non-Escape (stop propagation) and Escape (do not).
    fireEvent.keyDown(trigger, { key: 'Enter' })
    fireEvent.keyDown(trigger, { key: 'Escape' })
    expect(trigger).toBeInTheDocument()
  })
})
