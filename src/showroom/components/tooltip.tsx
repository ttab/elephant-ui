import React from 'react'
import { Tooltip } from '@/components/ui/tooltip'

import { Header } from '../header'
import { Code } from '../code'

export function TooltipExample(): React.JSX.Element {
  return (
    <>
      <Header>Tooltip</Header>

      <div>
        <Tooltip content='Add to library'>
          <p>Hover</p>
        </Tooltip>
      </div>
      <Code code={`<TooltipProvider>
  <Tooltip content='Add to library'>
    <p>Hover</p>
  </Tooltip>`}
      />
    </>
  )
}
