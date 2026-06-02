'use client'

import * as React from 'react'
import { Menu as MenuPrimitive } from '@base-ui/react/menu'
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

const DropdownMenu = MenuPrimitive.Root

const DropdownMenuTrigger = MenuPrimitive.Trigger

const DropdownMenuGroup = MenuPrimitive.Group

const DropdownMenuPortal = MenuPrimitive.Portal

const DropdownMenuSub = MenuPrimitive.SubmenuRoot

const DropdownMenuRadioGroup = MenuPrimitive.RadioGroup

const popupAnimationClasses = [
  'origin-[var(--transform-origin)] transition-[scale,opacity] duration-150 ease-out',
  'data-[ending-style]:opacity-0 data-[ending-style]:scale-95'
].join(' ')

const DropdownMenuSubTrigger = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.SubmenuTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenuPrimitive.SubmenuTrigger
    ref={ref}
    className={cn(
      'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[highlighted]:bg-accent data-[popup-open]:bg-accent',
      inset && 'pl-8',
      className
    )}
    {...props}
  >
    {children}
    <ChevronRightIcon className='ml-auto h-4 w-4' />
  </MenuPrimitive.SubmenuTrigger>
))
DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger'

const DropdownMenuSubContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.Popup>
>(({ className, ...props }, ref) => (
  <MenuPrimitive.Portal>
    <MenuPrimitive.Positioner className={cn('z-50', typeof className === 'string' ? className : undefined)}>
      <MenuPrimitive.Popup
        ref={ref}
        className={cn(
          'min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg',
          popupAnimationClasses,
          className
        )}
        {...props}
      />
    </MenuPrimitive.Positioner>
  </MenuPrimitive.Portal>
))
DropdownMenuSubContent.displayName = 'DropdownMenuSubContent'

type DropdownMenuPositionerProps = React.ComponentPropsWithoutRef<typeof MenuPrimitive.Positioner>

type DropdownMenuContentProps = React.ComponentPropsWithoutRef<typeof MenuPrimitive.Popup>
  & {
    align?: DropdownMenuPositionerProps['align']
    side?: DropdownMenuPositionerProps['side']
    sideOffset?: DropdownMenuPositionerProps['sideOffset']
  }

const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ className, align, side, sideOffset = 4, ...props }, ref) => (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        align={align}
        side={side}
        sideOffset={sideOffset}
        className={cn('z-50', typeof className === 'string' ? className : undefined)}
      >
        <MenuPrimitive.Popup
          ref={ref}
          className={cn(
            'min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
            popupAnimationClasses,
            className
          )}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
)
DropdownMenuContent.displayName = 'DropdownMenuContent'

const DropdownMenuItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenuPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50',
      inset && 'pl-8',
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = 'DropdownMenuItem'

const DropdownMenuCheckboxItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50',
      className
    )}
    checked={checked}
    {...props}
  >
    <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
      <MenuPrimitive.CheckboxItemIndicator>
        <CheckIcon className='h-4 w-4' />
      </MenuPrimitive.CheckboxItemIndicator>
    </span>
    {children}
  </MenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem'

const DropdownMenuRadioItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50',
      className
    )}
    {...props}
  >
    <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
      <MenuPrimitive.RadioItemIndicator>
        <CircleIcon className='h-2 w-2 fill-current' />
      </MenuPrimitive.RadioItemIndicator>
    </span>
    {children}
  </MenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem'

const DropdownMenuLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'px-2 py-1.5 text-sm font-semibold',
      inset && 'pl-8',
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = 'DropdownMenuLabel'

const DropdownMenuSeparator = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenuPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator'

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>): React.JSX.Element => {
  return (
    <span
      className={cn('ml-auto text-xs tracking-widest opacity-60', className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut'

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup
}
