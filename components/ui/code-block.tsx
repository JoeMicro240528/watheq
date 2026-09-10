import { codeToHtml } from 'shiki'
import { CodeBlockClient } from './code-block-client'

// Map friendly language names → Shiki language IDs
const LANG_MAP: Record<string, string> = {
  bash: 'bash',
  shell: 'bash',
  sh: 'bash',
  python: 'python',
  py: 'python',
  java: 'java',
  'c#': 'csharp',
  csharp: 'csharp',
  javascript: 'javascript',
  js: 'javascript',
  typescript: 'typescript',
  ts: 'typescript',
  tsx: 'tsx',
  jsx: 'jsx',
  json: 'json',
  html: 'html',
  css: 'css',
  sql: 'sql',
  php: 'php',
}

interface Snippet {
  language: string
  code: string
}

interface CodeBlockProps {
  /** Multiple language snippets — shows a tab per language */
  snippets?: Snippet[]
  /** Single snippet shorthand */
  code?: string
  language?: string
  className?: string
}

async function highlightSnippet(snippet: Snippet) {
  const shikiLang = LANG_MAP[snippet.language.toLowerCase()] ?? 'plaintext'
  const html = await codeToHtml(snippet.code, {
    lang: shikiLang,
    theme: 'github-dark',
  })
  return { language: snippet.language, html, code: snippet.code }
}

export async function CodeBlock({ snippets, code, language = 'bash' }: CodeBlockProps) {
  const raw: Snippet[] = snippets ?? (code ? [{ language, code }] : [])
  if (raw.length === 0) return null

  const highlighted = await Promise.all(raw.map(highlightSnippet))

  return <CodeBlockClient snippets={highlighted} />
}
