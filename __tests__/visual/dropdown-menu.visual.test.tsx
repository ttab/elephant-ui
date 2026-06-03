import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

test('DropdownMenu opened', async () => {
  const screen = await render(
    <div className='p-8'>
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )

  await screen.getByRole('button', { name: 'Open' }).click()
  const profile = screen.getByText('Profile')
  await expect.element(profile).toBeVisible()
  await expect.element(profile.element().closest<HTMLElement>('[role=menu]')).toMatchScreenshot('dropdown-menu-opened')
})
