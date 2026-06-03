import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

test('Tabs default with three tabs', async () => {
  const screen = await render(
    <div className='w-96 p-4'>
      <Tabs defaultValue='one'>
        <TabsList>
          <TabsTrigger value='one'>Account</TabsTrigger>
          <TabsTrigger value='two'>Password</TabsTrigger>
          <TabsTrigger value='three'>Settings</TabsTrigger>
        </TabsList>
        <TabsContent value='one'>Account panel content.</TabsContent>
      </Tabs>
    </div>
  )
  await expect.element(screen.getByRole('tablist')).toMatchScreenshot('tabs-default')
})
