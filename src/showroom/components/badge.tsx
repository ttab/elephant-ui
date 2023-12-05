import { Badge } from '@/components/ui/badge'
import { Header } from '../header'
import { Code } from '../code'

export function BadgeExample(): JSX.Element {
  return <>
    <Header>Badge</Header>

    <div>
      <Badge>Badge</Badge>
    </div>
    <Code code={`<Badge>
  Secondary
</Badge>`} />

    <div>
      <Badge variant="secondary">Secondary</Badge>
    </div>
    <Code code={`<Badge variant="secondary">
  Secondary
</Badge>`} />

    <div>
      <Badge variant="destructive">Destructive</Badge>
    </div>
    <Code code={`<Badge variant="destructive">
  Destructive
</Badge>`} />

    <div>
      <Badge variant="outline">Outline</Badge>
    </div>
    <Code code={`<Badge variant="outline">
  Outline
</Badge>`} />
  </>
}
