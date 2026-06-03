'use client'
import React, { type Dispatch, useEffect, useRef } from 'react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut
} from '@/components/ui/command'
import { SquareIcon, SquareCheckIcon } from '@/components/icons'
import { debounce } from '@/lib/debounce'
import type { DefaultValueOption } from './comboboxTypes'
import type { ComboboxTranslations } from 'src/types/translation'

interface ComboBoxListProps {
  options: DefaultValueOption[]
  setOptions: Dispatch<React.SetStateAction<DefaultValueOption[]>>
  selectedOptions: DefaultValueOption[]
  setOpen: (open: boolean) => void
  onSelect: (option: DefaultValueOption) => void
  label?: string
  closeOnSelect?: boolean
  fetchAsyncData?: (s: string) => Promise<void>
  fetchDebounce?: number
  loadingAsync?: boolean
  minSearchChars?: number
  translationStrings?: ComboboxTranslations
}

export function ComboBoxList({
  options,
  setOptions,
  selectedOptions,
  setOpen,
  onSelect,
  label,
  closeOnSelect = false,
  fetchAsyncData,
  fetchDebounce = 400,
  loadingAsync,
  minSearchChars = 2,
  translationStrings
}: ComboBoxListProps): React.JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      inputRef.current?.focus()
    })
    return () => cancelAnimationFrame(id)
  }, [])

  const debouncedFetch = debounce(async (input: string) => {
    try {
      /* v8 ignore start -- defensive: debouncedFetch only invoked when fetchAsyncData is set */
      if (!fetchAsyncData) {
        return
      }
      /* v8 ignore stop */
      await fetchAsyncData(input)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }, fetchDebounce)

  const handleMouseUp = (e: React.MouseEvent): void => {
    e.preventDefault()

    if (e.target instanceof HTMLDivElement && !e.target.dataset.ischeckbox) {
      setTimeout(() => {
        setOpen(false)
      })
    }
  }


  return (
    <Command
      shouldFilter={!fetchAsyncData}
      filter={!fetchAsyncData
        ? (_value, search, keywords) => {
            const s = search.toLowerCase()
            /* v8 ignore next -- defensive: ComboBoxList always sets keywords on items */
            const matches = keywords?.some((kw) => kw.toLowerCase().includes(s))
            return matches ? 1 : 0
          }
        : undefined}
    >
      <CommandInput
        ref={inputRef}
        autoFocus
        placeholder={label || ''}
        onValueChange={(str: string) => {
          if (fetchAsyncData) {
            if (str.length >= minSearchChars) {
              debouncedFetch(str)
            }

            if (str.length < minSearchChars) {
              setOptions([])
            }
          }
        }}
      />

      <CommandList>
        <CommandEmpty>{loadingAsync ? <div>{translationStrings?.searching ?? 'Searching...'}</div> : translationStrings?.nothingFound ?? 'Nothing found'}</CommandEmpty>

        <CommandGroup>
          {options.map((option) => (
            <CommandItem
              className='group/checkbox'
              key={option.value}
              value={option.value}
              keywords={[option.label, option.value]}
              onMouseUp={handleMouseUp}
              onSelect={(value) => {
                const newSelectedOption = options.find((option) => option.value === value)
                /* v8 ignore start -- defensive: cmdk only fires onSelect with a known value */
                if (!newSelectedOption) {
                  return
                }
                /* v8 ignore stop */
                onSelect(newSelectedOption)
                if (closeOnSelect) {
                  setOpen(false)
                }
              }}
            >
              <div className='grid grid-flow-col auto-cols-auto items-center gap-2'>
                <div className='w-6 p-0.5' data-ischeckbox>
                  {selectedOptions.find((o) => o.value === option.value)
                    ? <SquareCheckIcon size={18} strokeWidth={1.75} className='mr-4 group-hover/checkbox:opacity-50' />
                    : <SquareIcon size={18} strokeWidth={1.75} className='mr-4 opacity-0 group-hover/checkbox:opacity-50' />}
                </div>
                {options.some((option) => !!option?.color || !!option?.icon || !!option?.avatar) && (
                  <div className='w-6 justify-self-center p-0.5'>
                    {option?.color && (!option.icon && !option.avatar) && <div className={`items-center w-2.5 h-2.5 grow-0 shrink-0 rounded-full ${option.color}`} />}
                    {option?.icon && (!option.avatar && !option.color) && <option.icon size={18} {...option.iconProps} />}
                    {option?.avatar && (!option.icon && !option.color) && <ComboBoxAvatar avatar={option.avatar} />}
                  </div>
                )}
                <div className='pr-0.5'>
                  {option.label}
                  <CommandShortcut>{option.info || ''}</CommandShortcut>
                </div>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

const ComboBoxAvatar = ({ avatar }: { avatar: React.ReactNode }): React.ReactNode => {
  return <div className='h-3 w-3'>{avatar}</div>
}
