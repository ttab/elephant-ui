import SyntaxHighlighter from 'react-syntax-highlighter'

export function Code({ code }: { code: string | string[] }) {
  return <div className="whitespace-pre-line font-mono text-xs text-indigo-600 dark:text-indigo-200">
    <SyntaxHighlighter
      showLineNumbers={true}
      language="jsx"
    >
      {code}
    </SyntaxHighlighter>

  </div>
} 
