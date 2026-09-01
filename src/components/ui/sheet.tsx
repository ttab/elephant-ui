'use client'

import * as React from 'react'
import { Dialog as SheetPrimitive } from '@base-ui/react/dialog'
import { Button } from './button'
import { cva, type VariantProps } from 'class-variance-authority'
import { XIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

const Sheet = SheetPrimitive.Root

const SheetPortal = SheetPrimitive.Portal

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetOverlay = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Backdrop>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Backdrop
    className={cn(
      'fixed inset-0 z-50 transition-opacity duration-200',
      'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
      className
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = 'SheetOverlay'

const sheetVariants = cva(
  'fixed z-50 gap-4 bg-background p-6 shadow-2xl transition-transform duration-200 ease-in-out',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b data-[starting-style]:-translate-y-full data-[ending-style]:-translate-y-full',
        bottom:
          'inset-x-0 bottom-0 border-t data-[starting-style]:translate-y-full data-[ending-style]:translate-y-full',
        left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[starting-style]:-translate-x-full data-[ending-style]:-translate-x-full sm:max-w-sm',
        right:
          'inset-y-0 right-0 h-full w-3/4 border-l data-[starting-style]:translate-x-full data-[ending-style]:translate-x-full sm:max-w-sm'
      }
    },
    defaultVariants: {
      side: 'right'
    }
  }
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Popup>,
  VariantProps<typeof sheetVariants> {
  container?: HTMLElement | null
  defaultClose?: boolean
  allowPropagationForKeys?: string[]
}

const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  ({
    side = 'right',
    className,
    children,
    defaultClose = false,
    allowPropagationForKeys,
    container,
    onKeyDown,
    ...props
  }, ref) => (
    <SheetPortal container={container}>
      <SheetOverlay />
      <SheetPrimitive.Popup
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
        ref={ref}
        className={cn(sheetVariants({ side }), className)}
        {...props}
      >
        {children}

        {defaultClose
          && (
            <SheetPrimitive.Close
              className='absolute right-2 top-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none'
              render={(
                <Button variant='ghost' className='w-9 px-0'>
                  <XIcon />
                  {/* TODO: take this label as a prop, or say here why it stays hardcoded */}
                  {/* eslint-disable-next-line i18next/no-literal-string */}
                  <span className='sr-only'>Close</span>
                </Button>
              )}
            />
          )}
      </SheetPrimitive.Popup>
    </SheetPortal>
  )
)
SheetContent.displayName = 'SheetContent'

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element => (
  <div
    className={cn(
      'flex flex-col space-y-2 text-center sm:text-left',
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = 'SheetHeader'

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = 'SheetFooter'

const SheetTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold text-foreground', className)}
    {...props}
  />
))
SheetTitle.displayName = 'SheetTitle'

const SheetDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
SheetDescription.displayName = 'SheetDescription'

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription
}
