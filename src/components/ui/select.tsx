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

// Statically walk the JSX tree to find SelectItem descendants and capture their
// value -> label mapping, fed to Base UI's `items` prop so the trigger's
// <Select.Value> can resolve the label while the popup (and its items) are
// unmounted. Without this the trigger shows the raw `defaultValue`/`value` on
// first paint, before the user has opened the menu.
const collectSelectItemLabels = (
  node: React.ReactNode,
  out: Map<string, React.ReactNode>
): void => {
  React.Children.forEach(node, (child) => {
    if (!React.isValidElement(child)) {
      return
    }
    const element = child as React.ReactElement<{ value?: unknown, children?: React.ReactNode }>
    if (element.type === SelectItem && typeof element.props.value === 'string') {
      out.set(element.props.value, element.props.children)
    }
    if (element.props && 'children' in element.props && element.props.children !== undefined) {
      collectSelectItemLabels(element.props.children, out)
    }
  })
}

const Select = ({ value, defaultValue, onValueChange, children, items, ...props }: SelectProps) => {
  const translatedHandler = React.useMemo(() => {
    if (!onValueChange) {
      return undefined
    }
    return (next: unknown) => onValueChange(String(next))
  }, [onValueChange])

  // Consumer-provided `items` wins; otherwise derive from <SelectItem> children.
  const derivedItems = React.useMemo(() => {
    if (items !== undefined) {
      return items
    }
    const map = new Map<string, React.ReactNode>()
    collectSelectItemLabels(children, map)
    return Object.fromEntries(map)
  }, [items, children])

  return (
    <SelectPrimitive.Root
      items={derivedItems}
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

// Base UI's Value resolves the selected label from Root's `items` (closed popup)
// or from the mounted item (open), so no custom value->label lookup is needed.
const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background data-placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
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
  }

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, children, align, side, sideOffset, ...props }, ref) => (
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
            'relative max-h-(--available-height) min-w-(--anchor-width) overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md',
            'origin-(--transform-origin) transition-[scale,opacity] duration-150 ease-out',
            'data-ending-style:opacity-0 data-ending-style:scale-95',
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
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50',
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
