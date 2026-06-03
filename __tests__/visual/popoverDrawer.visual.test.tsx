import { useState } from 'react'
import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import { PopoverDrawer } from '@/components/ui/popoverDrawer'

function Wrapper() {
  const [open, setOpen] = useState(false)
  return (
    <div className='p-8'>
      <PopoverDrawer triggerLabel='Pick a value' setOpen={setOpen} open={open}>
        <div className='p-4'>
          <p className='text-sm'>Drawer popup body</p>
        </div>
      </PopoverDrawer>
    </div>
  )
}

test('PopoverDrawer opened', async () => {
  const screen = await render(<Wrapper />)

  await screen.getByRole('button', { name: /Pick a value/ }).click()
  const body = screen.getByText('Drawer popup body')
  await expect.element(body).toBeVisible()
  await expect.element(body.element().closest<HTMLElement>('[data-side]')).toMatchScreenshot('popoverDrawer-opened')
})
