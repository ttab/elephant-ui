import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import { Tooltip } from '@/components/ui/tooltip'

test('Tooltip opened', async () => {
  const screen = await render(
    <div className='p-12'>
      <Tooltip content='Add to library' defaultOpen>
        <button type='button' className='rounded-md border px-3 py-1.5 text-sm'>
          Hover me
        </button>
      </Tooltip>
    </div>
  )

  const content = screen.getByText('Add to library')
  await expect.element(content).toBeVisible()
  await expect.element(content.element().closest<HTMLElement>('[data-side]')).toMatchScreenshot('tooltip-opened')
})
