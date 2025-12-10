import { Separator } from '@/components/ui/separator'
import { Header } from '../header'
import { Code } from '../code'
import React from 'react'

export function SeparatorExample(): React.JSX.Element {
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
