import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'

test('Avatar with fallback', async () => {
  const screen = await render(
    <div className='p-4'>
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    </div>
  )
  await expect.element(screen.getByText('JD')).toMatchScreenshot('avatar-fallback')
})
