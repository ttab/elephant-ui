import {
  ComboBox,
  type DefaultValueOption
} from '@/components/ui/combobox'

import { Header } from '../header'
import { Code } from '../code'
import { useState } from 'react'

interface MockData {
  title: string
}

export function ComboBoxAsyncExample(): JSX.Element {
  const [options, setOptions] = useState<DefaultValueOption[]>([])
  const [selectedOptions, setSelectedOptions] = useState<DefaultValueOption[]>([])

  const fetchAsyncData = async (): Promise<DefaultValueOption[]> => {
    const data = await fetch('https://jsonplaceholder.typicode.com/todos/')
      .then(async res => await res.json())
      .then(json => json)
    const newOptions: DefaultValueOption[] = data.map((d: MockData) => ({ label: d.title, value: d.title }))
    setOptions(newOptions)
    return newOptions
  }

  return <>
    <Header>Async ComboBox (max 3 selections)</Header>
    <div>
      <ComboBox
        max={3}
        selectedOptions={selectedOptions}
        options={options}
        placeholder='Add an option'
        onSelect={(option) => {
          setSelectedOptions([...selectedOptions, option])
        }}
        fetch={fetchAsyncData}
      >
      </ComboBox>
    </div>
    <Code code={`
const [options, setOptions] = useState<DefaultValueOption[]>([])
const selectedOption = [options[0]]

<ComboBox
  max={3}
  selectedOption={[]}
  options={options}
  placeholder='Add an option'
  onSelect={(option) => console.log(option)}
>
</ComboBox>`}
    />
  </>
}
