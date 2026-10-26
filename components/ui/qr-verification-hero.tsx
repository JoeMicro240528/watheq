'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  Smartphone,
  Laptop,
  Lock,
  FileText,
  BadgeCheck,
  QrCode,
  Zap,
} from 'lucide-react'
import { useLocale } from 'next-intl'
import { cn } from '@/lib/utils'

export type VerificationPhase = 'scanning' | 'validating' | 'verified'

export function QrVerificationHero() {
  const locale = useLocale()
  const isRtl = locale === 'ar'
  const shouldReduceMotion = useReducedMotion()

  const [phase, setPhase] = useState<VerificationPhase>('scanning')
  const [progress, setProgress] = useState(15)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Cycle through the phases: scanning (0-2.8s) -> validating (2.8-4.5s) -> verified (4.5-7.5s) -> loop
  useEffect(() => {
    if (isPaused || shouldReduceMotion) return

    let currentPhase: VerificationPhase = phase

    if (currentPhase === 'scanning') {
      const pInterval = setInterval(() => {
        setProgress((prev) => (prev < 65 ? prev + 4 : prev))
      }, 150)

      timerRef.current = setTimeout(() => {
        clearInterval(pInterval)
        setPhase('validating')
        setProgress(85)
      }, 2800)

      return () => {
        clearInterval(pInterval)
        if (timerRef.current) clearTimeout(timerRef.current)
      }
    } else if (currentPhase === 'validating') {
      timerRef.current = setTimeout(() => {
        setProgress(100)
        setPhase('verified')
      }, 1400)

      return () => {
        if (timerRef.current) clearTimeout(timerRef.current)
      }
    } else if (currentPhase === 'verified') {
      timerRef.current = setTimeout(() => {
        setPhase('scanning')
        setProgress(15)
      }, 3400)

      return () => {
        if (timerRef.current) clearTimeout(timerRef.current)
      }
    }
  }, [phase, isPaused, shouldReduceMotion])

  const handleManualReplay = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setPhase('scanning')
    setProgress(15)
  }

  return (
    <div
      className="relative mx-auto w-full max-w-[660px] select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label={isRtl ? 'محاكاة التحقق من الوثيقة عبر الرمز QR' : 'QR Document Verification Simulation'}
    >
      {/* Ambient background glow matching phase */}
      <motion.div
        animate={{
          backgroundColor:
            phase === 'verified'
              ? 'rgba(16, 185, 129, 0.22)'
              : phase === 'validating'
              ? 'rgba(14, 165, 233, 0.2)'
              : 'rgba(56, 189, 248, 0.18)',
        }}
        transition={{ duration: 0.6 }}
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] blur-3xl"
      />

      {/* Main Container Card — Glassmorphic Dark / Deep Theme (No harsh white bg) */}
      <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-slate-950/40 p-5 sm:p-7 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.65)] backdrop-blur-xl transition-all">

        {/* ══ Top Sub-header & Status ══ */}
        <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span
              className={cn(
                'grid size-9 place-items-center rounded-xl border transition-colors shadow-sm',
                phase === 'verified'
                  ? 'border-emerald-400/40 bg-emerald-500/20 text-emerald-400'
                  : 'border-cyan-400/40 bg-cyan-500/20 text-cyan-400'
              )}
            >
              <ShieldCheck className="size-5" strokeWidth={2.3} />
            </span>
            <div>
              <p className="text-sm font-bold text-white tracking-wide">
                {isRtl ? 'المرجع الوطني للتحقق الرقمي' : 'National Digital Verification'}
              </p>
              <p className="font-mono text-xs text-white/60" dir="ltr">
                ID: DOC-2026-98A · SHA-256
              </p>
            </div>
          </div>

          {/* Mode Pill & Replay button */}
          <div className="flex items-center gap-2">
            <span className="hidden rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur-sm sm:inline-flex">
              {isRtl ? 'محاكاة تفاعلية' : 'Interactive Demo'}
            </span>
            <button
              onClick={handleManualReplay}
              title={isRtl ? 'إعادة تشغيل المحاكاة' : 'Replay Animation'}
              className="grid size-8 place-items-center rounded-xl border border-white/15 bg-white/10 text-white/80 transition-all hover:bg-white/20 hover:text-white active:rotate-180"
              aria-label="Replay"
            >
              <RefreshCw className="size-4" />
            </button>
          </div>
        </div>

        {/* ══ Visual 3D Stage Composition (Expanded Frame & Seamless Dark Backdrop) ══ */}
        <div className="relative mx-auto flex h-[330px] w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-4 sm:h-[380px] lg:h-[400px]">

          {/* Background Grid Accent */}
          <div
            className="pointer-events-none absolute inset-0 opacity-25 [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_80%)]"
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)',
              backgroundSize: '1.75rem 1.75rem',
            }}
          />

          {/* ══ Laptop Verification Display (Inspired by End Frame) ══ */}
          <motion.div
            initial={false}
            animate={{
              scale: phase === 'verified' ? 1.02 : 0.98,
              y: phase === 'verified' ? 0 : 4,
            }}
            transition={{ duration: 0.5 }}
            className="absolute inset-x-6 bottom-4 top-4 flex flex-col rounded-2xl border-[2px] border-slate-700/80 bg-slate-950 shadow-2xl overflow-hidden sm:inset-x-10"
          >
            {/* Laptop Screen Header Bar */}
            <div className="flex h-6 items-center justify-between border-b border-slate-800 bg-slate-900/90 px-3.5">
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-red-500/80" />
                <span className="size-2.5 rounded-full bg-amber-500/80" />
                <span className="size-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="font-mono text-[10px] text-slate-400 sm:text-xs" dir="ltr">
                https://thiqa.gov.sd/verify
              </span>
              <Lock className="size-3 text-emerald-400" />
            </div>

            {/* Laptop Screen Content (Transitions with Phase) */}
            <div className="relative flex flex-1 flex-col items-center justify-center p-4 text-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">

              {/* Ambient radial glow on success */}
              <AnimatePresence>
                {phase === 'verified' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1.3 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="pointer-events-none absolute size-56 rounded-full bg-emerald-500/25 blur-3xl"
                  />
                )}
              </AnimatePresence>

              {/* Speech bubble badge with QR from End Frame (Top-End corner) */}
              <AnimatePresence>
                {phase === 'verified' && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0, y: -10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="absolute top-2.5 end-3 sm:end-4 flex items-center gap-1.5 rounded-xl bg-blue-600 px-3 py-1 text-xs font-bold text-white shadow-md ring-2 ring-white/20"
                  >
                    <QrCode className="size-3.5" />
                    <span>QR Valid</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Phase Content */}
              <AnimatePresence mode="wait">
                {phase === 'verified' ? (
                  /* ── Verified State (End Frame) ── */
                  <motion.div
                    key="verified-state"
                    initial={{ opacity: 0, y: 15, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -15, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center"
                  >
                    {/* 3D-styled animated green checkmark */}
                    <div className="relative mb-3 grid size-18 sm:size-20 place-items-center rounded-full bg-gradient-to-tr from-emerald-600 to-green-400 text-white shadow-xl shadow-emerald-500/40 ring-4 ring-emerald-400/30">
                      <motion.svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="size-9 sm:size-10"
                      >
                        <motion.path
                          d="M4 12.5l5.5 5.5L20 6.5"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.45, ease: 'easeOut' }}
                        />
                      </motion.svg>
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: [1, 1.35, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute inset-0 rounded-full border-2 border-emerald-300/40"
                      />
                    </div>

                    <h4 className="text-lg sm:text-xl font-extrabold text-white tracking-wide">
                      Document is Authentic
                    </h4>
                    <p className="mt-1 text-sm font-bold text-emerald-400">
                      {isRtl ? 'تم التحقق من الوثيقة بنجاح' : 'Verified Successfully'}
                    </p>

                    <div className="mt-3 flex items-center gap-2 rounded-xl bg-white/10 px-3.5 py-1.5 font-mono text-xs text-slate-200 backdrop-blur-sm border border-white/10">
                      <BadgeCheck className="size-4 text-emerald-400" />
                      <span>EJBCA CA · CAdES-BES · OCSP GOOD</span>
                    </div>
                  </motion.div>
                ) : (
                  /* ── Scanning / Validating State (Start Frame) ── */
                  <motion.div
                    key="scanning-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex w-full flex-col items-center px-4"
                  >
                    <div className="mb-3 flex items-center gap-2.5">
                      <span className="relative flex size-3">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-sky-400 opacity-75" />
                        <span className="relative inline-flex size-3 rounded-full bg-sky-500" />
                      </span>
                      <p className="text-sm font-bold text-slate-100">
                        {phase === 'scanning'
                          ? isRtl
                            ? 'قيد قراءة الرمز والاستجابة السريعة...'
                            : 'Scanning QR Code...'
                          : isRtl
                          ? 'جاري التحقق من التوقيع وشهادة EJBCA...'
                          : 'Validating PKI & Hash...'}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2 w-full max-w-[240px] overflow-hidden rounded-full bg-slate-800">
                      <motion.div
                        className="h-full bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400"
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: 'easeInOut', duration: 0.3 }}
                      />
                    </div>
                    <span className="mt-1.5 font-mono text-xs font-bold text-slate-300" dir="ltr">
                      {progress}%
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ══ Official Document Paper with 3D QR Code (Center-Left) ══ */}
          <motion.div
            animate={{
              y: phase === 'verified' ? [0, -4, 0] : [0, -2, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute bottom-6 start-6 z-20 flex w-40 flex-col rounded-xl border border-slate-200/90 bg-white p-3 shadow-2xl sm:start-14 sm:w-48"
          >
            {/* Paper fold top-right corner indicator */}
            <div className="absolute top-0 end-0 size-4 rounded-bl-md bg-slate-100 border-b border-s border-slate-300" />

            {/* Document header lines */}
            <div className="mb-2 flex items-center gap-1.5">
              <FileText className="size-3.5 text-slate-500" />
              <div className="h-1.5 w-16 rounded-full bg-slate-200" />
            </div>

            {/* Simulated text lines */}
            <div className="mb-3 space-y-1">
              <div className="h-1 w-full rounded bg-slate-100" />
              <div className="h-1 w-4/5 rounded bg-slate-100" />
              <div className="h-1 w-2/3 rounded bg-slate-100" />
            </div>

            {/* Embedded QR Code Container */}
            <div className="relative mx-auto grid size-22 place-items-center rounded-lg border border-slate-200 bg-slate-50 p-2 shadow-inner sm:size-24">
              {/* Crisp SVG QR Code */}
              <svg viewBox="0 0 33 33" className="size-full text-slate-900" fill="currentColor">
                {/* Top-Left Position Detection Pattern */}
                <rect x="1" y="1" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="2" />
                <rect x="3.5" y="3.5" width="4" height="4" fill="currentColor" />
                {/* Top-Right Position Detection Pattern */}
                <rect x="23" y="1" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="2" />
                <rect x="25.5" y="3.5" width="4" height="4" fill="currentColor" />
                {/* Bottom-Left Position Detection Pattern */}
                <rect x="1" y="23" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="2" />
                <rect x="3.5" y="25.5" width="4" height="4" fill="currentColor" />
                {/* Data modules */}
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

              {/* ── Active Scanning Laser Beam (Phases: Scanning / Validating) ── */}
              {phase !== 'verified' && (
                <motion.div
                  className="pointer-events-none absolute inset-x-1 h-1 rounded-full bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-400 shadow-[0_0_10px_#38bdf8]"
                  animate={{
                    top: ['8%', '84%', '8%'],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              )}

              {/* ── Green Verification Seal Stamp (Phase: Verified) ── */}
              <AnimatePresence>
                {phase === 'verified' && (
                  <motion.div
                    initial={{ scale: 0, rotate: -25 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 18 }}
                    className="absolute -bottom-2 -end-2 flex size-8 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xl ring-2 ring-white"
                  >
                    <CheckCircle2 className="size-5" strokeWidth={3} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ══ Smartphone Scanner in Foreground (Inspired by Start Frame) ══ */}
          <motion.div
            initial={false}
            animate={{
              x: phase === 'verified' ? -15 : 0,
              opacity: phase === 'verified' ? 0.65 : 1,
              rotate: -4,
            }}
            transition={{ duration: 0.6 }}
            className="absolute -bottom-6 start-3 z-30 hidden w-32 rounded-2xl border-[3px] border-slate-800 bg-slate-900 p-2 shadow-2xl sm:block sm:w-36"
          >
            {/* Phone Speaker Notch */}
            <div className="mx-auto mb-2 h-1 w-8 rounded-full bg-slate-700" />

            {/* Phone Viewfinder Screen */}
            <div className="relative flex h-40 sm:h-44 flex-col items-center justify-center rounded-xl bg-slate-950 p-1.5 overflow-hidden border border-slate-800">
              {/* QR in Viewfinder */}
              <div className="relative grid size-14 place-items-center">
                <QrCode className="size-12 text-slate-400" strokeWidth={1.5} />

                {/* Viewfinder 4 Corner Brackets (Pulsating Blue/Cyan) */}
                <div className="pointer-events-none absolute inset-0">
                  <span className="absolute top-0 start-0 size-3 border-t-2 border-s-2 border-cyan-400 rounded-tl" />
                  <span className="absolute top-0 end-0 size-3 border-t-2 border-e-2 border-cyan-400 rounded-tr" />
                  <span className="absolute bottom-0 start-0 size-3 border-b-2 border-s-2 border-cyan-400 rounded-bl" />
                  <span className="absolute bottom-0 end-0 size-3 border-b-2 border-e-2 border-cyan-400 rounded-br" />
                </div>
              </div>

              {/* Animated Light Cone / Beam projecting from phone */}
              {phase === 'scanning' && (
                <motion.div
                  initial={{ opacity: 0.2 }}
                  animate={{ opacity: [0.25, 0.65, 0.25] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="pointer-events-none absolute -end-8 top-1/2 h-20 w-20 -translate-y-1/2 bg-gradient-to-r from-cyan-400/40 to-transparent blur-md"
                />
              )}
            </div>
          </motion.div>
        </div>

        {/* ══ Live Verification Metrics (Bottom Bar - Frosted Glass) ══ */}
        <div className="mt-4 grid grid-cols-3 gap-2.5 border-t border-white/10 pt-4 text-center text-xs">
          <div className="rounded-xl border border-white/10 bg-white/[0.05] p-2.5 backdrop-blur-sm">
            <span className="text-[11px] text-white/60">
              {isRtl ? 'حالة الوثيقة' : 'Document Status'}
            </span>
            <p
              className={cn(
                'font-bold transition-colors text-sm',
                phase === 'verified' ? 'text-emerald-400' : 'text-cyan-400'
              )}
            >
              {phase === 'verified'
                ? isRtl
                  ? 'معتمدة وموثقة'
                  : 'Authentic'
                : isRtl
                ? 'قيد التحقق'
                : 'Scanning...'}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.05] p-2.5 backdrop-blur-sm">
            <span className="text-[11px] text-white/60">
              {isRtl ? 'صلاحية OCSP' : 'OCSP Status'}
            </span>
            <p className="font-mono font-bold text-white text-sm" dir="ltr">
              {phase === 'verified' ? 'GOOD' : 'CHECKING'}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.05] p-2.5 backdrop-blur-sm">
            <span className="text-[11px] text-white/60">
              {isRtl ? 'زمن الاستجابة' : 'Response Time'}
            </span>
            <p className="font-mono font-bold text-emerald-400 text-sm" dir="ltr">
              0.84s
            </p>
          </div>
        </div>
      </div>

      {/* Floating Speed & Security Pill */}
      <div className="absolute -bottom-3 -start-3 hidden items-center gap-2.5 rounded-xl border border-white/20 bg-slate-900/90 px-3.5 py-1.5 shadow-xl text-xs font-semibold sm:flex text-white backdrop-blur-md">
        <Zap className="size-4 text-emerald-400" />
        <span>{isRtl ? 'تحقق لحظي مشفر بواسطة PKI' : 'Instant PKI Verification'}</span>
      </div>
    </div>
  )
}
