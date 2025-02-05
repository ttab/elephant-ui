'use client'
import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Button } from './button'

interface PopoverDrawerProps extends React.PropsWithChildren {
  triggerLabel: string
  open?: boolean
  setOpen: React.Dispatch<boolean>
}

export function PopoverDrawer({
  triggerLabel,
  children,
  open,
  setOpen
}: PopoverDrawerProps): JSX.Element {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const handleOpenChange = (isOpen: boolean): void => {
    setOpen(isOpen)
  }

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            size='xs'
            className='w-fit font-sans font-normal whitespace-nowrap p-2'
            onClick={() => setOpen(!open)}
            onKeyDown={(event) => {
              if (event.key !== 'Escape') {
                event?.stopPropagation()
              }
            }}
          >
            {triggerLabel}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className='min-w-[200px] w-fit p-0 max-w-[400px]'
          asChild={asChild}
          align='start'
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              e.stopPropagation()
              setOpen(false)
            }
          }}
        >
          {React.cloneElement(children as React.ReactElement, { setOpen })}
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <Button
          variant='outline'
          size='xs'
          className='justify-start px-2 font-sans font-normal whitespace-nowrap text-ellipsis'
          onClick={() => setOpen(!open)}
          onKeyDown={(event) => {
            if (event.key !== 'Escape') {
              event?.stopPropagation()
            }
          }}
        >
          {triggerLabel}
        </Button>
      </DrawerTrigger>
      <DrawerContent asChild={asChild}>
        <div className='mt-4 border-t'>
          {React.cloneElement(children as React.ReactElement, { setOpen })}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
