import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism';

SyntaxHighlighter.registerLanguage('jsx', jsx);
export function Code({ code }: { code: string | string[] }) {
  return <div className="whitespace-pre-line font-mono text-xs text-indigo-600 dark:text-indigo-200">
    <SyntaxHighlighter
      showLineNumbers={true}
      language="jsx"
      style={prism}
    >
      {code}
    </SyntaxHighlighter>
  </div>
}
