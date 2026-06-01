'use client'

import * as React from 'react'
import { Popover as PopoverPrimitive } from '@base-ui/react/popover'

import { cn } from '@/lib/utils'

const Popover = PopoverPrimitive.Root

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger> & {
  /**
   * Legacy Radix-style escape hatch: when true, the trigger renders into the single child element
   * (translated to Base UI's `render` prop under the hood).
   */
  asChild?: boolean
}

function rendersNativeButton(element: React.ReactElement): boolean | undefined {
  // Native HTML element: definitive.
  if (typeof element.type === 'string') {
    return element.type === 'button'
  }
  // Recognize our own <Button> via displayName (it renders a native <button>).
  // For other components we return undefined so Base UI's default (true) applies;
  // consumers wrapping a non-button (e.g. <Link>, custom <a>) should pass
  // nativeButton={false} explicitly.
  const displayName = (element.type as { displayName?: string })?.displayName
  if (displayName === 'Button') return true
  return undefined
}

const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ asChild, children, render, nativeButton, ...props }, ref) => {
    const validChild = asChild && React.isValidElement(children)
      ? children as React.ReactElement<Record<string, unknown>>
      : undefined
    const resolvedRender = validChild ?? render
    const resolvedNativeButton = nativeButton ?? (validChild ? rendersNativeButton(validChild) : undefined)

    return (
      <PopoverPrimitive.Trigger
        ref={ref}
        render={resolvedRender}
        nativeButton={resolvedNativeButton}
        {...props}
      >
        {asChild ? undefined : children}
      </PopoverPrimitive.Trigger>
    )
  }
)
PopoverTrigger.displayName = 'PopoverTrigger'

type PopoverPositionerProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Positioner>

type PopoverContentProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Popup>
  & {
    allowPropagationForKeys?: string[]
    align?: PopoverPositionerProps['align']
    side?: PopoverPositionerProps['side']
    sideOffset?: PopoverPositionerProps['sideOffset']
  }

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({
    className,
    align = 'center',
    side,
    sideOffset = 4,
    allowPropagationForKeys,
    onKeyDown,
    ...props
  }, ref): React.JSX.Element => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        align={align}
        side={side}
        sideOffset={sideOffset}
        className={cn('z-50', typeof className === 'string' ? className : undefined)}
      >
        <PopoverPrimitive.Popup
          ref={ref}
          onKeyDown={(event) => {
            if (allowPropagationForKeys?.length) {
              for (const key of allowPropagationForKeys) {
                if (event.key !== key) {
                  event.stopPropagation()
                }
              }
            }
            onKeyDown?.(event)
          }}
          className={cn(
            'w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none',
            'origin-[var(--transform-origin)] transition-[scale,opacity] duration-150 ease-out',
            'data-[ending-style]:opacity-0 data-[ending-style]:scale-95',
            className
          )}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  )
)
PopoverContent.displayName = 'PopoverContent'

export { Popover, PopoverTrigger, PopoverContent }
