'use client'

import * as React from 'react'
import { Select as SelectPrimitive } from '@base-ui/react/select'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

type SelectProps = Omit<
  React.ComponentProps<typeof SelectPrimitive.Root>,
  'value' | 'defaultValue' | 'onValueChange'
> & {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

const Select = ({ value, defaultValue, onValueChange, children, ...props }: SelectProps) => {
  const translatedHandler = React.useMemo(() => {
    if (!onValueChange) {
      return undefined
    }
    return (next: unknown) => onValueChange(String(next))
  }, [onValueChange])

  return (
    <SelectPrimitive.Root
      {...(value !== undefined && { value })}
      {...(defaultValue !== undefined && { defaultValue })}
      {...(translatedHandler && { onValueChange: translatedHandler })}
      {...props}
    >
      {children}
    </SelectPrimitive.Root>
  )
}

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon render={<ChevronDownIcon className='h-4 w-4 opacity-50' />} />
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = 'SelectTrigger'

const SelectScrollUpButton = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpArrow>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpArrow
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className
    )}
    {...props}
  >
    <ChevronUpIcon className='h-4 w-4' />
  </SelectPrimitive.ScrollUpArrow>
))
SelectScrollUpButton.displayName = 'SelectScrollUpButton'

const SelectScrollDownButton = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownArrow>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownArrow
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className
    )}
    {...props}
  >
    <ChevronDownIcon className='h-4 w-4' />
  </SelectPrimitive.ScrollDownArrow>
))
SelectScrollDownButton.displayName = 'SelectScrollDownButton'

type SelectPositionerProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Positioner>

type SelectContentProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Popup>
  & {
    align?: SelectPositionerProps['align']
    side?: SelectPositionerProps['side']
    sideOffset?: SelectPositionerProps['sideOffset']
    /** Accepted for backwards compatibility with Radix; no longer used. */
    position?: 'popper' | 'item-aligned'
  }

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, children, align, side, sideOffset, position: _position, ...props }, ref) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        align={align}
        side={side}
        sideOffset={sideOffset}
        className={cn('z-50', typeof className === 'string' ? className : undefined)}
      >
        <SelectPrimitive.Popup
          ref={ref}
          className={cn(
            'relative max-h-[var(--available-height)] min-w-[var(--anchor-width)] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md',
            'origin-[var(--transform-origin)] transition-[scale,opacity] duration-150 ease-out',
            'data-[ending-style]:opacity-0 data-[ending-style]:scale-95',
            className
          )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List className='p-1'>
            {children}
          </SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
)
SelectContent.displayName = 'SelectContent'

const SelectLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.GroupLabel>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.GroupLabel
    ref={ref}
    className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
    {...props}
  />
))
SelectLabel.displayName = 'SelectLabel'

const SelectItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className='h-4 w-4' />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = 'SelectItem'

const SelectSeparator = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
))
SelectSeparator.displayName = 'SelectSeparator'

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton
}
