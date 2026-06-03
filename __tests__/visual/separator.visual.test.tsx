import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import { Separator } from '@/components/ui/separator'

test('Separator horizontal', async () => {
  const screen = await render(
    <div className='w-72 p-4'>
      <div className='text-sm'>above</div>
      <Separator data-testid='sep' />
      <div className='text-sm'>below</div>
    </div>
  )
  await expect.element(screen.getByTestId('sep')).toMatchScreenshot('separator-horizontal')
})
