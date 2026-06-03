import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from '@/components/ui/command'

function renderBasic(onSelect = () => {}) {
  render(
    <Command>
      <CommandInput placeholder='search' />
      <CommandList>
        <CommandEmpty>nothing found</CommandEmpty>
        <CommandGroup>
          <CommandItem value='apple' onSelect={onSelect}>Apple</CommandItem>
          <CommandItem value='banana' onSelect={onSelect}>Banana</CommandItem>
          <CommandItem value='cherry' onSelect={onSelect}>Cherry</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

describe('Command', () => {
  describe('typing filters items', () => {
    it('filters list as user types', async () => {
      const user = userEvent.setup()
      renderBasic()

      expect(screen.getByText('Apple')).toBeInTheDocument()
      expect(screen.getByText('Banana')).toBeInTheDocument()

      await user.click(screen.getByPlaceholderText('search'))
      await user.keyboard('ban')

      await waitFor(() => {
        expect(screen.queryByText('Apple')).toBeNull()
      })
      expect(screen.getByText('Banana')).toBeInTheDocument()
    })

    it('shows CommandEmpty when no matches', async () => {
      const user = userEvent.setup()
      renderBasic()

      await user.click(screen.getByPlaceholderText('search'))
      await user.keyboard('zzz')

      expect(await screen.findByText('nothing found')).toBeInTheDocument()
    })
  })

  describe('keyboard navigation', () => {
    it('arrow keys move highlight between items', async () => {
      const user = userEvent.setup()
      renderBasic()

      const input = screen.getByPlaceholderText('search')
      input.focus()

      // CMDK selects first item by default.
      await user.keyboard('{ArrowDown}')
      const banana = screen.getByText('Banana').closest('[cmdk-item]')
      expect(banana).toHaveAttribute('aria-selected', 'true')

      await user.keyboard('{ArrowDown}')
      const cherry = screen.getByText('Cherry').closest('[cmdk-item]')
      expect(cherry).toHaveAttribute('aria-selected', 'true')
    })

    it('Enter activates the highlighted item', async () => {
      const user = userEvent.setup()
      const handleSelect = vi.fn()
      renderBasic(handleSelect)

      const input = screen.getByPlaceholderText('search')
      input.focus()

      // Default highlight is first item (Apple).
      await user.keyboard('{Enter}')

      expect(handleSelect).toHaveBeenCalled()
      expect(handleSelect.mock.calls[0][0]).toBe('apple')
    })
  })

  describe('CommandDialog', () => {
    it('renders the dialog wrapper around a Command', async () => {
      render(
        <CommandDialog open>
          <CommandInput placeholder='cmd-search' />
          <CommandList>
            <CommandGroup>
              <CommandItem value='one'>One</CommandItem>
              <CommandItem value='two'>Two</CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      )

      expect(await screen.findByPlaceholderText('cmd-search')).toBeInTheDocument()
      expect(screen.getByText('One')).toBeInTheDocument()
    })
  })

  describe('CommandSeparator and CommandShortcut', () => {
    it('renders separator and shortcut with forwarded classes', () => {
      render(
        <Command>
          <CommandList>
            <CommandGroup>
              <CommandItem value='one'>
                One
                <CommandShortcut className='kbd-x'>⌘1</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator className='sep-x' />
            <CommandGroup>
              <CommandItem value='two'>Two</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      )

      expect(screen.getByText('⌘1')).toHaveClass('kbd-x')
      const sep = document.querySelector('.sep-x')
      expect(sep).not.toBeNull()
    })
  })

  describe('regression: data-selected highlight styling (#2)', () => {
    // Locks: the CommandItem className had `data-[selected='true']:bg-accent`
    // with escaped quotes, which compiled to selector [data-selected="'true'"]
    // that never matched cmdk's bare data-selected="true" attribute. The
    // highlighted item received no visible background. Fixed: bare
    // data-[selected=true]. This test asserts the resolved className contains
    // the bare-true variant.
    it('CommandItem className uses bare data-[selected=true] variant', () => {
      renderBasic()

      const item = screen.getByText('Apple').closest('[cmdk-item]')
      expect(item).not.toBeNull()
      // Real DOM attribute set by cmdk should be a bare "true" string.
      const highlighted = item?.getAttribute('aria-selected')
      expect(highlighted).toBe('true')

      // The applied className must include the bare data-[selected=true]
      // variant (not the escaped-quotes version that quietly never matched).
      expect(item?.className).toMatch(/data-\[selected=true\]:bg-accent/)
      expect(item?.className).not.toMatch(/data-\[selected='true'\]/)
    })
  })
})
