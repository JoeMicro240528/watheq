'use client'

import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface Snippet {
  language: string
  code: string
}

interface CodeBlockProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  code?: string
  language?: string
  snippets?: Snippet[]
}

export function CodeBlock({ code, language = 'bash', snippets, className, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  // Normalize to always use an array of snippets
  const activeSnippets = snippets || (code ? [{ language, code }] : [])
  const activeSnippet = activeSnippets[activeTabIndex]

  const copyToClipboard = async () => {
    if (!activeSnippet) return
    await navigator.clipboard.writeText(activeSnippet.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (activeSnippets.length === 0) return null

  return (
    <div className={cn('relative my-6 overflow-hidden rounded-xl border border-border/50 bg-[#0d1117] shadow-xl', className)} dir="ltr" {...props}>
      <div className="flex items-center justify-between bg-white/5 pr-4 text-xs text-muted-foreground">
        <div className="flex">
          {activeSnippets.length > 1 ? (
            activeSnippets.map((snippet, index) => (
              <button
                key={index}
                onClick={() => setActiveTabIndex(index)}
                className={cn(
                  'px-4 py-2.5 font-mono transition-colors hover:text-white',
                  activeTabIndex === index
                    ? 'border-b-2 border-primary text-primary-foreground bg-white/10'
                    : 'text-white/50 border-b-2 border-transparent'
                )}
              >
                {snippet.language}
              </button>
            ))
          ) : (
            <span className="px-4 py-2.5 font-mono text-white/70">{activeSnippet.language}</span>
          )}
        </div>
        <button
          onClick={copyToClipboard}
          className="inline-flex items-center justify-center rounded-md p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Copy code"
        >
          {copied ? <Check className="size-4 text-green-400" /> : <Copy className="size-4" />}
        </button>
      </div>
      <div className="overflow-x-auto p-4">
        <pre className="text-sm">
          <code className="font-mono text-[13px] leading-relaxed text-gray-200">{activeSnippet.code}</code>
        </pre>
      </div>
    </div>
  )
}
