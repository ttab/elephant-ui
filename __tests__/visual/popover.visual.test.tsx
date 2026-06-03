import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

test('Popover opened', async () => {
  const screen = await render(
    <div className='p-8'>
      <Popover>
        <PopoverTrigger>open</PopoverTrigger>
        <PopoverContent>
          <div className='space-y-2'>
            <h4 className='font-medium'>Dimensions</h4>
            <p className='text-sm text-muted-foreground'>Set the dimensions for the layer.</p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )

  await screen.getByRole('button', { name: 'open' }).click()
  const body = screen.getByText('Set the dimensions for the layer.')
  await expect.element(body).toBeVisible()
  await expect.element(body.element().closest<HTMLElement>('[data-side]')).toMatchScreenshot('popover-opened')
})
