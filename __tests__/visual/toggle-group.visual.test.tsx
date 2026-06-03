import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

test('ToggleGroup multiple', async () => {
  const screen = await render(
    <div className='p-4'>
      <ToggleGroup type='multiple'>
        <ToggleGroupItem value='bold' aria-label='bold'>B</ToggleGroupItem>
        <ToggleGroupItem value='italic' aria-label='italic'>I</ToggleGroupItem>
        <ToggleGroupItem value='underline' aria-label='underline'>U</ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
  await expect.element(screen.getByRole('group')).toMatchScreenshot('toggle-group-multiple')
})
