'use client'

import * as React from 'react'
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { XIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

const Dialog = DialogPrimitive.Root

const DialogPortal = DialogPrimitive.Portal

type AsChildProps = { asChild?: boolean }

function rendersNativeButton(element: React.ReactElement): boolean | undefined {
  if (typeof element.type === 'string') {
    return element.type === 'button'
  }
  const displayName = (element.type as { displayName?: string })?.displayName
  if (displayName === 'Button') return true
  return undefined
}

const DialogTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger> & AsChildProps
>(({ asChild, children, render, nativeButton, ...props }, ref) => {
  const validChild = asChild && React.isValidElement(children)
    ? children as React.ReactElement<Record<string, unknown>>
    : undefined
  const resolvedRender = validChild ?? render
  const resolvedNativeButton = nativeButton ?? (validChild ? rendersNativeButton(validChild) : undefined)
  return (
    <DialogPrimitive.Trigger ref={ref} render={resolvedRender} nativeButton={resolvedNativeButton} {...props}>
      {asChild ? undefined : children}
    </DialogPrimitive.Trigger>
  )
})
DialogTrigger.displayName = 'DialogTrigger'

const DialogClose = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close> & AsChildProps
>(({ asChild, children, render, nativeButton, ...props }, ref) => {
  const validChild = asChild && React.isValidElement(children)
    ? children as React.ReactElement<Record<string, unknown>>
    : undefined
  const resolvedRender = validChild ?? render
  const resolvedNativeButton = nativeButton ?? (validChild ? rendersNativeButton(validChild) : undefined)
  return (
    <DialogPrimitive.Close ref={ref} render={resolvedRender} nativeButton={resolvedNativeButton} {...props}>
      {asChild ? undefined : children}
    </DialogPrimitive.Close>
  )
})
DialogClose.displayName = 'DialogClose'

const DialogOverlay = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Backdrop>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Backdrop
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/10',
      'transition-opacity duration-200',
      'data-[ending-style]:opacity-0',
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = 'DialogOverlay'

type DialogContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Popup>
  & {
    onOpenChangeProvided?: boolean
    /** Radix-compat: presence suppresses default focus restoration. */
    onCloseAutoFocus?: (event: Event) => void
    /** Radix-compat: presence suppresses default initial focus. */
    onOpenAutoFocus?: (event: Event) => void
    /** Radix-compat: accepted but no-op (Base UI handles Escape internally). */
    onEscapeKeyDown?: (event: KeyboardEvent) => void
    /** Radix-compat: accepted but no-op (use Base UI's outsidePress on Root). */
    onPointerDownOutside?: (event: PointerEvent) => void
    /** Radix-compat: accepted but no-op. */
    onInteractOutside?: (event: Event) => void
  }

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({
    className,
    children,
    onOpenChangeProvided = false,
    onKeyDown,
    onCloseAutoFocus,
    onOpenAutoFocus,
    onEscapeKeyDown: _onEscapeKeyDown,
    onPointerDownOutside: _onPointerDownOutside,
    onInteractOutside: _onInteractOutside,
    finalFocus,
    initialFocus,
    ...props
  }, ref) => (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        onKeyDown={(event) => {
          if (event.key !== 'Escape') {
            event.stopPropagation()
          }
          onKeyDown?.(event)
        }}
        finalFocus={onCloseAutoFocus !== undefined ? false : finalFocus}
        initialFocus={onOpenAutoFocus !== undefined ? false : initialFocus}
        ref={ref}
        className={cn(
          'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg xl:h-auto overflow-y-auto max-h-[92dvh] translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg sm:rounded-lg md:w-full focus-visible:outline-none',
          'transition-[scale,opacity] duration-200',
          'data-[ending-style]:opacity-0 data-[ending-style]:scale-95',
          className
        )}
        {...props}
      >
        {children}

        {onOpenChangeProvided
          && (
            <DialogPrimitive.Close className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none'>
              <XIcon className='h-4 w-4' />
              <span className='sr-only'>Close</span>
            </DialogPrimitive.Close>
          )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  )
)
DialogContent.displayName = 'DialogContent'

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element => (
  <div
    className={cn(
      'flex flex-col space-y-1.5 text-center sm:text-left',
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = 'DialogHeader'

const DialogFooter = ({
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
DialogFooter.displayName = 'DialogFooter'

const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = 'DialogTitle'

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
DialogDescription.displayName = 'DialogDescription'

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription
}
