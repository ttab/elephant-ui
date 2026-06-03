import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'

test('Command default list', async () => {
  const screen = await render(
    <div className='w-96 p-4'>
      <Command className='rounded-lg border shadow-md'>
        <CommandInput placeholder='Type a command or search...' />
        <CommandList>
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup>
            <CommandItem value='profile'>Profile</CommandItem>
            <CommandItem value='billing'>Billing</CommandItem>
            <CommandItem value='settings'>Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  )

  const item = screen.getByText('Profile')
  await expect.element(item).toBeVisible()
  await expect.element(item.element().closest<HTMLElement>('[cmdk-root]')).toMatchScreenshot('command-list')
})
