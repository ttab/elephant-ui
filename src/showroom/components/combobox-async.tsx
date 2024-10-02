import {
  ComboBox,
  type DefaultValueOption
} from '@/components/ui/combobox'

import { Header } from '../header'
import { Code } from '../code'

interface MockData {
  title: string
}

export function ComboBoxAsyncExample(): JSX.Element {
  const fetchAsyncData = async (str: string): Promise<DefaultValueOption[]> => {
    const data = await fetch('https://jsonplaceholder.typicode.com/todos/')
      .then(async res => await res.json())
      .then(json => json)
    const newOptions: DefaultValueOption[] = data.map((d: MockData) => ({ label: d.title, value: d.title }))
      .filter((option: DefaultValueOption) => option.label.includes(str))
    // setOptions(newOptions)
    return newOptions
  }

  return <>
    <Header>Async ComboBox (max 3 selections)</Header>
    <div>
      <ComboBox
        max={3}
        selectedOptions={[]}
        placeholder='Add an option'
        onSelect={(option) => console.log(option)}
        fetch={fetchAsyncData}
        minSearchChars={2}
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
