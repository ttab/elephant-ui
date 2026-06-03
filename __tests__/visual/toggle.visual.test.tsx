import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import { Toggle } from '@/components/ui/toggle'

test('Toggle unpressed', async () => {
  const screen = await render(
    <div className='p-4'>
      <Toggle>Bold</Toggle>
    </div>
  )
  await expect.element(screen.getByRole('button', { name: 'Bold' }))
    .toMatchScreenshot('toggle-unpressed')
})

test('Toggle pressed', async () => {
  const screen = await render(
    <div className='p-4'>
      <Toggle pressed>Bold</Toggle>
    </div>
  )
  await expect.element(screen.getByRole('button', { name: 'Bold' }))
    .toMatchScreenshot('toggle-pressed')
})
