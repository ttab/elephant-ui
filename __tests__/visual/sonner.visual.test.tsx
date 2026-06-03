import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/sonner'

test('Toaster shows a programmatically triggered toast', async () => {
  const screen = await render(
    <div className='p-4'>
      <Button
        onClick={() => {
          toast('Event has been created', { duration: Infinity })
        }}
      >
        Show toast
      </Button>
      <Toaster />
    </div>
  )

  await screen.getByRole('button', { name: 'Show toast' }).click()
  const toastEl = screen.getByText('Event has been created')
  await expect.element(toastEl).toBeVisible()
  await expect.element(toastEl).toMatchScreenshot('sonner-toast')
})
