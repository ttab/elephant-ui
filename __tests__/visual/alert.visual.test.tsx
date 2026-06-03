import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

test('Alert default variant', async () => {
  const screen = await render(
    <div className='w-96 p-4'>
      <Alert>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
      </Alert>
    </div>
  )
  await expect.element(screen.getByRole('alert')).toMatchScreenshot('alert-default')
})

test('Alert destructive variant', async () => {
  const screen = await render(
    <div className='w-96 p-4'>
      <Alert variant='destructive'>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Your session has expired.</AlertDescription>
      </Alert>
    </div>
  )
  await expect.element(screen.getByRole('alert')).toMatchScreenshot('alert-destructive')
})
