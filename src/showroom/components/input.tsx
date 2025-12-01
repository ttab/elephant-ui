import { Input } from '@/components/ui/input'
import { Header } from '../header'
import { Code } from '../code'
import React from 'react'

export function InputExample(): React.JSX.Element {
  return (
    <>
      <Header>Input</Header>

      <div>
        <Input placeholder='Job title' />
      </div>
      <Code code={'<Input placeholder="Job title"/>'} />

      <div>
        <Input type='file' />
      </div>
      <Code code={'<Input type="file"/>'} />

      <div>
        <span>
          <Input disabled={true} />
        </span>
      </div>
      <Code code='<Input disabled={true}/>' />
    </>
  )
}
