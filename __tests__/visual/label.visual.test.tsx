import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import { Label } from '@/components/ui/label'

test('Label default', async () => {
  const screen = await render(
    <div className='p-4'>
      <Label htmlFor='email'>Email address</Label>
    </div>
  )
  await expect.element(screen.getByText('Email address')).toMatchScreenshot('label-default')
})
