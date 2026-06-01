'use client'

import * as React from 'react'
import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip'

import { cn } from '@/lib/utils'

interface TooltipProps extends React.PropsWithChildren {
  content: React.ReactNode
}

const TooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Popup>
  & { sideOffset?: number, side?: 'top' | 'right' | 'bottom' | 'left' }
>(({ className, sideOffset = 4, side, ...props }, ref) => (
  <TooltipPrimitive.Positioner sideOffset={sideOffset} side={side} className={cn('z-[9999999999]', typeof className === 'string' ? className : undefined)}>
    <TooltipPrimitive.Popup
      ref={ref}
      className={cn(
        'overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md',
        'transition-[scale,opacity] duration-150 ease-out',
        'data-[ending-style]:opacity-0 data-[ending-style]:scale-95',
        className
      )}
      {...props}
    />
  </TooltipPrimitive.Positioner>
))
TooltipContent.displayName = 'TooltipContent'

const Tooltip = ({ content, children }: TooltipProps): React.JSX.Element => (
  <TooltipPrimitive.Provider>
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger render={<span>{children}</span>} />
      <TooltipPrimitive.Portal>
        <TooltipContent>
          {content}
        </TooltipContent>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  </TooltipPrimitive.Provider>
)

export { Tooltip }
