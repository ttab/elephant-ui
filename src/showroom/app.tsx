import { AlertExample } from './components/alert'
import { ButtonExample } from './components/button'
import { InputExample } from './components/input'
import { InputWithLabelExample } from './components/input-with-label'
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
import { TextareaExample } from './components/textarea'
import { SkeletonExample } from './components/skeleton'
import { ComboBoxExample } from './components/combobox'
import { ComboBoxAsyncExample } from './components/combobox-async'
import { ColorsExample } from './components/colors'
import { ToggleExample } from './components/toggle'
import { ToggleGroupExample } from './components/toggle-group'
import { SonnerExample } from './components/sonner'
import { Toaster } from '@/components/ui/sonner'

export function App(): JSX.Element {
  return (
    <div className='grid grid-cols-2 gap-4 gap-y-8 max-w-[900px] m-10'>
      <div className='colspan-2'>
      </div>

      <ColorsExample />
      <TypographyExample />
      <ButtonExample />
      <InputExample />
      <InputWithLabelExample />
      <PopoverExample />
      <AlertExample />
      <SheetExample />
      <CommandExample />
      <ComboBoxExample />
      <ComboBoxAsyncExample />
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
      <TextareaExample />
      <SkeletonExample />
      <ToggleExample />
      <ToggleGroupExample />
      <SonnerExample />

      <Toaster />
    </div>
  )
}
