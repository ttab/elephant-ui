import { toast } from 'sonner'
import { Header } from '../header'
import { Code } from '../code'
import { Button } from '@/components/ui/button'
import React from 'react'

export function SonnerExample(): React.JSX.Element {
  return (
    <>
      <Header>Sonner</Header>

      <div>
        <Button
          variant='outline'
          onClick={() =>
            toast('Event has been created', {
              description: 'Sunday, December 03, 2023 at 9:00 AM',
              action: {
                label: 'Undo',
                onClick: () => console.log('Undo')
              }
            })}
        >
          Show Toast
        </Button>
      </div>

      <Code code={`<Button
  variant='outline'
  onClick={() =>
    toast('Event has been created', {
      description: 'Sunday, December 03, 2023 at 9:00 AM',
      action: {
        label: 'Undo',
          onClick: () => console.log('Undo')
      }
    })}
  >
    Show Toast
</Button>
`}
      />
    </>
  )
}
