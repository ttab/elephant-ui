import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import { Badge } from '@/components/ui/badge'

test('Badge default variant', async () => {
  const screen = await render(<div className='p-4'><Badge>new</Badge></div>)
  await expect.element(screen.getByText('new')).toMatchScreenshot('badge-default')
})
