import { MailIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Header } from '../header'
import { Code } from '../code'

export function ButtonExample(): JSX.Element {
  return (
    <>
      <Header>Button</Header>

      <div>
        <Button>Primary button</Button>
      </div>
      <Code code={`<Button>
  Primary
</Button>`}
      />

      <div>
        <Button variant='secondary'>Secondary</Button>
      </div>
      <Code code={`<Button variant="secondary">
  Secondary
</Button>`}
      />

      <div>
        <Button variant='destructive'>Destructive</Button>
      </div>
      <Code code={`<Button variant="destructive">
  Destructive
</Button>`}
      />

      <div>
        <Button variant='outline'>Outline</Button>
      </div>
      <Code code={`<Button variant="outline">
  Outline
</Button>`}
      />

      <div>
        <Button>
          <MailIcon className='mr-2 h-4 w-4' />
          {' '}
          Login&nbsp;with&nbsp;email&nbsp;icon
        </Button>
      </div>
      <Code code={`import { Mail } from '@ttab/elephant-ui/icons'
<Button>
  <Mail className="mr-2 h-4 w-4" />
    Login with email icon
</Button>`}
      />
    </>
  )
}
