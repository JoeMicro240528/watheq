'use client'

import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string
  language?: string
}

export function CodeBlock({ code, language = 'bash', className, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn('relative my-6 overflow-hidden rounded-xl border border-border/50 bg-[#0d1117] shadow-xl', className)} dir="ltr" {...props}>
      <div className="flex items-center justify-between bg-white/5 px-4 py-2 text-xs text-muted-foreground">
        <span className="font-mono text-white/70">{language}</span>
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
          <code className="font-mono text-[13px] leading-relaxed text-gray-200">{code}</code>
        </pre>
      </div>
    </div>
  )
}
