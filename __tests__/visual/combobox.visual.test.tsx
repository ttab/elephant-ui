import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import { ComboBox } from '@/components/ui/combobox'
import type { DefaultValueOption } from '@/components/ui/comboboxTypes'

const options: DefaultValueOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' }
]

test('ComboBox opened', async () => {
  const screen = await render(
    <div className='p-8'>
      <ComboBox
        options={options}
        selectedOptions={[]}
        onSelect={() => {}}
        placeholder='Pick a fruit'
      />
    </div>
  )

  await screen.getByRole('button', { name: /Pick a fruit/ }).click()
  const apple = screen.getByText('Apple')
  await expect.element(apple).toBeVisible()
  await expect.element(apple.element().closest<HTMLElement>('[data-side]')).toMatchScreenshot('combobox-opened')
})
