import { Button } from '@/components/ui/button'
import { Header } from '../header'
import { Code } from '../code'
import { Menu } from 'lucide-react'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function SheetExample() {
  return <>
    <Header>Sheet</Header>

    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Menu />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Title</SheetTitle>
            <SheetDescription>
              Descriptiontext
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            Body
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
    <Code code={`import { Menu } from '@ttab/elephant-ui/icons'
import { Button } from '@ttab/elephant-ui'
<Sheet>
  <SheetTrigger asChild>
    <Menu />
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Title</SheetTitle>
      <SheetDescription>
        Description text
      </SheetDescription>
    </SheetHeader>
      Body
    <SheetFooter>
      <SheetClose asChild>
        <Button type="submit">Close</Button>
      </SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>`} />
  </>
}
