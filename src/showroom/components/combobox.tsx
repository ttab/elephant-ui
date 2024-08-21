import {
  ComboBox
} from '@/components/ui/combobox'

import { Header } from '../header'
import { Code } from '../code'
import { KanbanIcon } from 'lucide-react'

export function ComboBoxExample(): JSX.Element {
  const options = [
    { value: 'serenawilliams', label: 'Serena Williams', color: 'bg-[#2314aa]' },
    { value: 'andymurray', label: 'Andy Murray' },
    { value: 'petesampras', label: 'Pete Sampras', avatar: <div className='w-full h-full bg-gradient-to-r from-cyan-500 to-blue-500 ... rounded-full outline-dotted items-center'/> },
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
        placeholder='Add a player'
        onSelect={(option) => console.log(option)}
      >
      </ComboBox>
    </div>
    <Code code={`const options = [
  { value: 'serenawilliams', label: 'Serena Williams', color: 'bg-[#2314aa]' },
  { value: 'andymurray', label: 'Andy Murray' },
  { value: 'petesampras', label: 'Pete Sampras', avatar: <div className='w-full h-full bg-gradient-to-r from-cyan-500 to-blue-500 ... rounded-full outline-dotted items-center'/> },
  { value: 'rogerfederer', label: 'Roger Federer', icon: KanbanIcon }
]

const selectedOption = [options[0]]

<ComboBox
  max={3}
  selectedOption={[]}
  options={options}
  placeholder='Add a player'
  onSelect={(option) => console.log(option)}
>
</ComboBox>`}
    />
  </>
}
