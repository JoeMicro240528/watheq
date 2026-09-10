'use client'

import { useState, useRef, useCallback } from 'react'
import { Check, Copy } from 'lucide-react'

const LANG_COLORS: Record<string, string> = {
  Bash:       '#4ade80',
  Shell:      '#4ade80',
  Python:     '#60a5fa',
  Java:       '#fb923c',
  'C#':       '#a78bfa',
  JavaScript: '#fbbf24',
  TypeScript: '#38bdf8',
  TSX:        '#38bdf8',
  JSX:        '#fbbf24',
  JSON:       '#94a3b8',
  HTML:       '#f87171',
  CSS:        '#c084fc',
  SQL:        '#34d399',
  PHP:        '#818cf8',
}

const defaultColor = '#e2e8f0'

interface HighlightedSnippet {
  language: string
  html: string
  code: string
}

interface CodeBlockClientProps {
  snippets: HighlightedSnippet[]
}

export function CodeBlockClient({ snippets }: CodeBlockClientProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([])

  const activeSnippet = snippets[activeIndex]

  const copyToClipboard = useCallback(async () => {
    if (!activeSnippet) return
    await navigator.clipboard.writeText(activeSnippet.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [activeSnippet])

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let next = index
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      next = (index + 1) % snippets.length
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      next = (index - 1 + snippets.length) % snippets.length
    } else if (e.key === 'Home') {
      e.preventDefault()
      next = 0
    } else if (e.key === 'End') {
      e.preventDefault()
      next = snippets.length - 1
    } else {
      return
    }
    setActiveIndex(next)
    tabsRef.current[next]?.focus()
  }

  if (!snippets.length) return null

  const showTabs = snippets.length > 1

  return (
    <div className="relative my-6 overflow-hidden rounded-xl border border-border/50 bg-[#0d1117] shadow-xl" dir="ltr">
      <div className="flex items-center justify-between bg-white/5 pr-2">
        {showTabs ? (
          <div role="tablist" aria-label="Programming language" className="flex overflow-x-auto">
            {snippets.map((snippet, index) => (
              <button
                key={snippet.language}
                role="tab"
                ref={(el) => { tabsRef.current[index] = el }}
                aria-selected={activeIndex === index}
                aria-controls={`tabpanel-${snippet.language}`}
                id={`tab-${snippet.language}`}
                tabIndex={activeIndex === index ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={[
                  'shrink-0 border-b-2 px-4 py-2.5 font-mono text-xs transition-all duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-[#0d1117]',
                  activeIndex === index ? 'bg-white/10' : 'border-transparent opacity-50 hover:opacity-80',
                ].join(' ')}
                style={{
                  borderColor: activeIndex === index ? (LANG_COLORS[snippet.language] ?? defaultColor) : 'transparent',
                  color: LANG_COLORS[snippet.language] ?? defaultColor,
                }}
              >
                {snippet.language}
              </button>
            ))}
          </div>
        ) : (
          <span className="px-4 py-2.5 font-mono text-xs" style={{ color: LANG_COLORS[activeSnippet.language] ?? defaultColor }}>
            {activeSnippet.language}
          </span>
        )}

        <button
          onClick={copyToClipboard}
          aria-label={copied ? 'Copied!' : 'Copy code'}
          className="ml-2 shrink-0 rounded-md p-1.5 text-white/50 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-[#0d1117]"
        >
          {copied ? <Check className="size-4 text-green-400" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
          <span className="sr-only" aria-live="polite">{copied ? 'Copied to clipboard!' : ''}</span>
        </button>
      </div>

      <div
        role="tabpanel"
        id={`tabpanel-${activeSnippet.language}`}
        aria-labelledby={showTabs ? `tab-${activeSnippet.language}` : undefined}
        className="overflow-x-auto p-4"
        tabIndex={0}
      >
        <div
          className="text-[13px] leading-relaxed [&_pre]:!bg-transparent [&_code]:!font-mono"
          dangerouslySetInnerHTML={{ __html: activeSnippet.html }}
        />
      </div>
    </div>
  )
}
