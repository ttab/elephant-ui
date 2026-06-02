'use client'

import * as React from 'react'
import { Popover as PopoverPrimitive } from '@base-ui/react/popover'

import { cn } from '@/lib/utils'

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

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
