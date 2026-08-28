'use client'

import * as React from 'react'
import { Drawer as DrawerPrimitive } from 'vaul'

import { cn } from '@/lib/utils'

// The vaul primitives are typed as @radix-ui/react-dialog components. Without
// explicit annotations tsc has to name those types by path when emitting
// declarations (TS2742), which only resolves if radix is a direct dependency.
type OverlayRef = React.ComponentRef<typeof DrawerPrimitive.Overlay>
type OverlayProps = React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
type ContentRef = React.ComponentRef<typeof DrawerPrimitive.Content>
type ContentProps = React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
type TitleRef = React.ComponentRef<typeof DrawerPrimitive.Title>
type TitleProps = React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
type DescriptionRef = React.ComponentRef<typeof DrawerPrimitive.Description>
type DescriptionProps = React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>

type ForwardRef<Ref, Props> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<Props> & React.RefAttributes<Ref>
>

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>): React.JSX.Element => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
)
Drawer.displayName = 'Drawer'

const DrawerTrigger: typeof DrawerPrimitive.Trigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose: typeof DrawerPrimitive.Close = DrawerPrimitive.Close

const DrawerOverlay: ForwardRef<OverlayRef, OverlayProps> = React.forwardRef<
  OverlayRef, OverlayProps
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn('fixed inset-0 z-50 bg-black/10', className)}
    {...props}
  />
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

const DrawerContent: ForwardRef<ContentRef, ContentProps> = React.forwardRef<
  ContentRef, ContentProps
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      aria-describedby={undefined}
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-sm border bg-background',
        className
      )}
      {...props}
    >
      <div className='mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted' />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
))
DrawerContent.displayName = 'DrawerContent'

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element => (
  <div
    className={cn('grid gap-1.5 p-4 text-center sm:text-left', className)}
    {...props}
  />
)
DrawerHeader.displayName = 'DrawerHeader'

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element => (
  <div
    className={cn('mt-auto flex flex-col gap-2 p-4', className)}
    {...props}
  />
)
DrawerFooter.displayName = 'DrawerFooter'

const DrawerTitle: ForwardRef<TitleRef, TitleProps> = React.forwardRef<
  TitleRef, TitleProps
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription: ForwardRef<DescriptionRef, DescriptionProps> = React.forwardRef<
  DescriptionRef, DescriptionProps
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription
}
