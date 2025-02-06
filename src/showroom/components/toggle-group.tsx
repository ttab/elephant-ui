import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Code } from '../code'
import { Bold, Italic, Underline } from 'lucide-react'
import { Header } from '../header'

export const ToggleGroupExample = (): JSX.Element => {
  return (
    <>
      <Header>Toggle Group</Header>
      <div>
        <ToggleGroup type='multiple'>
          <ToggleGroupItem value='bold' aria-label='Toggle bold'>
            <Bold className='h-4 w-4' />
          </ToggleGroupItem>
          <ToggleGroupItem value='italic' aria-label='Toggle italic'>
            <Italic className='h-4 w-4' />
          </ToggleGroupItem>
          <ToggleGroupItem value='strikethrough' aria-label='Toggle strikethrough'>
            <Underline className='h-4 w-4' />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <Code code={`<ToggleGroup type='multiple'>
  <ToggleGroupItem value='bold' aria-label='Toggle bold'>
    <Bold className='h-4 w-4' />
  </ToggleGroupItem>
  <ToggleGroupItem value='italic' aria-label='Toggle italic'>
    <Italic className='h-4 w-4' />
  </ToggleGroupItem>
  <ToggleGroupItem value='strikethrough' aria-label='Toggle strikethrough'>
    <Underline className='h-4 w-4' />
  </ToggleGroupItem>
</ToggleGroup>`}
      />
    </>
  )
}
