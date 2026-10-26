import { ArrowRight, ShieldCheck, QrCode, Workflow } from 'lucide-react'
import { FlowDiagram } from './flow-diagram'
import { CodeBlock } from '@/components/ui/code-block'
import Link from 'next/link'
import { LanguageToggle } from '@/components/ui/language-toggle'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { getTranslations } from 'next-intl/server'
import { useTranslations, useLocale } from 'next-intl'
import { SiteHeader } from '@/components/ui/site-header'

import { step1Snippets, step3Snippets, step4bSnippets, step5bSnippets, step6Snippets, step7Snippets } from '@/lib/snippets'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return {
    title: t('flowTitle'),
    description: t('flowDesc'),
  }
}

export default function FlowPage() {
  const t = useTranslations('flow')
  const navT = useTranslations('nav')
  const locale = useLocale()
  const isRtl = locale === 'ar'
  const dir = isRtl ? 'rtl' : 'ltr'

  return (
    <div dir={dir} className="min-h-screen bg-background text-foreground selection:bg-brand-solid selection:text-white">
      {/* ══ Official Institutional Header ══ */}
      <SiteHeader active="flow" />

      {/* ══ Watania-Style Deep Brand Hero ══ */}
      <section className="relative bg-brand-deep text-white overflow-hidden py-12 lg:py-16 border-b border-line text-center">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <svg viewBox="0 0 400 400" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="0.7" className="absolute -top-40 start-1/2 -translate-x-1/2 w-[38rem] max-w-none text-on-deep-line opacity-20">
            <ellipse cx="200" cy="200" rx="190" ry="62" transform="rotate(0 200 200)" />
            <ellipse cx="200" cy="200" rx="190" ry="62" transform="rotate(30 200 200)" />
            <ellipse cx="200" cy="200" rx="190" ry="62" transform="rotate(60 200 200)" />
            <ellipse cx="200" cy="200" rx="190" ry="62" transform="rotate(90 200 200)" />
            <ellipse cx="200" cy="200" rx="190" ry="62" transform="rotate(120 200 200)" />
            <ellipse cx="200" cy="200" rx="190" ry="62" transform="rotate(150 200 200)" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-4xl px-4 lg:px-6">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold text-on-deep-muted backdrop-blur-sm">
            <Workflow className="size-3.5" /> {navT('devCenter')}
          </span>
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl tracking-tight">
            {t('pageTitle')}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base lg:text-lg leading-relaxed text-on-deep-muted">
            {t('pageDesc')}
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 pb-24 pt-6 lg:px-6">
        <FlowDiagram
          codeBlocks={[
            <CodeBlock key={1} snippets={step1Snippets} />,
            <CodeBlock key={2} snippets={step3Snippets} />,
            <CodeBlock key={3} snippets={step4bSnippets} />,
            <CodeBlock key={4} snippets={step5bSnippets} />,
            <CodeBlock key={5} snippets={step6Snippets} />,
            <CodeBlock key={6} snippets={step7Snippets} />
          ]}
        />
      </main>
    </div>
  )
}
