'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'
import { Button } from './button'
import type { SortableKeys, DefaultValueOption } from './comboboxTypes'
import { ComboBoxList } from './comboboxList'

interface ComboBoxBaseProps extends React.PropsWithChildren {
  size?: 'xs' | 'sm' | 'default' | 'lg' | 'icon'
  onOpenChange?: (isOpen: boolean) => void
  placeholder?: string
  selectedOptions: DefaultValueOption[]
  onSelect: (option: DefaultValueOption) => void
  className?: string
  variant?: 'link' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | null | undefined
  hideInput?: boolean
  closeOnSelect?: boolean
  max?: number
  sortOrder?: SortableKeys
  modal?: boolean
  minSearchChars?: number
}

interface ComboBoxControlledProps extends ComboBoxBaseProps {
  options: DefaultValueOption[]
  fetch?: never
  fetchDebounce?: never
}

interface ComboBoxUncontrolledProps extends ComboBoxBaseProps {
  options?: never
  fetch: (query: string) => Promise<DefaultValueOption[]>
  fetchDebounce?: number
}

type ComboBoxProps = ComboBoxControlledProps | ComboBoxUncontrolledProps
export { DefaultValueOption }

export function ComboBox({
  size = 'default',
  variant,
  onOpenChange,
  options,
  placeholder,
  onSelect,
  selectedOptions,
  className,
  children,
  hideInput,
  closeOnSelect = false,
  sortOrder,
  max,
  modal = false,
  fetch,
  fetchDebounce,
  minSearchChars
}: ComboBoxProps): JSX.Element {
  const [selected, setSelectedOptions] = useState<DefaultValueOption[]>(selectedOptions)

  useEffect(() => {
    setSelectedOptions(selectedOptions)
  }, [selectedOptions])

  const [open, setOpen] = useState(false)
  const [_options, setOptions] = useState(options || [])
  const [loadingAsync, setloadingAsync] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const maxSelectedValues = useMemo(() => {
    return (!max || max < 0) ? 0 : max
  }, [max])

  const selectedValues = selected.map(sel => sel.label)
  const optionsSort = (a: DefaultValueOption, b: DefaultValueOption, sortOrder: SortableKeys): number => {
    // Default sort first by selected/not selected, second by label
    const aSelected = selectedValues.includes(a.label)
    const bSelected = selectedValues.includes(b.label)
    if (aSelected && !bSelected) {
      return -1
    }
    if (!aSelected && bSelected) {
      return 1
    }
    return a[sortOrder].localeCompare(b[sortOrder])
  }

  const handleOpenChange = (isOpen: boolean): void => {
    if (isOpen && options) {
      const sortedOptions = sortOrder
        ? options.sort((a, b) =>
          optionsSort(a, b, sortOrder))
        : options

      setOptions(sortedOptions)
    }

    onOpenChange && onOpenChange(isOpen)
    setOpen(isOpen)
  }
  const triggerLabel = selected.length > 1
    ? `${selected[0].label} +${selected.length - 1}`
    : selected.length ? selected[0].label : undefined

  const handleSelect = (clickedOption: DefaultValueOption): void => {
    const clickedIsAlreadySelected = selected.find(selOption => selOption.value === clickedOption.value)

    if (clickedIsAlreadySelected) {
      setSelectedOptions(selected.filter(selOption => selOption.label !== clickedOption.label))
    }

    if (!clickedIsAlreadySelected) {
      if (maxSelectedValues === 1) {
        setSelectedOptions([clickedOption])
      } else if (!maxSelectedValues || selected.length < maxSelectedValues) {
        setSelectedOptions([...selected, clickedOption])
      } else {
        return
      }
    }

    onSelect(clickedOption)

    if (maxSelectedValues === 1) {
      setOpen(false)
    }
  }

  const fetchAsyncData = useCallback(async (query: string) => {
    if (fetch) {
      setloadingAsync(true)
      setOptions(await fetch(query))
      setloadingAsync(false)
    }
  }, [fetch])

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={handleOpenChange} modal={modal}>
        <PopoverTrigger asChild>
          <Button
            size={size}
            variant={variant || 'outline'}
            className={cn(
              'w-fit text-muted-foreground font-sans font-normal whitespace-nowrap p-2',
              className
            )
            }
          >
            {children || (triggerLabel
              ? <>{triggerLabel}</>
              : <>{placeholder || ''}</>)
            }
          </Button>
        </PopoverTrigger>
        <PopoverContent className='min-w-[200px] w-fit p-0' align='start'>
          <ComboBoxList
            options={_options}
            selectedOptions={selected}
            setOpen={handleOpenChange}
            onSelect={(clickedOption) => handleSelect(clickedOption)}
            label={triggerLabel}
            hideInput={hideInput}
            closeOnSelect={closeOnSelect}
            fetchAsyncData={fetchAsyncData}
            fetchDebounce={fetchDebounce}
            loadingAsync={loadingAsync}
            minSearchChars={minSearchChars}
            setOptions={setOptions}
          />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <Button variant='outline' className={cn(
          'justify-start px-2 font-sans font-normal text-muted-foreground whitespace-nowrap text-ellipsis'
        )}>
          {triggerLabel ? <>{triggerLabel}</> : <>{placeholder}</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='mt-4 border-t'>
          <ComboBoxList
            options={_options}
            selectedOptions={selected}
            setOpen={handleOpenChange}
            onSelect={(clickedOption) => handleSelect(clickedOption)}
            label={triggerLabel}
            hideInput={hideInput}
            closeOnSelect={closeOnSelect}
            fetchAsyncData={fetchAsyncData}
            fetchDebounce={fetchDebounce}
            loadingAsync={loadingAsync}
            minSearchChars={minSearchChars}
            setOptions={setOptions}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
