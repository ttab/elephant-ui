import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import { Textarea } from '@/components/ui/textarea'

test('Textarea default', async () => {
  const screen = await render(
    <div className='w-72 p-4'>
      <Textarea placeholder='Type your message here.' />
    </div>
  )
  await expect.element(screen.getByPlaceholder('Type your message here.'))
    .toMatchScreenshot('textarea-default')
})
