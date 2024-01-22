import { Switch } from '@/components/ui/switch'
import { Header } from '../header'
import { Code } from '../code'

export function SwitchExample(): JSX.Element {
  return <>
    <Header>Switch</Header>

    <div>
      <Switch checked />
    </div>

    <Code code={'<Switch checked />'} />
  </>
}
