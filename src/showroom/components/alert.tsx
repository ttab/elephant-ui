import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Waves } from "lucide-react"
import { Header } from '../header'
import { Code } from '../code'

export function AlertExample() {
  return <>
    <Header>Alert</Header>

    <div>
      <Alert>
        <Waves className="h-4 w-4" />
        <AlertTitle>Alert!</AlertTitle>
        <AlertDescription>Place content of alertment here!</AlertDescription>
      </Alert>
    </div>

    <Code code={`import { Waves } from "@ttab/elephant-ui/icons"
<Alert>
  <Waves className="h-4 w-4" />
  <AlertTitle>Alert!</AlertTitle>
  <AlertDescription>
    Place content of alertment here!
  </AlertDescription>
</Alert>`} />
  </>
}
