import { Textarea } from '@/components/ui/textarea'
import { Code } from '../code'
import { Header } from '../header'

export function TextareaExample(): JSX.Element {
  return <>
    <Header>Textarea</Header>

    <div>
<Textarea placeholder="Type your message here." />
    </div>

    <Code code={'<Textarea placeholder="Type your message here." />'} />
  </>
}
