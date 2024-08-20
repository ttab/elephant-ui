import {
  ComboBox
} from '@/components/ui/combobox'

import { Header } from '../header'
import { Code } from '../code'
import { KanbanIcon, PenBoxIcon, UserCheck, UserPlus } from 'lucide-react'

export function ComboBoxExample(): JSX.Element {
  const options = [
    { value: 'serenawilliams', label: 'Serena Williams', icon: UserPlus },
    { value: 'andymurray', label: 'Andy Murray', icon: UserCheck },
    { value: 'petesampras', label: 'Pete Sampras', icon: PenBoxIcon },
    { value: 'rogerfederer', label: 'Roger Federer', icon: KanbanIcon }
  ]

  const selectedOption = [options[0]]

  return <>
    <Header>ComboBox (max 3 selections)</Header>
    <div>
      <ComboBox
        max={3}
        selectedOption={selectedOption}
        options={options}
        placeholder='Add an item'
        onSelect={(option) => console.log(option)}
      >
        {!selectedOption.length ? <UserPlus /> : null}
      </ComboBox>
    </div>
    <Code code={`
      <ComboBox
        max={3}
        selectedOption={selectedOption}
        options={exampleOptions}
        placeholder='Add an item'
        onSelect={(option) => console.log(option)}
      >
      </ComboBox>`} />
  </>
}
