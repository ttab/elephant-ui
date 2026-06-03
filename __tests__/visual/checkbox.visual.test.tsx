import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import { Checkbox } from '@/components/ui/checkbox'

test('Checkbox unchecked', async () => {
  const screen = await render(
    <div className='p-4'>
      <Checkbox aria-label='accept' />
    </div>
  )
  await expect.element(screen.getByRole('checkbox')).toMatchScreenshot('checkbox-unchecked')
})

test('Checkbox checked', async () => {
  const screen = await render(
    <div className='p-4'>
      <Checkbox aria-label='accept' checked />
    </div>
  )
  await expect.element(screen.getByRole('checkbox')).toMatchScreenshot('checkbox-checked')
})
