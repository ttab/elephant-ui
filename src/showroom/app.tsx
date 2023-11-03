import { AlertExample } from './components/alert'
import { ButtonExample } from './components/button'
import { InputExample } from './components/input'
import { PopoverExample } from './components/popover'
import { SheetExample } from './components/sheet'

export function App(): JSX.Element {
  return <div className="grid grid-cols-2 gap-4 gap-y-8 max-w-[900px] m-10">
    <ButtonExample />
    <InputExample />
    <PopoverExample />
    <AlertExample />
    <SheetExample />
  </div >
}
