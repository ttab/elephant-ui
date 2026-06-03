import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

test('Select opened', async () => {
  const screen = await render(
    <div className='p-8'>
      <Select>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Theme' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='light'>Light</SelectItem>
          <SelectItem value='dark'>Dark</SelectItem>
          <SelectItem value='system'>System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )

  await screen.getByRole('combobox').click()
  const light = screen.getByText('Light')
  await expect.element(light).toBeVisible()
  await expect.element(light.element().closest<HTMLElement>('[role=listbox]')).toMatchScreenshot('select-opened')
})
