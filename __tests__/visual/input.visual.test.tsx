import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import { Input } from '@/components/ui/input'

test('Input default', async () => {
  const screen = await render(
    <div className='w-72 p-4'>
      <Input placeholder='Email' />
    </div>
  )
  await expect.element(screen.getByPlaceholder('Email')).toMatchScreenshot('input-default')
})
