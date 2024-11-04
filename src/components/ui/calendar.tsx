'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import * as React from 'react'
import { DayPicker } from 'react-day-picker'
import { Button } from '@/components/ui/button'

import buttonVariants from '@/components/ui/buttonVariants'
import { cn } from '@/lib/utils'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps): JSX.Element {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'relative flex flex-col sm:flex-row',
        month: 'space-y-4',
        month_caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        month_grid: 'w-full border-collapse space-y-1',
        weekdays: 'flex',
        weekday: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
        week: 'flex w-full mt-2',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20'
        ),
        range_end: 'day-range-end',
        selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        today: 'bg-accent text-accent-foreground',
        outside:
          'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        disabled: 'text-muted-foreground opacity-50',
        range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
        hidden: 'invisible',
        ...classNames
      }}
      components={{
        PreviousMonthButton: (props) => (
          <Button {...props} size='xs' variant='outline' className={cn(
            buttonVariants({ variant: 'outline' }),
            'h-6 w-6 bg-transparent p-0 opacity-50 hover:opacity-100 absolute top-1 left-1 z-10'
          )}>
            <ChevronLeft className='h-4 w-4'/>
          </Button>
        ),
        NextMonthButton: (props) => (
          <Button {...props} size='xs' variant='outline' className={cn(
            buttonVariants({ variant: 'outline' }),
            'h-6 w-6 bg-transparent p-0 opacity-50 hover:opacity-100 absolute top-1 right-1 z-10'
          )}>
            <ChevronRight className='h-4 w-4'/>
          </Button>
        )
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
