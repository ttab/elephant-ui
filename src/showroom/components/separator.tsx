import { Separator } from '@/components/ui/separator'
import { Header } from '../header'
import { Code } from '../code'

export function SeparatorExample(): JSX.Element {
  return (
    <>
      <Header>Separator</Header>

      <div>
        <Separator />
      </div>
      <Code code='<Separator />' />
    </>
  )
}
