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
  indicator?: string
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

interface ComboBoxProps extends React.PropsWithChildren {
  size?: 'sm' | 'default' | 'lg' | 'icon'
  onOpenChange?: (isOpen: boolean) => void
  options: DefaultValueOption[]
  placeholder?: string
  selectedOption: DefaultValueOption[]
  onSelect: (option: DefaultValueOption) => void
  className?: string
  variant?: 'link' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | null | undefined
  hideInput?: boolean
  closeOnSelect?: boolean
  max?: number
  sortOrder?: 'label' | 'value'
}

export function ComboBox({
  size = 'sm',
  variant,
  onOpenChange,
  options,
  placeholder,
  onSelect,
  selectedOption,
  className,
  children,
  hideInput,
  closeOnSelect = false,
  max = 0,
  sortOrder = 'label'
}: ComboBoxProps): JSX.Element {
  const [selected, setSelectedOptions] = React.useState<DefaultValueOption[]>(selectedOption)

  React.useEffect(() => {
    setSelectedOptions(selectedOption)
  }, [selectedOption])

  const [open, setOpen] = React.useState(false)
  const [_options, setOptions] = React.useState(options)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const selectedValues = selected.map(sel => sel.label)
  const optionsSort = (a: DefaultValueOption, b: DefaultValueOption): number => {
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
      const sortedOptions = options.sort(optionsSort)
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
      if (max < 0 || max > options.length) {
        max = 0
      }
    }
    const clickedIsAlreadySelected = selected.find(selOption => selOption.value === clickedOption.value)
    let newOptions
    if (max > 0 && !clickedIsAlreadySelected && max && selected.length >= max) {
      if (max === 1) {
        newOptions = [clickedOption]
        setSelectedOptions(newOptions)
      }
      return
    }
    if (clickedIsAlreadySelected) {
      newOptions = [...selected].filter(selOption => selOption.value !== clickedOption.value)
    } else {
      newOptions = [...selected, clickedOption]
    }
    setSelectedOptions(newOptions)
    onSelect(clickedOption)
  }

  if (isDesktop) {
    return (
        <Popover open={open} onOpenChange={handleOpenChange}>
          <PopoverTrigger asChild>
            <Button
              size={size}
              variant={variant || 'outline'}
              className={cn(
                'w-fit h-9 text-muted-foreground font-sans font-normal whitespace-nowrap p-2',
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
          <PopoverContent className='w-[200px] p-0' align='start'>
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
          'w-[150px] justify-start px-2 font-sans font-normal text-muted-foreground whitespace-nowrap text-ellipsis'
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
  return <div className='h-6 w-6'>{avatar}</div>
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
                key={option.label}
                value={option.label}
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
                <div className="w-6">
                  {selectedOptions.find(o => o.label === option.label)
                    ? <SquareCheck size={18} strokeWidth={1.75} className="mr-4 group-hover/checkbox:opacity-50" />
                    : <Square size={18} strokeWidth={1.75} className="mr-4 opacity-0 group-hover/checkbox:opacity-50" />
                  }
                </div>
                <div
                  className='flex space-x-4 items-center grow'
                  onMouseDown={() => setOpen(false)}
                >
                  {option?.indicator && (!option.icon && !option.avatar) && <div className='w-2 h-2 rounded-full' style={{ backgroundColor: option?.indicator }} />}
                  {option?.icon && (!option.avatar && !option.indicator) && <option.icon size={18} {...option.iconProps} />}
                  {option?.avatar && (!option.icon && !option.indicator) && <ComboBoxAvatar avatar={option.avatar} />}
                  <div className="grow w-full">
                    {option.label}
                  </div>
                  <CommandShortcut>{option.info || ''}</CommandShortcut>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
  )
}
