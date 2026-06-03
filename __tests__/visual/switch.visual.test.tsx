import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import { Switch } from '@/components/ui/switch'

test('Switch unchecked', async () => {
  const screen = await render(
    <div className='p-4'>
      <Switch aria-label='wifi' />
    </div>
  )
  await expect.element(screen.getByRole('switch')).toMatchScreenshot('switch-unchecked')
})

test('Switch checked', async () => {
  const screen = await render(
    <div className='p-4'>
      <Switch aria-label='wifi' checked />
    </div>
  )
  await expect.element(screen.getByRole('switch')).toMatchScreenshot('switch-checked')
})
