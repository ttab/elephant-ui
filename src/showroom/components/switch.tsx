import { Switch } from '@/components/ui/switch'
import { Header } from '../header'
import { Code } from '../code'
import React from 'react'

export function SwitchExample(): React.JSX.Element {
  return (
    <>
      <Header>Switch</Header>

      <div>
        <Switch checked />
      </div>

      <Code code='<Switch checked />' />
    </>
  )
}
