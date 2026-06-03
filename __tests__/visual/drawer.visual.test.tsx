import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'

test('Drawer opened', async () => {
  const screen = await render(
    <div className='p-8'>
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Move goal</DrawerTitle>
          <DrawerDescription>
            Set your daily activity goal.
          </DrawerDescription>
        </DrawerContent>
      </Drawer>
    </div>
  )

  await screen.getByText('Open').click()
  const title = screen.getByText('Move goal')
  await expect.element(title).toBeVisible()
  await expect.element(title.element().closest<HTMLElement>('[role=dialog]')).toMatchScreenshot('drawer-opened')
})
