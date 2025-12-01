import React from 'react'
import { Header } from '../header'
import { Code } from '../code'

export function TypographyExample(): React.JSX.Element {
  const exampleString = 'å ä æ ö ø Þ ß Å Ä Æ Ö Ø þ'

  return (
    <>
      <Header>Typography</Header>

      <div>
        <div className='font-light'>
          Light text
          <br />
          {exampleString}
        </div>
      </div>
      <Code code={`<div className="font-light">
Normal text
</div>`}
      />

      <div>
        <div className='font-normal'>
          Normal text
          <br />
          {exampleString}
        </div>
      </div>
      <Code code={`<div className="font-normal">
Normal text
</div>`}
      />

      <div>
        <div className='font-medium'>
          Medium text
          <br />
          {exampleString}
        </div>
      </div>
      <Code code={`<div className="font-medium">
Medium text
</div>`}
      />

      <div>
        <div className='font-bold'>
          Bold text
          <br />
          {exampleString}
        </div>
      </div>
      <Code code={`<div className="font-bold">
Bold text
</div>`}
      />

      <div>
        <div className='font-extrabold'>
          Extra bold text
          <br />
          {exampleString}
        </div>
      </div>
      <Code code={`<div className="font-extrabold">
Extra bold text
</div>`}
      />


    </>
  )
}
