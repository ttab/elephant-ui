import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/buttonGroup'

test('ButtonGroup horizontal', async () => {
  const screen = await render(
    <div className='p-4'>
      <ButtonGroup>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
    </div>
  )
  await expect.element(screen.getByRole('group')).toMatchScreenshot('button-group-horizontal')
})
