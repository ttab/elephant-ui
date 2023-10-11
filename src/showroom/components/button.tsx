import { Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Header } from '../header'
import { Code } from '../code'

export function ButtonExample() {
  return <>
    <Header>Button</Header>

    <div>
      <Button>Button</Button>
    </div>
    <Code code={`<Button>
  Secondary
</Button>`} />

    <div>
      <Button variant="secondary">Secondary</Button>
    </div>
    <Code code={`<Button variant="secondary">
  Secondary
</Button>`} />

    <div>
      <Button variant="destructive">Destructive</Button>
    </div>
    <Code code={`<Button variant="descructive">
  Descructive
</Button>`} />

    <div>
      <Button variant="outline">Outline</Button>
    </div>
    <Code code={`<Button variant="outline">
  Outline
</Button>`} />

    <div>
      <Button>
        <Mail className="mr-2 h-4 w-4" /> Login&nbsp;with&nbsp;email&nbsp;icon
      </Button>
    </div>
    <Code code={`import { Mail } from 'lucide-react'
<Button>
  <Mail className="mr-2 h-4 w-4" />
    Login with email icon
</Button>`} />
  </>
}