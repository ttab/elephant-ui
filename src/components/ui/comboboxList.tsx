'use client'
import React, { type Dispatch } from 'react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut
} from '@/components/ui/command'
import { Square, SquareCheck } from '@/components/icons'
import { debounce } from '@/lib/debounce'
import type { DefaultValueOption } from './comboboxTypes'

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
  minSearchChars = 2
}: ComboBoxListProps): JSX.Element {
  const debouncedFetch = debounce(async (input: string) => {
    try {
      if (fetchAsyncData) {
        await fetchAsyncData(input)
      }
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
    <Command shouldFilter={fetchAsyncData && false}>
      <CommandInput
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
        <CommandEmpty>{loadingAsync ? <div>Söker...</div> : 'Ingenting hittades'}</CommandEmpty>

        <CommandGroup>
          {options.map((option) => (
            <CommandItem
              className='group/checkbox'
              key={option.value}
              value={option.value}
              onMouseUp={handleMouseUp}
              onSelect={(selectedLabel) => {
                const newSelectedOption = options.find((option) => option.label === selectedLabel)
                if (newSelectedOption) {
                  onSelect(newSelectedOption)
                }
                if (closeOnSelect) {
                  setOpen(false)
                }
              }}
            >
              <div className='grid grid-flow-col auto-cols-auto items-center gap-2'>
                <div className='w-6 p-0.5' data-ischeckbox>
                  {selectedOptions.find((o) => o.label === option.label)
                    ? <SquareCheck size={18} strokeWidth={1.75} className='mr-4 group-hover/checkbox:opacity-50' />
                    : <Square size={18} strokeWidth={1.75} className='mr-4 opacity-0 group-hover/checkbox:opacity-50' />}
                </div>
                {options.some((option) => option?.color || option?.icon || option?.avatar) && (
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
