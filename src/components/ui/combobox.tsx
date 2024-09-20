'use client'

import * as React from 'react'
import { type LucideIcon } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Drawer,
  DrawerContent,
  DrawerTrigger
} from '@/components/ui/drawer'
import { Square, SquareCheck } from '@/components/icons'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'
import { Button } from './button'

export interface DefaultValueOption {
  payload?: unknown
  label: string
  value: string
  icon?: LucideIcon
  avatar?: React.ReactNode
  iconProps?: {
    size?: number
    fill?: string
    color?: string
    strokeWidth?: number
    className?: string
  }
  color?: string
  info?: string
}

type SortableKeys = 'label' | 'value'

interface ComboBoxProps extends React.PropsWithChildren {
  size?: 'xs' | 'sm' | 'default' | 'lg' | 'icon'
  onOpenChange?: (isOpen: boolean) => void
  options: DefaultValueOption[]
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
}

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
  max = 0,
  sortOrder,
  modal = false
}: ComboBoxProps): JSX.Element {
  const [selected, setSelectedOptions] = React.useState<DefaultValueOption[]>(selectedOptions)

  React.useEffect(() => {
    setSelectedOptions(selectedOptions)
  }, [selectedOptions])

  const [open, setOpen] = React.useState(false)
  const [_options, setOptions] = React.useState(options)
  const isDesktop = useMediaQuery('(min-width: 768px)')

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
    if (isOpen) {
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
    if (max) {
      if (max <= 0 || max >= options.length) {
        max = options.length
      }
    }
    const clickedIsAlreadySelected = selected.find(selOption => selOption.value === clickedOption.value)
    let newOptions
    if (clickedIsAlreadySelected) {
      newOptions = selected.filter(selOption => selOption.label !== clickedOption.label)
    }
    if (!clickedIsAlreadySelected) {
      if (max === 1) {
        newOptions = [clickedOption]
      } else if (!(selected.length >= max)) {
        newOptions = [...selected, clickedOption]
      } else return
    }
    setSelectedOptions(newOptions || [])
    onSelect(clickedOption)

    if (max === 1) {
      setOpen(false)
    }
  }

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
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

const ComboBoxAvatar = ({ avatar }: { avatar: React.ReactNode }): React.ReactNode => {
  return <div className='h-3 w-3'>{avatar}</div>
}

interface ComboBoxListProps {
  options: DefaultValueOption[]
  selectedOptions: DefaultValueOption[]
  setOpen: (open: boolean) => void
  onSelect: (option: DefaultValueOption) => void
  label?: string
  hideInput?: boolean
  closeOnSelect?: boolean
}

function ComboBoxList({
  options,
  selectedOptions,
  setOpen,
  onSelect,
  label,
  hideInput = false,
  closeOnSelect = false
}: ComboBoxListProps): JSX.Element {
  return (
      <Command>
        {!hideInput && <CommandInput placeholder={label || ''} />}
        <CommandList>
          <CommandEmpty>Ingenting hittades</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                className='group/checkbox'
                key={option.value}
                value={option.label}
                onMouseDown={(e) => {
                  if (!(e.target instanceof HTMLDivElement)) {
                    return
                  }
                  if (!e.target.dataset.ischeckbox) {
                    setTimeout(() => {
                      setOpen(false)
                    })
                  }
                }}
                onSelect={(selectedLabel) => {
                  const newSelectedOption = options.find((option) => option.label.toLocaleLowerCase() === selectedLabel)
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
                    {selectedOptions.find(o => o.label === option.label)
                      ? <SquareCheck size={18} strokeWidth={1.75} className="mr-4 group-hover/checkbox:opacity-50" />
                      : <Square size={18} strokeWidth={1.75} className="mr-4 opacity-0 group-hover/checkbox:opacity-50" />
                    }
                  </div>
                {selectedOptions.some(option => option?.color || option?.icon || option?.avatar) && (
                  <div className='w-6 justify-self-center p-0.5'>
                    {option?.color && (!option.icon && !option.avatar) && <div className={`items-center w-2.5 h-2.5 grow-0 shrink-0 rounded-full ${option.color}`} />}
                    {option?.icon && (!option.avatar && !option.color) && <option.icon size={18} {...option.iconProps} />}
                    {option?.avatar && (!option.icon && !option.color) && <ComboBoxAvatar avatar={option.avatar} />}
                  </div>)}
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
