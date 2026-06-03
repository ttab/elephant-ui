import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import { ScrollArea } from '@/components/ui/scroll-area'

test('ScrollArea with overflow content', async () => {
  const screen = await render(
    <div className='p-4'>
      <ScrollArea className='h-32 w-48 rounded border'>
        <div className='p-4'>
          {Array.from({ length: 20 }).map((_, i) => (
            <p key={i}>
              line
              {' '}
              {i}
            </p>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
  await expect.element(screen.getByText('line 0')).toBeVisible()
  await expect.element(screen.getByText('line 0').element().closest<HTMLElement>('[class*="overflow"]')).toMatchScreenshot('scroll-area-default')
})
