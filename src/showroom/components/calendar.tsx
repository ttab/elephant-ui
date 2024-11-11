import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Header } from '../header'
import { Code } from '../code'

export function CalendarExample(): JSX.Element {
  const [date, setDate] = useState<Date | undefined>(new Date())
  return (
    <>
      <Header>Calendar</Header>

      <div className='w-fit'>
        <Calendar
          mode='single'
          selected={date}
          onSelect={setDate}
          className='rounded-md border'
        />
      </div>
      <Code code={`<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-md border"
/>`}
      />
    </>
  )
}
