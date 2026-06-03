import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import { Skeleton } from '@/components/ui/skeleton'

test('Skeleton default', async () => {
  const screen = await render(
    <div className='p-4'>
      <Skeleton data-testid='sk' className='h-8 w-48 rounded-md' />
    </div>
  )
  await expect.element(screen.getByTestId('sk')).toMatchScreenshot('skeleton-default')
})
