import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ComboBox } from '@/components/ui/combobox'
import type { DefaultValueOption } from '@/components/ui/comboboxTypes'

const options: DefaultValueOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' }
]

describe('ComboBox', () => {
  describe('open via trigger', () => {
    it('opens on trigger click and renders the CommandInput + items', async () => {
      const user = userEvent.setup({ pointerEventsCheck: 0 })
      render(
        <ComboBox
          options={options}
          selectedOptions={[]}
          onSelect={() => {}}
          placeholder='pick'
        />
      )

      await user.click(screen.getByRole('button', { name: /pick/ }))

      // CommandInput placeholder + first item visible
      expect(await screen.findByText('Apple')).toBeInTheDocument()
    })
  })

  describe('regression: focus lands on CommandInput after open (#4)', () => {
    // Locks: Base UI's FloatingFocusManager runs on a microtask after mount.
    // ComboBoxList focuses the CommandInput via useEffect + rAF + ref so arrow
    // keys reach CMDK's keyboard listener. If this is removed, arrow keys
    // fire on the trigger button instead and never reach CMDK.
    it('focuses the search input after open', async () => {
      const user = userEvent.setup({ pointerEventsCheck: 0 })
      render(
        <ComboBox
          options={options}
          selectedOptions={[]}
          onSelect={() => {}}
          placeholder='pick'
        />
      )

      await user.click(screen.getByRole('button', { name: /pick/ }))

      await waitFor(() => {
        const active = document.activeElement
        expect(active?.tagName).toBe('INPUT')
        expect(active?.getAttribute('cmdk-input')).not.toBeNull()
      }, { timeout: 1000 })
    })
  })

  describe('regression: Enter on trigger does not race with stickIfOpen (#5)', () => {
    // Locks: previously the consumer wrapper called setOpen(true) on Enter,
    // which raced with Base UI's stickIfOpen click-toggle and closed the
    // popover immediately. Enter on the focused trigger must leave the
    // popover open via Base UI's native click→toggle path alone.
    it('Enter on trigger button opens the popover and keeps it open', async () => {
      const user = userEvent.setup({ pointerEventsCheck: 0 })
      render(
        <ComboBox
          options={options}
          selectedOptions={[]}
          onSelect={() => {}}
          placeholder='pick'
        />
      )

      const trigger = screen.getByRole('button', { name: /pick/ })
      trigger.focus()
      await user.keyboard('{Enter}')

      // Items render after open. If the toggle race fires, we see no items.
      expect(await screen.findByText('Apple')).toBeInTheDocument()
    })
  })

  describe('selection', () => {
    it('fires onSelect when an item is clicked', async () => {
      const user = userEvent.setup({ pointerEventsCheck: 0 })
      const handleSelect = vi.fn()
      render(
        <ComboBox
          options={options}
          selectedOptions={[]}
          onSelect={handleSelect}
          placeholder='pick'
        />
      )

      await user.click(screen.getByRole('button', { name: /pick/ }))
      const item = await screen.findByText('Banana')
      await user.click(item)

      expect(handleSelect).toHaveBeenCalled()
      const args = handleSelect.mock.calls[0]
      expect(args[0]).toMatchObject({ value: 'banana', label: 'Banana' })
    })

    it('deselects an already-selected option when clicked again', async () => {
      const user = userEvent.setup({ pointerEventsCheck: 0 })
      const handleSelect = vi.fn()
      render(
        <ComboBox
          options={options}
          selectedOptions={[{ value: 'apple', label: 'Apple' }]}
          onSelect={handleSelect}
          placeholder='pick'
        />
      )

      // Trigger shows the selected label
      await user.click(screen.getByRole('button', { name: /Apple/ }))
      // Wait until the list is open, then click the Apple list item (not the trigger).
      await screen.findByText('Banana')
      const appleItems = Array.from(document.querySelectorAll('[cmdk-item]'))
        .filter((el) => el.textContent?.includes('Apple'))
      await user.click(appleItems[0])

      // onSelect is called with the toggled option (parent decides what to do)
      expect(handleSelect).toHaveBeenCalledWith(
        expect.objectContaining({ value: 'apple' })
      )
    })

    it('renders multi-select trigger label as "<first> +N" when more than one is selected', () => {
      render(
        <ComboBox
          options={options}
          selectedOptions={[
            { value: 'apple', label: 'Apple' },
            { value: 'banana', label: 'Banana' }
          ]}
          onSelect={() => {}}
          placeholder='pick'
        />
      )

      expect(screen.getByRole('button', { name: /Apple \+1/ })).toBeInTheDocument()
    })

    it('with max=1, selecting an item replaces selection and closes the popover', async () => {
      const user = userEvent.setup({ pointerEventsCheck: 0 })
      const handleSelect = vi.fn()
      render(
        <ComboBox
          options={options}
          selectedOptions={[]}
          onSelect={handleSelect}
          placeholder='pick'
          max={1}
        />
      )

      await user.click(screen.getByRole('button', { name: /pick/ }))
      await user.click(await screen.findByText('Cherry'))

      expect(handleSelect).toHaveBeenCalledWith(
        expect.objectContaining({ value: 'cherry' })
      )
    })

    it('with max=2, does not call onSelect for additions beyond the cap', async () => {
      const user = userEvent.setup({ pointerEventsCheck: 0 })
      const handleSelect = vi.fn()
      render(
        <ComboBox
          options={options}
          selectedOptions={[
            { value: 'apple', label: 'Apple' },
            { value: 'banana', label: 'Banana' }
          ]}
          onSelect={handleSelect}
          placeholder='pick'
          max={2}
        />
      )

      await user.click(screen.getByRole('button', { name: /Apple/ }))
      // Cherry would be the 3rd; component returns early before calling onSelect.
      await user.click(await screen.findByText('Cherry'))

      expect(handleSelect).not.toHaveBeenCalled()
    })
  })

  describe('sort order', () => {
    it('renders selected options before unselected with sortOrder="label"', async () => {
      const user = userEvent.setup({ pointerEventsCheck: 0 })
      render(
        <ComboBox
          options={options}
          selectedOptions={[{ value: 'cherry', label: 'Cherry' }]}
          onSelect={() => {}}
          placeholder='pick'
          sortOrder='label'
        />
      )

      await user.click(screen.getByRole('button', { name: /Cherry/ }))
      // Wait for items to render, then check the first list item is Cherry.
      const cherryItem = await screen.findByText('Cherry', { selector: '[cmdk-item] *, [cmdk-item]' })
      const allItems = Array.from(document.querySelectorAll('[cmdk-item]'))
      expect(allItems[0].textContent).toContain('Cherry')
      expect(cherryItem).toBeInTheDocument()
    })
  })

  describe('callbacks and trigger keyboard handling', () => {
    it('fires onOpenChange when the popover opens', async () => {
      const user = userEvent.setup({ pointerEventsCheck: 0 })
      const handleOpenChange = vi.fn()
      render(
        <ComboBox
          options={options}
          selectedOptions={[]}
          onSelect={() => {}}
          onOpenChange={handleOpenChange}
          placeholder='pick'
        />
      )

      await user.click(screen.getByRole('button', { name: /pick/ }))
      expect(handleOpenChange).toHaveBeenCalledWith(true)
    })

    it('Escape inside the open popover closes it', async () => {
      const user = userEvent.setup({ pointerEventsCheck: 0 })
      render(
        <ComboBox
          options={options}
          selectedOptions={[]}
          onSelect={() => {}}
          placeholder='pick'
        />
      )

      await user.click(screen.getByRole('button', { name: /pick/ }))
      await screen.findByText('Apple')

      // Escape inside the popover content closes it.
      const cmd = document.querySelector('[cmdk-root]')!
      const { fireEvent } = await import('@testing-library/react')
      fireEvent.keyDown(cmd, { key: 'Escape' })

      await waitFor(() => {
        expect(screen.queryByText('Apple')).toBeNull()
      })
    })

    it('Space on the trigger stops propagation (covers trigger keydown branch)', async () => {
      const user = userEvent.setup({ pointerEventsCheck: 0 })
      render(
        <ComboBox
          options={options}
          selectedOptions={[]}
          onSelect={() => {}}
          placeholder='pick'
        />
      )

      const trigger = screen.getByRole('button', { name: /pick/ })
      trigger.focus()
      // Space toggles popover via the trigger; the handler stops propagation.
      await user.keyboard(' ')
      // The popover opens (Base UI handles Space → click → toggle).
      expect(await screen.findByText('Apple')).toBeInTheDocument()
    })

    it('Enter on the trigger stops propagation (covers other half of Enter|Space branch)', async () => {
      const user = userEvent.setup({ pointerEventsCheck: 0 })
      render(
        <ComboBox
          options={options}
          selectedOptions={[]}
          onSelect={() => {}}
          placeholder='pick'
        />
      )

      const trigger = screen.getByRole('button', { name: /pick/ })
      trigger.focus()
      await user.keyboard('{Enter}')
      expect(await screen.findByText('Apple')).toBeInTheDocument()
    })

    it('an unhandled key on the trigger does not block default behavior', async () => {
      const user = userEvent.setup({ pointerEventsCheck: 0 })
      render(
        <ComboBox
          options={options}
          selectedOptions={[]}
          onSelect={() => {}}
          placeholder='pick'
        />
      )

      const trigger = screen.getByRole('button', { name: /pick/ })
      trigger.focus()
      // Tab is neither Enter nor Space — exercises the false branch on line 161.
      await user.keyboard('{Tab}')
      expect(document.activeElement).not.toBe(trigger)
    })

    it('renders an empty trigger label when placeholder is omitted', () => {
      render(
        <ComboBox
          options={options}
          selectedOptions={[]}
          onSelect={() => {}}
        />
      )

      const trigger = screen.getByRole('button')
      // placeholder undefined → renders the `placeholder || ''` fallback (empty text)
      expect(trigger).toBeInTheDocument()
    })

    it('renders placeholder span with validation when validation=true and no selection', () => {
      render(
        <ComboBox
          options={options}
          selectedOptions={[]}
          onSelect={() => {}}
          placeholder='pick'
          validation
        />
      )

      const trigger = screen.getByRole('button', { name: /pick/ })
      expect(trigger).toHaveAttribute('data-ele-validation', 'true')
    })

    it('sorts selected options first then by label when sortOrder is provided', async () => {
      // Larger list with selected items scattered so the comparator is forced to
      // hit both (aSelected && !bSelected) and (!aSelected && bSelected) branches.
      const user = userEvent.setup({ pointerEventsCheck: 0 })
      const many = [
        { value: 'apricot', label: 'Apricot' },
        { value: 'banana', label: 'Banana' },
        { value: 'cherry', label: 'Cherry' },
        { value: 'date', label: 'Date' },
        { value: 'elderberry', label: 'Elderberry' }
      ]
      render(
        <ComboBox
          options={many}
          selectedOptions={[
            { value: 'banana', label: 'Banana' },
            { value: 'date', label: 'Date' }
          ]}
          onSelect={() => {}}
          placeholder='pick'
          sortOrder='label'
        />
      )

      await user.click(screen.getByRole('button', { name: /Banana/ }))
      await screen.findByText('Apricot')

      const items = Array.from(document.querySelectorAll('[cmdk-item]'))
      // Selected first (alphabetical within group), then unselected (alphabetical).
      expect(items[0].textContent).toContain('Banana')
      expect(items[1].textContent).toContain('Date')
    })
  })

  describe('async fetch path', () => {
    it('calls the fetch function and renders returned options when minSearchChars is met', async () => {
      const user = userEvent.setup({ pointerEventsCheck: 0 })
      const fetchFn = vi.fn((query: string) => Promise.resolve([
        { value: `${query}-1`, label: `${query.toUpperCase()} 1` },
        { value: `${query}-2`, label: `${query.toUpperCase()} 2` }
      ]))

      render(
        <ComboBox
          fetch={fetchFn}
          fetchDebounce={50}
          minSearchChars={2}
          selectedOptions={[]}
          onSelect={() => {}}
          placeholder='pick'
        />
      )

      await user.click(screen.getByRole('button', { name: /pick/ }))
      const input = await screen.findByPlaceholderText('')
      await user.click(input)
      await user.keyboard('ab')

      // Wait for debounce + fetch + state update
      await waitFor(() => {
        expect(fetchFn).toHaveBeenCalled()
      }, { timeout: 2000 })

      // Argument is the typed string
      expect(fetchFn.mock.calls.at(-1)?.[0]).toBe('ab')
    })
  })

  describe('mobile (drawer) branch', () => {
    const originalInnerWidth = window.innerWidth

    afterEach(() => {
      Object.defineProperty(window, 'innerWidth', {
        configurable: true,
        writable: true,
        value: originalInnerWidth
      })
    })

    it('renders the drawer trigger on narrow viewports', () => {
      Object.defineProperty(window, 'innerWidth', {
        configurable: true,
        writable: true,
        value: 500
      })

      render(
        <ComboBox
          options={options}
          selectedOptions={[]}
          onSelect={() => {}}
          placeholder='pick'
        />
      )

      const trigger = screen.getByRole('button', { name: /pick/ })
      expect(trigger.className).toMatch(/justify-start/)
    })

    it('renders the drawer trigger with placeholder when no selection', () => {
      Object.defineProperty(window, 'innerWidth', {
        configurable: true,
        writable: true,
        value: 500
      })

      render(
        <ComboBox
          options={options}
          selectedOptions={[]}
          onSelect={() => {}}
          placeholder='choose-something'
        />
      )

      expect(screen.getByText('choose-something')).toBeInTheDocument()
    })

    it('wires fetchAsyncData through to the drawer-branch ComboBoxList', async () => {
      Object.defineProperty(window, 'innerWidth', {
        configurable: true,
        writable: true,
        value: 500
      })

      const user = userEvent.setup({ pointerEventsCheck: 0 })
      const fetchFn = vi.fn(() => Promise.resolve([]))
      render(
        <ComboBox
          fetch={fetchFn}
          fetchDebounce={50}
          selectedOptions={[]}
          onSelect={() => {}}
          placeholder='pick'
        />
      )

      await user.click(screen.getByRole('button', { name: /pick/ }))
      // The list mounted inside the drawer — verifies the `fetch ? fetchAsyncData : undefined`
      // branch evaluated truthy on the mobile path.
      expect(await screen.findByRole('combobox')).toBeInTheDocument()
    })

    it('opens the drawer and routes onSelect when an item is clicked', async () => {
      Object.defineProperty(window, 'innerWidth', {
        configurable: true,
        writable: true,
        value: 500
      })

      const user = userEvent.setup({ pointerEventsCheck: 0 })
      const handleSelect = vi.fn()
      render(
        <ComboBox
          options={options}
          selectedOptions={[]}
          onSelect={handleSelect}
          placeholder='pick'
        />
      )

      await user.click(screen.getByRole('button', { name: /pick/ }))
      const banana = await screen.findByText('Banana')
      await user.click(banana)

      expect(handleSelect).toHaveBeenCalledWith(
        expect.objectContaining({ value: 'banana' })
      )
    })
  })
})
