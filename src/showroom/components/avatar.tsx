import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar'
import { Header } from '../header'
import { Code } from '../code'

export function AvatarExample(): JSX.Element {
  return <>
    <Header>Avatar</Header>

    <div>
      <Avatar>
        <AvatarImage src="https://github.com/ttab.png" alt="TT" />
        <AvatarFallback>ELE</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarFallback>ELE</AvatarFallback>
      </Avatar>
    </div>

    <Code code={`import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
<Avatar>
  <AvatarImage src="https://github.com/ttab.png" alt="Elephant" />
  <AvatarFallback>TT</AvatarFallback>
</Avatar>
`} />
  </>
}
