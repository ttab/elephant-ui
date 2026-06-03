import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'

test('Sheet opened (right side)', async () => {
  const screen = await render(
    <div className='p-8'>
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent defaultClose>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here.
          </SheetDescription>
        </SheetContent>
      </Sheet>
    </div>
  )

  await screen.getByRole('button', { name: 'Open' }).click()
  const popup = screen.getByRole('dialog')
  await expect.element(popup).toBeVisible()
  await expect.element(popup).toMatchScreenshot('sheet-opened')
})
