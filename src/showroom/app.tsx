import { AlertExample } from './components/alert'
import { ButtonExample } from './components/button'
import { InputExample } from './components/input'
import { PopoverExample } from './components/popover'
import { SheetExample } from './components/sheet'
import { CommandExample } from './components/command'
import { AvatarExample } from './components/avatar'
import { DropdownMenuExample } from './components/dropdown-menu'
import { SelectExample } from './components/select'
import { SeparatorExample } from './components/separator'
import { BadgeExample } from './components/badge'
import { TooltipExample } from './components/tooltip'
import { TabsExample } from './components/tabs'
import { CalendarExample } from './components/calendar'
import { TypographyExample } from './components/typography'
import { ScrollAreaExample } from './components/scroll-area'
import { DrawerExample } from './components/drawer'
import { DialogExample } from './components/dialog'
import { SwitchExample } from './components/switch'

export function App(): JSX.Element {
  return <div className="grid grid-cols-2 gap-4 gap-y-8 max-w-[900px] m-10">
    <TypographyExample />
    <ButtonExample />
    <InputExample />
    <PopoverExample />
    <AlertExample />
    <SheetExample />
    <CommandExample />
    <DialogExample />
    <DrawerExample />
    <AvatarExample />
    <DropdownMenuExample />
    <SelectExample />
    <SeparatorExample />
    <BadgeExample />
    <TooltipExample />
    <TabsExample />
    <CalendarExample />
    <ScrollAreaExample />
    <SwitchExample />
  </div >
}
