import React from 'react'
import { Code } from '../code'
import { BoldIcon } from 'lucide-react'
import { Header } from '../header'
import { Toggle } from '@/components/ui/toggle'

export const ToggleExample = (): React.JSX.Element => {
  return (
    <>
      <Header>Toggle</Header>
      <div>
        <Toggle aria-label='Toggle bold'>
          <BoldIcon className='h-4 w-4' />
        </Toggle>
      </div>
      <Code code={`<Toggle aria-label='Toggle bold'>
  <Bold className='h-4 w-4' />
</Toggle>`}
      />
    </>
  )
}
