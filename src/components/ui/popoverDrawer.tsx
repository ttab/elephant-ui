'use client'
import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Drawer, DrawerContent, DrawerTrigger, DrawerTitle, DrawerDescription } from '@/components/ui/drawer'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Button } from './button'

interface PopoverDrawerProps extends React.PropsWithChildren {
  triggerLabel: string
  open?: boolean
  setOpen: React.Dispatch<boolean>
  modal?: boolean
}

export function PopoverDrawer({
  triggerLabel,
  children,
  open,
  setOpen,
  modal
}: PopoverDrawerProps): React.JSX.Element {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const handleOpenChange = (isOpen: boolean): void => {
    setOpen(isOpen)
  }

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={handleOpenChange} modal={modal}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            size='xs'
            className='w-fit font-sans font-normal whitespace-nowrap p-2'
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
          align='center'
          side='right'
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              e.stopPropagation()
              setOpen(false)
            }
          }}
        >
          {React.cloneElement(children as React.ReactElement)}
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerTitle />
      <DrawerDescription />
      <DrawerTrigger asChild>
        <Button
          variant='outline'
          size='xs'
          className='justify-start px-2 font-sans font-normal whitespace-nowrap text-ellipsis'
          onKeyDown={(event) => {
            if (event.key !== 'Escape') {
              event?.stopPropagation()
            }
          }}
        >
          {triggerLabel}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='mt-4 border-t'>
          {React.cloneElement(children as React.ReactElement)}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
