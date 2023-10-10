// @ts-ignore
import * as React from 'react'

import { Mail } from 'lucide-react'
import {Button} from '@/components/ui/button'
import { Header } from '../header'
import { Code } from '../code'

export function ButtonExample() {
    return <>
        <Header>Button</Header>

        <div>
        <Button>Button</Button>
        </div>
        <Code>
        {`<Button>
  Secondary
</Button>`}
        </Code>

        <div>
        <Button variant="secondary">Secondary</Button>
        </div>
        <Code>
        {`<Button variant="secondary">
  Secondary
</Button>`}
        </Code>

        <div>
        <Button variant="destructive">Destructive</Button>
        </div>
        <Code>
        {`<Button variant="descructive">
  Descructive
</Button>`}
        </Code>

        <div>
        <Button variant="outline">Outline</Button>
        </div>
        <Code>
        {`<Button variant="outline">
  Outline
</Button>`}
        </Code>

        <div>
        <Button>
            <Mail className="mr-2 h-4 w-4" /> Login&nbsp;with&nbsp;email&nbsp;icon
        </Button>
        </div>
        <Code>
        {`import { Mail } from 'lucide-react'
<Button>
  <Mail className="mr-2 h-4 w-4" />
    Login with email icon
</Button>`}
        </Code>
    </>
}