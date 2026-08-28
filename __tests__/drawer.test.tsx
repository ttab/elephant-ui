import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'

describe('Drawer (vaul)', () => {
  it('opens on trigger click', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 })
    render(
      <Drawer>
        <DrawerTrigger>open</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>title</DrawerTitle>
          <DrawerDescription>drawer body</DrawerDescription>
        </DrawerContent>
      </Drawer>
    )

    expect(screen.queryByText('drawer body')).toBeNull()

    await user.click(screen.getByText('open'))

    expect(await screen.findByText('drawer body')).toBeInTheDocument()
  })

  // Note: Vaul's Escape-close behavior depends on real layout that jsdom
  // doesn't provide. Closing via the X / outside-click path is covered
  // visually in the showroom.

  it('renders DrawerHeader and DrawerFooter with forwarded className', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 })
    render(
      <Drawer>
        <DrawerTrigger>open</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>title</DrawerTitle>
          <DrawerHeader className='hd'>head</DrawerHeader>
          <DrawerDescription>body</DrawerDescription>
          <DrawerFooter className='ft'>foot</DrawerFooter>
        </DrawerContent>
      </Drawer>
    )

    await user.click(screen.getByText('open'))

    const head = await screen.findByText('head')
    expect(head).toHaveClass('hd')
    const foot = screen.getByText('foot')
    expect(foot).toHaveClass('ft')
  })
})
