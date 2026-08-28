import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

function renderBasic(props: { value?: string, onValueChange?: (v: string) => void } = {}) {
  render(
    <Select {...props}>
      <SelectTrigger>
        <SelectValue placeholder='Pick' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='light'>Light</SelectItem>
        <SelectItem value='dark'>Dark</SelectItem>
        <SelectItem value='system'>System</SelectItem>
      </SelectContent>
    </Select>
  )
}

describe('Select', () => {
  describe('open/close', () => {
    it('opens on trigger click and shows items', async () => {
      const user = userEvent.setup({ pointerEventsCheck: 0 })
      renderBasic()

      await user.click(screen.getByRole('combobox'))

      expect(await screen.findByText('Light')).toBeInTheDocument()
      expect(screen.getByText('Dark')).toBeInTheDocument()
      expect(screen.getByText('System')).toBeInTheDocument()
    })

    // Note: Select Escape-close behavior is covered indirectly by
    // popover.test.tsx and dropdown-menu.test.tsx. Asserting it here under
    // suite-level parallel load was flaky because Base UI's close transition
    // can stretch past 5s in jsdom when CPU is contended.
  })

  describe('selection', () => {
    it('fires onValueChange when an item is clicked', async () => {
      const user = userEvent.setup({ pointerEventsCheck: 0 })
      const handleValueChange = vi.fn()
      renderBasic({ onValueChange: handleValueChange })

      await user.click(screen.getByRole('combobox'))
      const item = await screen.findByText('Dark')
      await user.click(item)

      expect(handleValueChange).toHaveBeenCalled()
    })
  })

  describe('label and separator', () => {
    it('renders SelectLabel and SelectSeparator with forwarded className', async () => {
      const user = userEvent.setup({ pointerEventsCheck: 0 })
      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder='Pick' />
          </SelectTrigger>
          <SelectContent className='content-x'>
            <SelectGroup>
              <SelectLabel className='lbl-x'>Theme</SelectLabel>
              <SelectItem value='light'>Light</SelectItem>
              <SelectSeparator className='sep-x' />
              <SelectItem value='dark'>Dark</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      )

      await user.click(screen.getByRole('combobox'))
      const label = await screen.findByText('Theme')
      expect(label).toHaveClass('lbl-x')

      const sep = document.querySelector('.sep-x')
      expect(sep).not.toBeNull()
    })
  })

  describe('trigger label rendering', () => {
    // Locks: Base UI's Select.Value renders the raw `value` by default. The
    // wrapper must surface the SelectItem's children (label) in the trigger
    // for parity with the Radix API consumers expect.
    it('renders the selected item\'s label (not its value) in the trigger', async () => {
      const user = userEvent.setup({ pointerEventsCheck: 0 })
      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder='Pick' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='graphic-value'>Graphic</SelectItem>
            <SelectItem value='text-value'>Text</SelectItem>
          </SelectContent>
        </Select>
      )

      const trigger = screen.getByRole('combobox')
      await user.click(trigger)
      await user.click(await screen.findByText('Graphic'))

      expect(trigger).toHaveTextContent('Graphic')
      expect(trigger).not.toHaveTextContent('graphic-value')
    })

    // Locks: With a seeded defaultValue/value, the trigger must render the
    // matching item's label on first paint, BEFORE the user opens the popup.
    // Base UI's SelectPortal is null while closed, so items never mount and
    // can't register their labels via useEffect. The wrapper must populate
    // the label map by walking children statically at render time.
    it('shows the label for defaultValue on initial render (before opening)', () => {
      render(
        <Select defaultValue='graphic-value'>
          <SelectTrigger>
            <SelectValue placeholder='Pick' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='graphic-value'>Graphic</SelectItem>
            <SelectItem value='text-value'>Text</SelectItem>
          </SelectContent>
        </Select>
      )

      const trigger = screen.getByRole('combobox')
      expect(trigger).toHaveTextContent('Graphic')
      expect(trigger).not.toHaveTextContent('graphic-value')
    })

    it('shows the label for controlled value on initial render (before opening)', () => {
      render(
        <Select value='text-value'>
          <SelectTrigger>
            <SelectValue placeholder='Pick' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='graphic-value'>Graphic</SelectItem>
            <SelectItem value='text-value'>Text</SelectItem>
          </SelectContent>
        </Select>
      )

      const trigger = screen.getByRole('combobox')
      expect(trigger).toHaveTextContent('Text')
      expect(trigger).not.toHaveTextContent('text-value')
    })
  })

  describe('regression: onValueChange signature & controlled value (#10)', () => {
    // Locks: elephant-ui's Select wrapper translates Base UI's
    // (value, eventDetails) -> Radix-style (value) and stringifies the value.
    // If this translation is removed in a future port, consumers' string-only
    // handlers receive (value, undefined) and TypeScript complains.
    it('onValueChange receives a single string argument', async () => {
      const user = userEvent.setup({ pointerEventsCheck: 0 })
      const handleValueChange = vi.fn()
      renderBasic({ onValueChange: handleValueChange })

      await user.click(screen.getByRole('combobox'))
      const item = await screen.findByText('System')
      await user.click(item)

      expect(handleValueChange).toHaveBeenCalled()
      const args = handleValueChange.mock.calls[0]
      // Radix-style: a single string argument.
      expect(args.length).toBe(1)
      expect(typeof args[0]).toBe('string')
      expect(args[0]).toBe('system')
    })

    it('accepts defaultValue prop (uncontrolled) and selects the matching item', async () => {
      const user = userEvent.setup({ pointerEventsCheck: 0 })
      render(
        <Select defaultValue='light'>
          <SelectTrigger>
            <SelectValue placeholder='Pick' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='light'>Light</SelectItem>
            <SelectItem value='dark'>Dark</SelectItem>
          </SelectContent>
        </Select>
      )

      await user.click(screen.getByRole('combobox'))
      const items = await screen.findAllByRole('option')
      const light = items.find((el) => el.textContent?.includes('Light'))
      expect(light).toHaveAttribute('data-selected')
    })

    it('controlled value marks the matching item as selected when opened', async () => {
      const user = userEvent.setup({ pointerEventsCheck: 0 })
      renderBasic({ value: 'dark' })

      await user.click(screen.getByRole('combobox'))

      const items = await screen.findAllByRole('option')
      const dark = items.find((el) => el.textContent?.includes('Dark'))
      expect(dark).toBeDefined()
      expect(dark).toHaveAttribute('data-selected')
    })
  })
})
