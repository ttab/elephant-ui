import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

test('Dialog opened', async () => {
  const screen = await render(
    <div className='p-8'>
      <Dialog>
        <DialogTrigger>Edit profile</DialogTrigger>
        <DialogContent onOpenChangeProvided>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you are done.
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  )

  await screen.getByRole('button', { name: 'Edit profile' }).click()
  const popup = screen.getByRole('dialog')
  await expect.element(popup).toBeVisible()
  await expect.element(popup).toMatchScreenshot('dialog-opened')
})
