import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

function renderBasic(itemProps: Record<string, unknown> = {}) {
  const handleClick = vi.fn()
  render(
    <DropdownMenu>
      <DropdownMenuTrigger>open</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleClick} {...itemProps}>profile</DropdownMenuItem>
        <DropdownMenuItem>billing</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
  return { handleClick }
}

describe('DropdownMenu', () => {
  describe('open/close', () => {
    it('opens on trigger click', async () => {
      const user = userEvent.setup()
      renderBasic()

      expect(screen.queryByText('profile')).toBeNull()
      await user.click(screen.getByRole('button', { name: 'open' }))
      expect(await screen.findByText('profile')).toBeInTheDocument()
    })

    it('closes on Escape', async () => {
      const user = userEvent.setup()
      renderBasic()

      await user.click(screen.getByRole('button', { name: 'open' }))
      await screen.findByText('profile')
      await user.keyboard('{Escape}')

      await waitFor(() => {
        expect(screen.queryByText('profile')).toBeNull()
      })
    })
  })

  describe('regression: DropdownMenuItem onClick (#1)', () => {
    // Locks the single biggest migration bug: Radix's onSelect was renamed to
    // onClick in Base UI. If a future port silently swaps it back, this fails.
    it('fires onClick when activated by mouse', async () => {
      const user = userEvent.setup()
      const { handleClick } = renderBasic()

      await user.click(screen.getByRole('button', { name: 'open' }))
      const item = await screen.findByText('profile')
      await user.click(item)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('fires onClick when activated by Enter on highlighted item', async () => {
      const user = userEvent.setup()
      const { handleClick } = renderBasic()

      await user.click(screen.getByRole('button', { name: 'open' }))
      await screen.findByText('profile')
      // First arrow-down highlights the first item.
      await user.keyboard('{ArrowDown}')
      await user.keyboard('{Enter}')

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('closes the menu after item activation', async () => {
      const user = userEvent.setup()
      renderBasic()

      await user.click(screen.getByRole('button', { name: 'open' }))
      const item = await screen.findByText('profile')
      await user.click(item)

      await waitFor(() => {
        expect(screen.queryByText('profile')).toBeNull()
      })
    })

    it('does not fire onClick when item is disabled', async () => {
      const user = userEvent.setup()
      const { handleClick } = renderBasic({ disabled: true })

      await user.click(screen.getByRole('button', { name: 'open' }))
      const item = await screen.findByText('profile')
      await user.click(item)

      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('keyboard navigation', () => {
    it('arrow keys move data-highlighted between items', async () => {
      const user = userEvent.setup()
      renderBasic()

      await user.click(screen.getByRole('button', { name: 'open' }))
      await screen.findByText('profile')

      await user.keyboard('{ArrowDown}')
      expect(screen.getByText('profile').closest('[role=menuitem]'))
        .toHaveAttribute('data-highlighted')

      await user.keyboard('{ArrowDown}')
      expect(screen.getByText('billing').closest('[role=menuitem]'))
        .toHaveAttribute('data-highlighted')
    })
  })

  describe('CheckboxItem', () => {
    it('reflects checked prop and fires onCheckedChange on activation', async () => {
      const user = userEvent.setup()
      const handleCheckedChange = vi.fn()

      function Controlled() {
        const [checked, setChecked] = useState(false)
        const onChange = (next: boolean) => {
          handleCheckedChange(next)
          setChecked(next)
        }
        return (
          <DropdownMenu>
            <DropdownMenuTrigger>open</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuCheckboxItem checked={checked} onCheckedChange={onChange}>
                notifications
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }

      render(<Controlled />)

      await user.click(screen.getByRole('button', { name: 'open' }))
      const item = await screen.findByText('notifications')
      await user.click(item)

      expect(handleCheckedChange).toHaveBeenCalledWith(true)
    })
  })

  describe('Label, Separator, Shortcut, RadioGroup', () => {
    it('renders Label (with inset), Separator and Shortcut with forwarded className', async () => {
      const user = userEvent.setup()
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>open</DropdownMenuTrigger>
          <DropdownMenuContent className='content-x' align='center' side='bottom'>
            <DropdownMenuLabel className='lbl-x' inset>Section</DropdownMenuLabel>
            <DropdownMenuSeparator className='sep-x' />
            <DropdownMenuItem inset>
              indented item
              <DropdownMenuShortcut className='kbd-x'>⌘K</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )

      await user.click(screen.getByRole('button', { name: 'open' }))
      const label = await screen.findByText('Section')
      expect(label).toHaveClass('lbl-x', 'pl-8')

      const sep = document.querySelector('.sep-x')
      expect(sep).not.toBeNull()

      expect(screen.getByText('⌘K')).toHaveClass('kbd-x')
      expect(screen.getByText(/indented item/).closest('[role=menuitem]')).toHaveClass('pl-8')
    })

    it('renders RadioGroup with RadioItem and fires onValueChange', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()

      function Controlled() {
        const [value, setValue] = useState('a')
        return (
          <DropdownMenu>
            <DropdownMenuTrigger>open</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup
                value={value}
                onValueChange={(v: string) => {
                  handleChange(v)
                  setValue(v)
                }}
              >
                <DropdownMenuRadioItem value='a'>Option A</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value='b'>Option B</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }

      render(<Controlled />)

      await user.click(screen.getByRole('button', { name: 'open' }))
      const optB = await screen.findByText('Option B')
      await user.click(optB)

      expect(handleChange).toHaveBeenCalledWith('b')
    })
  })

  describe('SubmenuTrigger inset', () => {
    it('applies pl-8 when inset is true', async () => {
      const user = userEvent.setup()
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger inset className='sub-x'>more</DropdownMenuSubTrigger>
              <DropdownMenuSubContent className='subcontent-x'>
                <DropdownMenuItem>nested</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      )

      await user.click(screen.getByRole('button', { name: 'open' }))
      const trigger = await screen.findByText('more')
      expect(trigger).toHaveClass('pl-8')
      expect(trigger).toHaveClass('sub-x')
    })
  })

  describe('Submenu', () => {
    it('opens nested submenu on SubmenuTrigger interaction', async () => {
      const user = userEvent.setup()
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>more</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>nested item</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      )

      await user.click(screen.getByRole('button', { name: 'open' }))
      await screen.findByText('more')
      // Open submenu via ArrowRight on highlighted SubmenuTrigger.
      await user.keyboard('{ArrowDown}')
      await user.keyboard('{ArrowRight}')

      expect(await screen.findByText('nested item')).toBeInTheDocument()
    })
  })
})
