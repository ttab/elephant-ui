import { Input } from '@/components/ui/input'
import { Header } from '../header'
import { Code } from '../code'
import { Label } from '@/components/ui/label'

export function InputWithLabelExample(): JSX.Element {
  return (
    <>
      <Header>Input with Label</Header>

      <div>
        <Label htmlFor='jobtitle'>Job title</Label>
        <Input placeholder='Job title' />
      </div>
      <Code code={`<div>
  <Label htmlFor='jobtitle'>Job title</Label>
  <Input placeholder="Job title"/>
</div>`}
      />
    </>
  )
}
