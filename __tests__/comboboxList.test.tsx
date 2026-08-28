import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Check } from 'lucide-react'

import { ComboBoxList } from '@/components/ui/comboboxList'
import type { DefaultValueOption } from '@/components/ui/comboboxTypes'

const baseOptions: DefaultValueOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' }
]

describe('ComboBoxList (direct)', () => {
  it('renders CommandEmpty with translated "Searching..." when loadingAsync is true', () => {
    render(
      <ComboBoxList
        options={[]}
        setOptions={() => {}}
        selectedOptions={[]}
        setOpen={() => {}}
        onSelect={() => {}}
        loadingAsync
        fetchAsyncData={async () => {}}
      />
    )

    // CommandEmpty only shows after a search; in CMDK it's hidden until empty filter result.
    // Force it by typing in input.
    expect(screen.getByText('Searching...')).toBeInTheDocument()
  })

  it('renders custom translation strings for "searching" and "nothingFound"', () => {
    render(
      <ComboBoxList
        options={[]}
        setOptions={() => {}}
        selectedOptions={[]}
        setOpen={() => {}}
        onSelect={() => {}}
        loadingAsync
        fetchAsyncData={async () => {}}
        translationStrings={{ searching: 'Loading...', nothingFound: 'No matches.' }}
      />
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders the "nothingFound" translation when loadingAsync is false', () => {
    render(
      <ComboBoxList
        options={[]}
        setOptions={() => {}}
        selectedOptions={[]}
        setOpen={() => {}}
        onSelect={() => {}}
        translationStrings={{ searching: 'Loading...', nothingFound: 'Nada.' }}
      />
    )

    expect(screen.getByText('Nada.')).toBeInTheDocument()
  })

  it('fires onSelect and closes when closeOnSelect=true', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    const setOpen = vi.fn()

    render(
      <ComboBoxList
        options={baseOptions}
        setOptions={() => {}}
        selectedOptions={[]}
        setOpen={setOpen}
        onSelect={onSelect}
        closeOnSelect
      />
    )

    const apple = await screen.findByText('Apple')
    await user.click(apple)

    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ value: 'apple' }))
    expect(setOpen).toHaveBeenCalledWith(false)
  })

  it('renders option color, icon, and avatar adornments', () => {
    const opts: DefaultValueOption[] = [
      { value: 'a', label: 'A', color: 'bg-red-500' },
      { value: 'b', label: 'B', icon: Check },
      { value: 'c', label: 'C', avatar: <span data-testid='avatar-c'>av</span> }
    ]

    render(
      <ComboBoxList
        options={opts}
        setOptions={() => {}}
        selectedOptions={[]}
        setOpen={() => {}}
        onSelect={() => {}}
      />
    )

    // color swatch via class
    expect(document.querySelector('.bg-red-500')).not.toBeNull()
    // icon rendered (lucide Check renders an svg)
    expect(document.querySelector('svg.lucide-check')).not.toBeNull()
    // avatar
    expect(screen.getByTestId('avatar-c')).toBeInTheDocument()
  })

  it('renders the checked icon when an option is in selectedOptions', () => {
    render(
      <ComboBoxList
        options={baseOptions}
        setOptions={() => {}}
        selectedOptions={[{ value: 'apple', label: 'Apple' }]}
        setOpen={() => {}}
        onSelect={() => {}}
      />
    )

    // SquareCheckIcon (check-square icon from lucide) renders for the selected option only
    expect(document.querySelectorAll('svg.lucide-square-check').length).toBeGreaterThanOrEqual(1)
  })

  it('renders no items when search matches none of the keywords (filter returns 0)', async () => {
    const user = userEvent.setup()
    render(
      <ComboBoxList
        options={baseOptions}
        setOptions={() => {}}
        selectedOptions={[]}
        setOpen={() => {}}
        onSelect={() => {}}
      />
    )

    const input = screen.getByRole('combobox')
    input.focus()
    await user.keyboard('zzz-no-match')

    await waitFor(() => {
      expect(screen.queryByText('Apple')).toBeNull()
    })
  })

  it('typing into the input without fetchAsyncData is a no-op (covers !fetchAsyncData branch)', async () => {
    const user = userEvent.setup()
    const setOptions = vi.fn()
    render(
      <ComboBoxList
        options={baseOptions}
        setOptions={setOptions}
        selectedOptions={[]}
        setOpen={() => {}}
        onSelect={() => {}}
      />
    )

    const input = screen.getByRole('combobox')
    input.focus()
    await user.keyboard('a')

    // setOptions is never called when fetchAsyncData is undefined.
    expect(setOptions).not.toHaveBeenCalled()
  })

  it('mouseUp on the checkbox area does NOT call setOpen(false)', async () => {
    const setOpen = vi.fn()
    render(
      <ComboBoxList
        options={baseOptions}
        setOptions={() => {}}
        selectedOptions={[]}
        setOpen={setOpen}
        onSelect={() => {}}
      />
    )

    await screen.findByText('Apple')
    const checkboxDiv = document.querySelector('[data-ischeckbox]') as HTMLElement
    fireEvent.mouseUp(checkboxDiv, { target: checkboxDiv })

    // Give the setTimeout a tick — it should NOT have called setOpen(false).
    await new Promise((r) => setTimeout(r, 10))
    expect(setOpen).not.toHaveBeenCalled()
  })

  it('mouseUp on a non-checkbox area calls setOpen(false)', async () => {
    const setOpen = vi.fn()
    render(
      <ComboBoxList
        options={baseOptions}
        setOptions={() => {}}
        selectedOptions={[]}
        setOpen={setOpen}
        onSelect={() => {}}
      />
    )

    const item = await screen.findByText('Apple')
    const cmdkItem = item.closest('[cmdk-item]')!
    // Fire mouseUp on a div inside the item that isn't a checkbox.
    fireEvent.mouseUp(cmdkItem, { target: cmdkItem })

    // setTimeout-wrapped close
    await waitFor(() => {
      expect(setOpen).toHaveBeenCalledWith(false)
    })
  })

  describe('async fetch path', () => {
    beforeEach(() => {
      vi.useFakeTimers({ shouldAdvanceTime: true })
    })
    afterEach(() => {
      vi.useRealTimers()
    })

    it('triggers fetchAsyncData when typed value reaches minSearchChars', async () => {
      const fetchAsyncData = vi.fn((_query: string) => Promise.resolve())
      const setOptions = vi.fn()
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })

      render(
        <ComboBoxList
          options={[]}
          setOptions={setOptions}
          selectedOptions={[]}
          setOpen={() => {}}
          onSelect={() => {}}
          fetchAsyncData={fetchAsyncData}
          fetchDebounce={50}
          minSearchChars={2}
        />
      )

      const input = screen.getByRole('combobox')
      input.focus()
      await user.type(input, 'ab')

      await vi.advanceTimersByTimeAsync(100)
      await waitFor(() => {
        expect(fetchAsyncData).toHaveBeenCalled()
      })
      expect(fetchAsyncData.mock.calls.at(-1)?.[0]).toBe('ab')
    })

    it('clears options when typed value drops below minSearchChars', async () => {
      const setOptions = vi.fn()
      const fetchAsyncData = vi.fn(() => Promise.resolve())
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })

      render(
        <ComboBoxList
          options={baseOptions}
          setOptions={setOptions}
          selectedOptions={[]}
          setOpen={() => {}}
          onSelect={() => {}}
          fetchAsyncData={fetchAsyncData}
          fetchDebounce={50}
          minSearchChars={3}
        />
      )

      const input = screen.getByRole('combobox')
      input.focus()
      await user.type(input, 'ab')

      // Below minSearchChars (2 < 3) → setOptions called with []
      expect(setOptions).toHaveBeenCalledWith([])
    })

    it('logs but does not throw when fetchAsyncData rejects', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const fetchAsyncData = vi.fn(() => Promise.reject(new Error('boom')))
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })

      render(
        <ComboBoxList
          options={[]}
          setOptions={() => {}}
          selectedOptions={[]}
          setOpen={() => {}}
          onSelect={() => {}}
          fetchAsyncData={fetchAsyncData}
          fetchDebounce={50}
          minSearchChars={2}
        />
      )

      const input = screen.getByRole('combobox')
      input.focus()
      await user.type(input, 'xy')

      await vi.advanceTimersByTimeAsync(200)
      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalled()
      })

      consoleSpy.mockRestore()
    })
  })
})
