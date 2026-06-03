import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import { Calendar } from '@/components/ui/calendar'

test('Calendar single mode', async () => {
  const screen = await render(
    <div className='p-4'>
      <Calendar mode='single' defaultMonth={new Date(2025, 5, 1)} />
    </div>
  )
  await expect.element(screen.getByRole('grid')).toMatchScreenshot('calendar-single')
})
