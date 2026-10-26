'use client'

import { useState } from 'react'
import { ShieldCheck, Menu, X, ArrowLeft, ArrowUpLeft, Workflow, BookOpen } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { LanguageToggle } from '@/components/ui/language-toggle'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface SiteHeaderProps {
  active?: 'home' | 'guide' | 'flow'
}

export function SiteHeader({ active = 'home' }: SiteHeaderProps) {
  const t = useTranslations('nav')
  const locale = useLocale()
  const isRtl = locale === 'ar'
  const [mobileOpen, setMobileOpen] = useState(false)

  const ArrowIcon = isRtl ? ArrowLeft : ArrowUpLeft

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
        {/* Brand Logo & Title */}
        <Link href={`/${locale}`} className="flex min-w-0 items-center gap-3 text-inherit no-underline" aria-label="منصة ثقة">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand-solid border border-brand-solid/20 shadow-xs">
            <ShieldCheck className="size-6" strokeWidth={2.2} />
          </div>
          <div className="flex min-w-0 items-center">
            <span className="truncate text-base font-extrabold text-ink lg:text-lg">
              {isRtl ? 'منصة ثقة' : 'Thiqa Hub'}<span className="text-brand">.</span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          <Link
            href={`/${locale}#why`}
            className={cn(
              "inline-flex min-h-10 items-center rounded-xl px-3.5 text-sm font-semibold transition-colors no-underline",
              active === 'home' ? "text-ink hover:bg-brand-soft" : "text-ink-muted hover:bg-brand-soft hover:text-ink"
            )}
          >
            {t('why')}
          </Link>
          <Link
            href={`/${locale}#how`}
            className={cn(
              "inline-flex min-h-10 items-center rounded-xl px-3.5 text-sm font-semibold transition-colors no-underline",
              active === 'home' ? "text-ink hover:bg-brand-soft" : "text-ink-muted hover:bg-brand-soft hover:text-ink"
            )}
          >
            {t('how')}
          </Link>
          <Link
            href={`/${locale}#security`}
            className={cn(
              "inline-flex min-h-10 items-center rounded-xl px-3.5 text-sm font-semibold transition-colors no-underline",
              active === 'home' ? "text-ink hover:bg-brand-soft" : "text-ink-muted hover:bg-brand-soft hover:text-ink"
            )}
          >
            {t('security')}
          </Link>
          <Link
            href={`/${locale}/guide`}
            className={cn(
              "inline-flex min-h-10 items-center rounded-xl px-3.5 text-sm font-bold transition-colors no-underline",
              active === 'guide'
                ? "bg-brand-soft text-brand-solid border border-brand-solid/20"
                : "text-brand hover:bg-brand-soft hover:text-brand-deep"
            )}
          >
            {t('devGuide')}
          </Link>
          <Link
            href={`/${locale}/flow`}
            className={cn(
              "inline-flex min-h-10 items-center rounded-xl px-3.5 text-sm font-bold transition-colors no-underline",
              active === 'flow'
                ? "bg-brand-soft text-brand-solid border border-brand-solid/20"
                : "text-ink-muted hover:bg-brand-soft hover:text-ink"
            )}
          >
            {t('flowMap')}
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <LanguageToggle />

          {active === 'home' && (
            <a
              href="#start"
              className="hidden sm:inline-flex shrink-0 select-none items-center justify-center gap-2 rounded-xl bg-brand-solid px-5 py-2.5 text-sm font-bold text-white shadow-xs transition-all hover:bg-brand active:scale-[0.98]"
            >
              {t('start')} <ArrowIcon className="size-4" />
            </a>
          )}

          {active === 'guide' && (
            <Link
              href={`/${locale}/flow`}
              className="hidden sm:inline-flex shrink-0 select-none items-center justify-center gap-2 rounded-xl bg-brand-solid px-4 py-2.5 text-sm font-bold text-white shadow-xs transition-all hover:bg-brand active:scale-[0.98]"
            >
              <Workflow className="size-4" />
              <span>{t('flowMap')}</span>
            </Link>
          )}

          {active === 'flow' && (
            <Link
              href={`/${locale}/guide`}
              className="hidden sm:inline-flex shrink-0 select-none items-center justify-center gap-2 rounded-xl bg-brand-solid px-4 py-2.5 text-sm font-bold text-white shadow-xs transition-all hover:bg-brand active:scale-[0.98]"
            >
              <BookOpen className="size-4" />
              <span>{t('devGuide')}</span>
            </Link>
          )}

          <Button
            variant="outline"
            size="icon"
            className="rounded-xl border-line lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="القائمة"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-x-4 top-[4.5rem] z-50 rounded-2xl border border-line bg-surface p-6 shadow-2xl lg:hidden">
          <nav className="flex flex-col gap-3 text-sm font-bold">
            <Link
              href={`/${locale}#why`}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 rounded-xl text-ink hover:bg-brand-soft"
            >
              {t('why')}
            </Link>
            <Link
              href={`/${locale}#how`}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 rounded-xl text-ink hover:bg-brand-soft"
            >
              {t('how')}
            </Link>
            <Link
              href={`/${locale}#security`}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 rounded-xl text-ink hover:bg-brand-soft"
            >
              {t('security')}
            </Link>
            <Link
              href={`/${locale}/guide`}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "px-3 py-2.5 rounded-xl font-bold",
                active === 'guide' ? "bg-brand-soft text-brand-solid" : "text-brand hover:bg-brand-soft"
              )}
            >
              {t('devGuide')}
            </Link>
            <Link
              href={`/${locale}/flow`}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "px-3 py-2.5 rounded-xl font-bold",
                active === 'flow' ? "bg-brand-soft text-brand-solid" : "text-ink hover:bg-brand-soft"
              )}
            >
              {t('flowMap')}
            </Link>

            <div className="flex items-center justify-between gap-3 border-t border-line pt-4 mt-2">
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <LanguageToggle />
              </div>
              <Link
                href={`/${locale}/guide`}
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-10 flex-1 items-center justify-center rounded-xl bg-brand-solid px-4 text-sm font-bold text-white"
              >
                {t('start')}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
