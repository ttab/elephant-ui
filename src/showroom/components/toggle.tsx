import { Toggle } from '@radix-ui/react-toggle'
import { Code } from '../code'
import { Bold } from 'lucide-react'
import { Header } from '../header'

export const ToggleExample = (): JSX.Element => {
  return (
    <>
      <Header>Toggle</Header>
      <div>
        <Toggle aria-label='Toggle bold'>
          <Bold className='h-4 w-4' />
        </Toggle>
      </div>
      <Code code={`<Toggle aria-label='Toggle bold'>
  <Bold className='h-4 w-4' />
</Toggle>`}
      />
    </>
  )
}
