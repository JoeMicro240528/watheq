import { ArrowRight, ShieldCheck, QrCode } from 'lucide-react'
import { FlowDiagram } from './flow-diagram'
import { CodeBlock } from '@/components/ui/code-block'
import Link from 'next/link'
import { LanguageToggle } from '@/components/ui/language-toggle'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { cn } from '@/lib/utils'
import { getTranslations } from 'next-intl/server'
import { useTranslations, useLocale } from 'next-intl'

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
    <div dir={dir} className="min-h-screen bg-background text-foreground selection:bg-accent/30">
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 px-6 py-4 backdrop-blur-md lg:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label={isRtl ? "ثقة - الصفحة الرئيسية" : "Thiqa - Home"}>
            <div className="flex items-center gap-[-0.6rem] text-primary">
              <ShieldCheck className="size-6" strokeWidth={2.5} />
              <QrCode className="size-6" strokeWidth={2.5} />
              <img src={isRtl ? "/logo_ar.png" : "/logo_en.png"} alt={isRtl ? "شعار ثقة" : "Thiqa Logo"} className={cn("h-10", isRtl ? "mr-[-2.2rem]" : "ml-[-1.9rem]")} />
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Link href={`/${locale}/guide`} className="hidden items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-secondary/80 sm:flex sm:px-4 sm:text-sm">
              <ArrowRight className={isRtl ? "size-3 sm:size-4" : "size-3 sm:size-4 rotate-180"} />
              {navT('backToGuide')}
            </Link>
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-black text-primary lg:text-5xl">{t('pageTitle')}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t('pageDesc')}
          </p>
        </div>

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
