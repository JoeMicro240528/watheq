'use client'

import {
  ArrowLeft,
  ArrowUpLeft,
  BadgeCheck,
  Check,
  FileCheck2,
  Fingerprint,
  LockKeyhole,
  Menu,
  Network,
  ShieldCheck,
  X,
  Zap,
  FilePlus,
  PenTool,
  CheckCircle,
  QrCode,
} from 'lucide-react'
import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { LanguageToggle } from '@/components/ui/language-toggle'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { SiteHeader } from '@/components/ui/site-header'
import { ScrollQrHero } from '@/components/ui/scroll-qr-hero'

export default function Page() {
  const t = useTranslations()
  const locale = useLocale()
  const isRtl = locale === 'ar'

  const features = [
    { icon: Fingerprint, title: t('features.f1Title'), text: t('features.f1Text') },
    { icon: Network, title: t('features.f2Title'), text: t('features.f2Text') },
    { icon: FileCheck2, title: t('features.f3Title'), text: t('features.f3Text') },
  ]

  const steps = [
    { icon: FilePlus, title: t('howItWorks.s1Title'), text: t('howItWorks.s1Text') },
    { icon: PenTool, title: t('howItWorks.s2Title'), text: t('howItWorks.s2Text') },
    { icon: CheckCircle, title: t('howItWorks.s3Title'), text: t('howItWorks.s3Text') },
  ]

  const ArrowIcon = isRtl ? ArrowLeft : ArrowUpLeft
  const ArrowIconAlt = isRtl ? ArrowUpLeft : ArrowLeft

  return (
    <main dir={isRtl ? 'rtl' : 'ltr'} className="min-h-screen bg-background text-foreground selection:bg-brand-solid selection:text-white">

      {/* ══ Official Institutional Header ══ */}
      <SiteHeader active="home" />

      {/* ══ Scroll-Driven QR Verification Hero (280vh with Sticky 100vh Stage) ══ */}
      <ScrollQrHero />

      {/* ══ Official Trust Announcement Bar ══ */}
      <section aria-label="إشعار الاعتماد" className="border-b border-line bg-warning-soft px-4 py-3 text-sm text-warning font-semibold">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-amber-600 animate-ping" />
            <span>بنية موثوقة: إصدار وتحقق من الشهادات الرقمية عبر المرجع الوطني المعتمد (EJBCA CA) وفق معايير CAdES-BES.</span>
          </div>
          <a href={`/${locale}/guide`} className="hidden text-xs underline underline-offset-4 font-bold hover:text-ink md:inline">
            اطلع على معايير الربط ←
          </a>
        </div>
      </section>
      {/* ══ Why Section ══ */}
      <section id="why" className="relative border-b border-line bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-3 inline-block rounded-full bg-brand-soft px-3.5 py-1 text-xs font-bold text-brand-solid border border-brand-solid/20">
              {t('features.title')}
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              {t('features.heading')}{' '}
              <span className="text-brand">{t('features.headingLine2')}</span>
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="group rounded-2xl border border-line bg-card p-6 sm:p-7 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-brand-solid/60 hover:shadow-md"
              >
                <div className="mb-5 grid size-12 place-items-center rounded-xl bg-brand-soft text-brand-solid border border-brand-solid/15 transition-transform group-hover:scale-105">
                  <Icon className="size-6" />
                </div>
                <h3 className="text-lg font-bold text-ink">{title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ How Section ══ */}
      <section id="how" className="relative border-b border-line bg-surface py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20 items-center">
            <div>
              <span className="mb-3 inline-block rounded-full bg-brand-soft px-3.5 py-1 text-xs font-bold text-brand-solid border border-brand-solid/20">
                {t('howItWorks.badge')}
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                {t('howItWorks.title')}<br />
                <span className="text-brand">{t('howItWorks.titleLine2')}</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink-muted">
                {t('howItWorks.desc')}
              </p>
            </div>

            <div className="space-y-6">
              {steps.map(({ icon: Icon, title, text }, index) => (
                <div
                  key={index}
                  className="flex items-start gap-5 rounded-2xl border border-line bg-paper/50 p-5 sm:p-6 transition-all hover:bg-paper hover:border-brand-solid/40"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand-solid font-black text-sm border border-brand-solid/20">
                    {['١', '٢', '٣'][index] ?? index + 1}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-ink">{title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ Security Section ══ */}
      <section id="security" className="relative bg-brand-deep text-white py-20 lg:py-28 overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="mb-3 inline-block rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold text-on-deep-muted backdrop-blur-sm">
                {t('security.badge')}
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {t('security.title')}<br />
                <span className="text-on-deep-muted">{t('security.titleLine2')}</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-on-deep-muted">
                {t('security.desc')}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                ['PKI', t('security.pki')],
                ['OCSP', t('security.ocsp')],
                ['CAdES-BES', t('security.cades')],
                ['SHA-256', t('security.sha')],
              ].map(([big, small]) => (
                <div
                  key={big}
                  className="rounded-2xl border border-white/15 bg-white/10 p-5 sm:p-6 backdrop-blur-sm transition-all hover:bg-white/15 hover:border-white/25"
                >
                  <p className="font-mono text-xl font-black text-emerald-400" dir="ltr">{big}</p>
                  <p className="mt-2 text-xs leading-relaxed text-on-deep-muted">{small}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTAs Section ══ */}
      <section id="start" className="mx-auto max-w-6xl px-4 py-20 lg:px-6 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Developer CTA */}
          <div className="flex flex-col justify-between rounded-3xl border border-line bg-surface p-8 sm:p-10 shadow-xs">
            <div>
              <span className="mb-3 inline-block rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand-solid">
                {t('nav.devCenter')}
              </span>
              <h3 className="text-2xl font-extrabold text-ink sm:text-3xl">{t('guideCta.title')}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{t('guideCta.desc')}</p>
            </div>
            <div className="mt-8">
              <a
                href={`/${locale}/guide`}
                className="inline-flex items-center gap-2 rounded-xl bg-brand-solid px-6 py-3.5 text-sm font-bold text-white shadow-xs transition-all hover:bg-brand active:scale-[0.98]"
              >
                {t('guideCta.button')} <ArrowIcon className="size-4" />
              </a>
            </div>
          </div>

          {/* User Download App CTA */}
          <div className="flex flex-col justify-between rounded-3xl bg-brand-deep text-white border border-brand-solid/30 p-8 sm:p-10 shadow-lg">
            <div>
              <span className="mb-3 inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-on-deep-muted">
                تطبيق المستندات
              </span>
              <h3 className="text-2xl font-extrabold text-white sm:text-3xl">{t('cta.title')}</h3>
              <p className="mt-3 text-sm leading-relaxed text-on-deep-muted">{t('cta.desc')}</p>
            </div>
            <div className="mt-8 flex items-center gap-5">
              <div className="rounded-2xl bg-white p-2.5 shadow-md">
                <img src="/QR-code-linkeDownloadApp.jpeg" alt="QR Code Download App" className="size-24 shrink-0 object-cover" />
              </div>
              <p className="text-xs font-semibold leading-relaxed text-on-deep-muted max-w-[180px]">
                {t('cta.downloadApp')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ Footer ══ */}
      <footer className="border-t border-line bg-surface py-8 text-sm text-ink-muted">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 lg:px-6">
          <div className="flex items-center gap-2 font-bold text-ink">
            <span className="grid size-7 place-items-center rounded-lg bg-brand-soft text-brand-solid border border-brand-solid/20">
              <ShieldCheck className="size-4" strokeWidth={2.2} />
            </span>
            <span>منصة ثقة الرقمية</span>
          </div>
          <p className="text-xs">{t('footer.tagline')}</p>
          <p className="text-xs">{t('footer.rights')}</p>
        </div>
      </footer>
    </main>
  )
}
