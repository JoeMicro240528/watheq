'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  ShieldCheck,
  Check,
  BadgeCheck,
  QrCode,
  Lock,
  FileText,
  CheckCircle2,
  ArrowLeft,
  ArrowUpLeft,
  Cpu,
  Wifi,
  BatteryCharging,
} from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { cn } from '@/lib/utils'

export type VerificationPhase = 'scanning' | 'validating' | 'verified'

export function ScrollQrHero() {
  const t = useTranslations()
  const locale = useLocale()
  const isRtl = locale === 'ar'
  const shouldReduceMotion = useReducedMotion()

  const ArrowIcon = isRtl ? ArrowLeft : ArrowUpLeft
  const ArrowIconAlt = isRtl ? ArrowUpLeft : ArrowLeft

  // Automatic Lifecycle Management (No scroll dependency)
  const [phase, setPhase] = useState<VerificationPhase>('scanning')
  const [progress, setProgress] = useState(15)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isPaused || shouldReduceMotion) return

    if (phase === 'scanning') {
      const pInterval = setInterval(() => {
        setProgress((prev) => (prev < 65 ? prev + 3 : prev))
      }, 120)

      timerRef.current = setTimeout(() => {
        clearInterval(pInterval)
        setPhase('validating')
        setProgress(85)
      }, 3000)

      return () => {
        clearInterval(pInterval)
        if (timerRef.current) clearTimeout(timerRef.current)
      }
    } else if (phase === 'validating') {
      timerRef.current = setTimeout(() => {
        setProgress(100)
        setPhase('verified')
      }, 1800)

      return () => {
        if (timerRef.current) clearTimeout(timerRef.current)
      }
    } else if (phase === 'verified') {
      timerRef.current = setTimeout(() => {
        setPhase('scanning')
        setProgress(15)
      }, 3800)

      return () => {
        if (timerRef.current) clearTimeout(timerRef.current)
      }
    }
  }, [phase, isPaused, shouldReduceMotion])

  return (
    <section
      id="top"
      className="relative w-full overflow-hidden bg-brand-deep text-white py-6 sm:py-8 lg:py-10 min-h-[calc(100vh-64px)] flex items-center"
      aria-label="قسم التحقق الذكي للوثائق"
    >
      {/* Iconic Rosette Geometric Ellipses Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg
          viewBox="0 0 400 400"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.7"
          className="absolute -top-36 -end-32 w-[54rem] max-w-none text-on-deep-line opacity-20"
        >
          <ellipse cx="200" cy="200" rx="190" ry="62" transform="rotate(0 200 200)" />
          <ellipse cx="200" cy="200" rx="190" ry="62" transform="rotate(20 200 200)" />
          <ellipse cx="200" cy="200" rx="190" ry="62" transform="rotate(40 200 200)" />
          <ellipse cx="200" cy="200" rx="190" ry="62" transform="rotate(60 200 200)" />
          <ellipse cx="200" cy="200" rx="190" ry="62" transform="rotate(80 200 200)" />
          <ellipse cx="200" cy="200" rx="190" ry="62" transform="rotate(100 200 200)" />
          <ellipse cx="200" cy="200" rx="190" ry="62" transform="rotate(120 200 200)" />
          <ellipse cx="200" cy="200" rx="190" ry="62" transform="rotate(140 200 200)" />
          <ellipse cx="200" cy="200" rx="190" ry="62" transform="rotate(160 200 200)" />
        </svg>
      </div>

      {/* Dynamic Ambient Light Glow */}
      <motion.div
        animate={{
          backgroundColor:
            phase === 'verified'
              ? 'rgba(16, 185, 129, 0.32)'
              : phase === 'validating'
              ? 'rgba(14, 165, 233, 0.28)'
              : 'rgba(56, 189, 248, 0.22)',
        }}
        transition={{ duration: 0.6 }}
        className="pointer-events-none absolute -end-16 top-1/2 -translate-y-1/2 size-[750px] rounded-full blur-[140px]"
      />

      {/* Main 2-Column Responsive Layout */}
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.45fr] xl:grid-cols-[1fr_1.55fr] lg:gap-10 xl:gap-14 h-full">

        {/* ════ LEFT COLUMN: Institutional Copy & CTAs ════ */}
        <div className="flex flex-col justify-center">
          {/* National Trust Badge */}
          <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold text-on-deep-muted backdrop-blur-sm">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            {t('hero.badge')}
          </div>

          {/* Main Headline */}
          <h1 className="mb-3.5 font-display text-3xl font-extrabold leading-[1.16] sm:text-4xl lg:text-5xl xl:text-5.5xl text-white">
            {t('hero.title')}<br />
            <span className="text-on-deep-muted">{t('hero.titleAccent')}</span>
          </h1>

          {/* Description */}
          <p className="mb-6 max-w-xl text-base leading-relaxed text-on-deep-muted sm:text-lg">
            {t('hero.desc')}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5">
            <a
              href="#start"
              className="inline-flex shrink-0 select-none items-center justify-center gap-2.5 rounded-xl bg-brand-solid px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-black/25 transition-all hover:bg-brand hover:-translate-y-0.5 active:scale-[0.98]"
            >
              {t('hero.cta')} <ArrowIcon className="size-5" />
            </a>
            <a
              href="#how"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/15"
            >
              {t('hero.ctaSecondary')} <ArrowIconAlt className="size-5 text-on-deep-muted" />
            </a>
          </div>

          {/* Trust Badges */}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs font-semibold text-on-deep-muted">
            <span className="flex items-center gap-2">
              <Check className="size-4 text-emerald-400" strokeWidth={2.5} /> {t('hero.badge1')}
            </span>
            <span className="flex items-center gap-2">
              <Check className="size-4 text-emerald-400" strokeWidth={2.5} /> {t('hero.badge2')}
            </span>
          </div>
        </div>

        {/* ════ RIGHT COLUMN: Large & Borderless Animation Frame ════ */}
        <div
          className="relative w-full flex flex-col justify-center items-center select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* ══ THE BORDERLESS 3D STAGE (Spacious Width & Height) ══ */}
          <div className="relative flex w-full items-center justify-center overflow-visible">

            {/* Perspective Floor Grid (Soft subtle glow on hero bg) */}
            <div
              className="pointer-events-none absolute -bottom-6 inset-x-0 h-40 opacity-25 [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_80%)]"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.18) 1px, transparent 1px)',
                backgroundSize: '2rem 2rem',
              }}
            />

            {/* ──────────────────────────────────────────────────────────── */}
            {/* 1. THE 3D LAPTOP (Enlarged Width & Height, No Outer Border)  */}
            {/* ──────────────────────────────────────────────────────────── */}
            <div className="relative flex flex-col items-center w-full max-w-[680px] sm:max-w-[740px] lg:max-w-[800px] xl:max-w-[850px] z-10 drop-shadow-[0_25px_65px_rgba(0,0,0,0.65)]">

              {/* Laptop Screen Outer Bezel (Borderless & Rounded) */}
              <div className="relative w-full rounded-2xl sm:rounded-3xl bg-slate-950 shadow-2xl overflow-hidden">

                {/* Laptop Top Browser Header Bar */}
                <div className="flex h-7 sm:h-8 items-center justify-between bg-slate-900/95 px-4">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-red-500/80" />
                    <span className="size-2.5 rounded-full bg-amber-500/80" />
                    <span className="size-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-slate-950/80 px-3 py-1 shadow-inner">
                    <Lock className="size-3 text-emerald-400" />
                    <span className="font-mono text-xs text-slate-300" dir="ltr">
                      https://thiqa.gov.sd/verify
                    </span>
                  </div>
                  <div className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                {/* Laptop Screen Canvas Area (Generous Height: 280px to 380px) */}
                <div className="relative flex h-[270px] sm:h-[320px] lg:h-[360px] xl:h-[380px] w-full flex-col items-center justify-center p-4 sm:p-6 text-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">

                  {/* ── STATE A: Initial Portal Document View (Scanning Phase) ── */}
                  <AnimatePresence>
                    {phase === 'scanning' && (
                      <motion.div
                        key="portal-view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="absolute inset-0 flex flex-col items-center justify-between p-5 sm:p-6"
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-2.5">
                            <span className="grid size-8 place-items-center rounded-xl bg-brand-solid/30 text-emerald-400">
                              <ShieldCheck className="size-5" />
                            </span>
                            <span className="text-sm font-bold text-white sm:text-base">
                              {isRtl ? 'بوابة التحقق الوطني السوداني' : 'National Verification Portal'}
                            </span>
                          </div>
                          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-lg">
                            WAITING FOR SCAN
                          </span>
                        </div>

                        {/* Middle: Document Preview with QR on Screen */}
                        <div className="flex items-center justify-center gap-6 my-auto">
                          <div className="relative rounded-2xl bg-slate-900/90 p-2.5 shadow-inner">
                            <div className="size-20 sm:size-24 lg:size-28 grid place-items-center bg-white p-1.5 rounded-xl shadow-md">
                              <QrCode className="size-full text-slate-950" />
                            </div>
                          </div>
                          <div className="text-start space-y-1.5">
                            <p className="text-base sm:text-lg font-bold text-white">وثيقة رقمية معتمدة</p>
                            <p className="text-xs sm:text-sm font-mono text-slate-400" dir="ltr">DOC-2026-98A</p>
                            <p className="text-xs sm:text-sm text-sky-300">امسح الرمز عبر الهاتف للتحقق</p>
                          </div>
                        </div>

                        <div className="w-full flex items-center justify-between text-xs text-slate-500">
                          <span>EJBCA CA PKI Certified</span>
                          <span dir="ltr">SHA-256 · 4A8F...91C2</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* ── STATE B: PKI Cryptographic HUD & Validation (Validating Phase) ── */}
                  <AnimatePresence>
                    {phase === 'validating' && (
                      <motion.div
                        key="hud-view"
                        initial={{ opacity: 0, scale: 0.94 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.35 }}
                        className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-slate-950/90 backdrop-blur-md"
                      >
                        <div className="relative mb-3.5">
                          <span className="relative flex size-16 items-center justify-center rounded-2xl bg-sky-500/20 text-sky-400 shadow-[0_0_30px_rgba(56,189,248,0.4)]">
                            <Cpu className="size-8 animate-pulse" />
                          </span>
                          <span className="absolute -inset-2 rounded-2xl border border-sky-400/20 animate-ping opacity-40" />
                        </div>

                        <h4 className="text-base font-extrabold text-white sm:text-xl">
                          {progress < 90
                            ? isRtl
                              ? 'قراءة وتدقيق تجزئة SHA-256 للوثيقة...'
                              : 'Computing SHA-256 Hash...'
                            : isRtl
                            ? 'التحقق من اعتماد شهادة EJBCA وحالة OCSP...'
                            : 'Validating PKI & OCSP Status...'}
                        </h4>

                        <p className="mt-1.5 font-mono text-xs sm:text-sm text-sky-300">
                          {progress < 90
                            ? 'SHA-256: 4A8F9B2C10...91C2'
                            : 'X.509 Certificate Chain · CAdES-BES'}
                        </p>

                        {/* Progress Bar inside Laptop Screen */}
                        <div className="mt-4 h-2.5 w-full max-w-[280px] overflow-hidden rounded-full bg-slate-800 shadow-inner">
                          <motion.div
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="h-full bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400 rounded-full"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* ── STATE C: Verified Authentic Result (Verified Phase) ── */}
                  <AnimatePresence>
                    {phase === 'verified' && (
                      <motion.div
                        key="verified-view"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.35 }}
                        className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/40"
                      >
                        {/* Radial Glow on Success */}
                        <div className="pointer-events-none absolute size-64 rounded-full bg-emerald-500/25 blur-3xl" />

                        {/* 3D Animated Emerald Checkmark */}
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                          className="relative mb-3 grid size-16 sm:size-20 place-items-center rounded-full bg-gradient-to-tr from-emerald-600 to-green-400 text-white shadow-2xl shadow-emerald-500/40 ring-4 ring-emerald-400/30"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="size-8 sm:size-10"
                          >
                            <motion.path
                              d="M4 12.5l5.5 5.5L20 6.5"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.45, ease: 'easeOut' }}
                            />
                          </svg>
                        </motion.div>

                        {/* Headline: Document is Authentic */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15, duration: 0.35 }}
                          className="flex flex-col items-center"
                        >
                          <h4 className="text-xl sm:text-2xl font-black text-white tracking-wide">
                            Document is Authentic
                          </h4>
                          <p className="mt-1 text-sm sm:text-base font-bold text-emerald-400">
                            {isRtl ? 'تم التحقق من صحة الوثيقة بنجاح' : 'Verified Successfully'}
                          </p>

                          <div className="mt-3 flex items-center gap-2 rounded-xl bg-white/10 px-4 py-1.5 font-mono text-xs text-slate-200 backdrop-blur-sm">
                            <BadgeCheck className="size-4 text-emerald-400" />
                            <span>EJBCA CA · CAdES-BES · OCSP GOOD</span>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Laptop Keyboard & Trackpad Base (Grounds device in 3D perspective) */}
              <div className="relative -mt-0.5 h-3.5 sm:h-4 w-[104%] rounded-b-2xl bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 shadow-2xl flex items-center justify-center">
                <div className="h-1.5 w-24 rounded-full bg-slate-600" />
              </div>
            </div>

            {/* ──────────────────────────────────────────────────────────── */}
            {/* 2. OFFICIAL CERTIFICATE PAPER (Borderless & Enlarged)        */}
            {/* ──────────────────────────────────────────────────────────── */}
            <div className="absolute bottom-4 sm:bottom-6 start-2 sm:start-6 lg:start-8 z-20 flex w-44 sm:w-52 lg:w-56 flex-col rounded-2xl bg-white p-3 sm:p-3.5 shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
              {/* Paper fold top corner */}
              <div className="absolute top-0 end-0 size-4.5 rounded-bl-lg bg-slate-100 shadow-xs" />

              {/* Document header lines */}
              <div className="mb-2 flex items-center gap-2">
                <FileText className="size-4 text-slate-500" />
                <div className="h-2 w-20 rounded-full bg-slate-200" />
              </div>

              {/* Simulated text lines */}
              <div className="mb-2.5 space-y-1.5">
                <div className="h-1.5 w-full rounded bg-slate-100" />
                <div className="h-1.5 w-4/5 rounded bg-slate-100" />
              </div>

              {/* Embedded QR Code Container */}
              <div className="relative mx-auto grid size-24 sm:size-28 place-items-center rounded-xl bg-slate-50 p-2 shadow-inner">
                <svg viewBox="0 0 33 33" className="size-full text-slate-900" fill="currentColor">
                  <rect x="1" y="1" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="2" />
                  <rect x="3.5" y="3.5" width="4" height="4" fill="currentColor" />
                  <rect x="23" y="1" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="2" />
                  <rect x="25.5" y="3.5" width="4" height="4" fill="currentColor" />
                  <rect x="1" y="23" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="2" />
                  <rect x="3.5" y="25.5" width="4" height="4" fill="currentColor" />
                  <rect x="13" y="2" width="2" height="2" />
                  <rect x="17" y="2" width="2" height="2" />
                  <rect x="13" y="6" width="3" height="2" />
                  <rect x="18" y="6" width="2" height="2" />
                  <rect x="2" y="13" width="2" height="3" />
                  <rect x="6" y="14" width="2" height="2" />
                  <rect x="11" y="11" width="3" height="3" />
                  <rect x="16" y="12" width="2" height="2" />
                  <rect x="20" y="11" width="2" height="3" />
                  <rect x="24" y="13" width="3" height="2" />
                  <rect x="12" y="17" width="2" height="3" />
                  <rect x="16" y="16" width="3" height="2" />
                  <rect x="20" y="17" width="2" height="2" />
                  <rect x="28" y="17" width="2" height="3" />
                  <rect x="13" y="22" width="2" height="3" />
                  <rect x="17" y="24" width="3" height="2" />
                  <rect x="24" y="23" width="2" height="2" />
                  <rect x="27" y="25" width="3" height="3" />
                </svg>

                {/* ── Cyan Laser Beam Moving Vertically (Scanning Phase) ── */}
                {phase === 'scanning' && (
                  <motion.div
                    animate={{
                      top: ['10%', '85%', '10%'],
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="pointer-events-none absolute inset-x-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 via-sky-200 to-cyan-400 shadow-[0_0_12px_#38bdf8]"
                  />
                )}

                {/* Green Digital Seal Stamp (Verified Phase) */}
                <AnimatePresence>
                  {phase === 'verified' && (
                    <motion.div
                      initial={{ scale: 0, rotate: -25 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                      className="absolute -bottom-2 -end-2 flex size-8 sm:size-9 items-center justify-center rounded-full bg-emerald-600 text-white shadow-2xl ring-2 ring-white"
                    >
                      <CheckCircle2 className="size-5 sm:size-6" strokeWidth={3} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* ──────────────────────────────────────────────────────────── */}
            {/* 3. SMARTPHONE SCANNER (Borderless & Enlarged in Foreground)  */}
            {/* ──────────────────────────────────────────────────────────── */}
            <motion.div
              animate={{
                y: phase === 'verified' ? 10 : 0,
                opacity: phase === 'verified' ? 0.94 : 1,
              }}
              transition={{ duration: 0.5 }}
              className="absolute -bottom-2 start-0 sm:start-1 z-30 hidden w-32 sm:w-38 rounded-[2.2rem] bg-slate-950 p-2 shadow-[0_30px_70px_rgba(0,0,0,0.95)] sm:block"
            >
              {/* Phone Speaker Notch */}
              <div className="mx-auto mb-2 h-1 w-9 rounded-full bg-slate-700" />

              {/* Phone Screen */}
              <div className="relative flex h-42 sm:h-50 flex-col items-center justify-between rounded-2xl bg-slate-900 p-2 overflow-hidden text-white">

                {/* Phone Top Status Bar */}
                <div className="flex items-center justify-between w-full px-1 text-[9px] text-slate-400 font-mono">
                  <span>11:42</span>
                  <div className="flex items-center gap-1">
                    <Wifi className="size-2.5" />
                    <BatteryCharging className="size-2.5 text-emerald-400" />
                  </div>
                </div>

                {/* Scanner Viewfinder / Camera Screen */}
                <div className="relative my-auto grid size-20 sm:size-24 place-items-center">

                  {/* ── Phone Scanning Viewfinder State ── */}
                  {phase !== 'verified' ? (
                    <div className="relative flex flex-col items-center justify-center">
                      <QrCode className="size-14 sm:size-16 text-slate-400" strokeWidth={1.5} />

                      {/* Viewfinder 4 Corner Brackets */}
                      <div className="pointer-events-none absolute inset-0">
                        <span className="absolute top-0 start-0 size-3 border-t-2 border-s-2 border-cyan-400 rounded-tl shadow-[0_0_8px_#38bdf8]" />
                        <span className="absolute top-0 end-0 size-3 border-t-2 border-e-2 border-cyan-400 rounded-tr shadow-[0_0_8px_#38bdf8]" />
                        <span className="absolute bottom-0 start-0 size-3 border-b-2 border-s-2 border-cyan-400 rounded-bl shadow-[0_0_8px_#38bdf8]" />
                        <span className="absolute bottom-0 end-0 size-3 border-b-2 border-e-2 border-cyan-400 rounded-br shadow-[0_0_8px_#38bdf8]" />
                      </div>
                    </div>
                  ) : (
                    /* ── Phone Verified State ── */
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex flex-col items-center justify-center text-center"
                    >
                      <div className="grid size-11 place-items-center rounded-full bg-emerald-500/20 text-emerald-400 shadow-md">
                        <Check className="size-7" strokeWidth={3} />
                      </div>
                      <span className="mt-1 text-xs font-bold text-emerald-400">
                        {isRtl ? 'تمت المصادقة' : 'Validated'}
                      </span>
                    </motion.div>
                  )}
                </div>

                {/* Phone Bottom Home Pill */}
                <div className="h-1 w-10 rounded-full bg-slate-700 mx-auto" />
              </div>
            </motion.div>

            {/* ──────────────────────────────────────────────────────────── */}
            {/* 4. FLOATING SECURITY BADGE (Top-End corner)                  */}
            {/* ──────────────────────────────────────────────────────────── */}
            <AnimatePresence>
              {phase === 'verified' && (
                <motion.div
                  initial={{ scale: 0, opacity: 0, y: -10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                  className="absolute top-3 end-3 sm:end-6 z-30 flex items-center gap-1.5 rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-xl ring-2 ring-white/20"
                >
                  <QrCode className="size-4" />
                  <span>QR Valid</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
