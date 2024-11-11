import { type PropsWithChildren } from 'react'

export function Header({ children }: PropsWithChildren): JSX.Element {
  return (
    <div className='col-span-2 border-b'>
      <h2 className='font-bold text-xl not-prose'>{children}</h2>
    </div>
  )
}
