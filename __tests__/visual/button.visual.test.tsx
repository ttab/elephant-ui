import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import { Button } from '@/components/ui/button'

test('Button default variant', async () => {
  const screen = await render(<Button>Click me</Button>)
  await expect.element(screen.getByRole('button', { name: 'Click me' })).toMatchScreenshot('button-default')
})
