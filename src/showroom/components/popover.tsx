import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Header } from '../header'
import { Code } from '../code'

export function PopoverExample(): JSX.Element {
  return <>
    <Header>Popover</Header>

    <div>
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Place content for the popover here.</PopoverContent>
      </Popover>
    </div>
    <Code code={`<Popover>
  <PopoverTrigger>Open</PopoverTrigger>
  <PopoverContent>
    Place content for the popover here.
  </PopoverContent>
</Popover>`} />
  </>
}
