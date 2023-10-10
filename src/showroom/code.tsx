// @ts-expect-error
import * as React from 'react'
import { PropsWithChildren } from "react";
import SyntaxHighlighter from 'react-syntax-highlighter'

export function Code({children}: PropsWithChildren) {
  return <div className="whitespace-pre-line font-mono text-xs text-indigo-600 dark:text-indigo-200">
    <SyntaxHighlighter
      showLineNumbers={true}
      language="jsx"
    >
      {children}    
    </SyntaxHighlighter>
    
</div>
} 
