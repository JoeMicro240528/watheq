'use client'

import { useState, useRef } from 'react'
import { ShieldCheck, UserPlus, FilePlus, PenTool, CheckCircle, XCircle, Server, X, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useTranslations, useLocale } from 'next-intl'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export function FlowDiagram({ codeBlocks }: { codeBlocks?: React.ReactNode[] }) {
  const t = useTranslations('flowDiagram')
  const locale = useLocale()
  const isRtl = locale === 'ar'
  const dir = isRtl ? 'rtl' : 'ltr'

  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [selectedNode, setSelectedNode] = useState<any>(null)
  const [isClosingModal, setIsClosingModal] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const modalBgRef = useRef<HTMLDivElement>(null)

  const nodes = [
    { id: 1, guideStep: 1, title: t('n1Title'), desc: t('n1Desc'), icon: ShieldCheck, color: 'from-emerald-700 to-green-600', details: t('n1Details'), api: 'CLI / OpenSSL' },
    { id: 2, guideStep: 2, title: t('n2Title'), desc: t('n2Desc'), icon: UserPlus, color: 'from-green-700 to-emerald-500', details: t('n2Details'), api: 'POST /api/certs/enroll' },
    { id: 3, guideStep: 4, title: t('n3Title'), desc: t('n3Desc'), icon: FilePlus, color: 'from-emerald-800 to-teal-600', details: t('n3Details'), api: 'POST /api/documents/initiate' },
    { id: 4, guideStep: 5, title: t('n4Title'), desc: t('n4Desc'), icon: PenTool, color: 'from-green-800 to-emerald-600', details: t('n4Details'), api: 'POST /api/documents/{docId}/signatures' },
    { id: 5, guideStep: 6, title: t('n5Title'), desc: t('n5Desc'), icon: XCircle, color: 'from-rose-600 to-red-500', details: t('n5Details'), api: 'POST /api/documents/{docId}/revoke' },
    { id: 6, guideStep: 7, title: t('n6Title'), desc: t('n6Desc'), icon: CheckCircle, color: 'from-emerald-600 to-green-500', details: t('n6Details'), api: 'POST /api/documents/verify' }
  ]

  // Entry Animations
  useGSAP(() => {
    const tl = gsap.timeline()

    tl.fromTo('.gsap-node',
      { y: 30, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.2, ease: 'back.out(1.2)' },
      0
    )

    tl.fromTo('.gsap-line',
      { scaleY: 0, opacity: 0 },
      { scaleY: 1, opacity: 1, transformOrigin: 'top center', duration: 0.5, stagger: 0.2, ease: 'power2.out' },
      0.2
    )

    tl.fromTo('.gsap-branch-hz',
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, transformOrigin: 'center center', duration: 0.6, ease: 'power2.out' },
      1.2
    )

    tl.fromTo('.gsap-branch-vt',
      { scaleY: 0, opacity: 0 },
      { scaleY: 1, opacity: 1, transformOrigin: 'top center', duration: 0.4, stagger: 0.1, ease: 'power2.out' },
      1.4
    )
  }, { scope: containerRef })

  // Modal Entry Animation
  useGSAP(() => {
    if (selectedNode && !isClosingModal) {
      gsap.fromTo(modalBgRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
      gsap.fromTo(modalRef.current,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.1)' }
      )
    }
  }, [selectedNode, isClosingModal])

  const closeModal = () => {
    setIsClosingModal(true)
    gsap.to(modalBgRef.current, { opacity: 0, duration: 0.3 })
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.95,
      y: 20,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setSelectedNode(null)
        setIsClosingModal(false)
      }
    })
  }

  const renderNode = (nodeIndex: number, className: string = '') => {
    const node = nodes[nodeIndex]
    const isActive = activeStep === node.id
    const Icon = node.icon

    return (
      <div
        onMouseEnter={() => setActiveStep(node.id)}
        onMouseLeave={() => setActiveStep(null)}
        onClick={() => setSelectedNode(node)}
        className={cn(
          'gsap-node group relative z-10 mx-auto flex w-[280px] cursor-pointer flex-col items-center gap-4 rounded-3xl border border-line bg-surface p-5 shadow-xs transition-all duration-300 hover:scale-105 active:scale-95 sm:w-[320px]',
          isActive
            ? 'border-brand-solid/80 shadow-lg scale-105'
            : 'hover:border-brand-solid/50 hover:shadow-md',
          className
        )}
      >
        <div className={cn(
          'relative grid size-16 place-items-center rounded-2xl bg-gradient-to-br shadow-md transition-transform duration-300',
          node.color,
          isActive ? 'scale-110' : 'group-hover:scale-110'
        )}>
          <div className="absolute inset-0 rounded-2xl bg-black/10" />
          <Icon className="relative size-8 text-white" strokeWidth={2.2} />
          {isActive && <div className="absolute inset-0 -z-10 animate-ping rounded-2xl bg-white/30" />}
        </div>

        <div className="relative text-center">
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-[10px] font-bold text-brand-solid border border-brand-solid/20">
            {t('step')} {node.id}
          </div>
          <h3 className="text-lg font-bold text-ink">{node.title}</h3>
          <p className="mt-1 text-xs text-ink-muted">{node.desc}</p>
        </div>

        <div className={cn(
          'mt-1 flex items-center gap-1 text-[10px] font-bold text-brand transition-opacity duration-300',
          isActive ? 'opacity-100' : 'opacity-0'
        )}>
          <ArrowUpRight className="size-3 rtl:-scale-x-100" />
          {t('clickHint')}
        </div>
      </div>
    )
  }

  return (
    <>
      <div ref={containerRef} className="relative mx-auto mt-12 max-w-4xl p-4 md:p-10" dir={dir}>

        <div className="relative z-10 flex flex-col items-center gap-12">
          {/* Step 1 */}
          <div className="relative flex w-full flex-col items-center">
            {renderNode(0)}
            <div className="gsap-line absolute -bottom-12 h-12 w-0.5 origin-top bg-gradient-to-b from-emerald-700/60 to-green-700/60" />
          </div>

          {/* Step 2 */}
          <div className="relative flex w-full flex-col items-center">
            {renderNode(1)}
            <div className="gsap-line absolute -bottom-12 h-12 w-0.5 origin-top bg-gradient-to-b from-green-700/60 to-emerald-800/60" />
          </div>

          {/* Step 3 */}
          <div className="relative flex w-full flex-col items-center">
            {renderNode(2)}
            <div className="gsap-line absolute -bottom-12 h-12 w-0.5 origin-top bg-gradient-to-b from-emerald-800/60 to-green-800/60" />
          </div>

          {/* Step 4 + branch */}
          <div className="relative flex w-full flex-col items-center">
            {renderNode(3)}

            <div className="relative mt-8 flex w-full max-w-[500px] justify-center">
              <div className="gsap-branch-hz absolute top-0 h-0.5 w-[80%] bg-gradient-to-r from-rose-500/50 via-border to-green-500/50" />
              <div className="gsap-branch-vt absolute -top-8 h-8 w-0.5 origin-top bg-border" />
              <div className="gsap-branch-vt absolute right-[10%] top-0 h-8 w-0.5 origin-top bg-rose-500/50 md:right-[20%]" />
              <div className="gsap-branch-vt absolute left-[10%] top-0 h-8 w-0.5 origin-top bg-green-500/50 md:left-[20%]" />
            </div>
          </div>

          {/* Step 5 and 6 (Branches) */}
          <div className="mt-8 flex w-full flex-col items-center justify-between gap-8 md:flex-row md:justify-center md:gap-16">
            <div className="relative">{renderNode(4)}</div>
            <div className="relative">{renderNode(5)}</div>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {selectedNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" dir={dir}>
          <div
            ref={modalBgRef}
            onClick={closeModal}
            className="absolute inset-0 bg-background/80 opacity-0 backdrop-blur-md"
          />

          <div
            ref={modalRef}
            className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-2xl opacity-0 text-ink"
          >
            {/* Modal Header */}
            <div className="flex shrink-0 items-center gap-4 border-b border-line bg-paper/60 p-6">
              <div className={cn('grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-md', selectedNode.color)}>
                <selectedNode.icon className="size-6" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-black text-ink">{selectedNode.title}</h2>
                <div className="mt-1 flex items-center gap-2 font-mono text-xs text-brand-solid">
                  <Server className="size-4" />
                  <span dir="ltr">{selectedNode.api}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeModal}
                className="shrink-0 rounded-xl hover:bg-brand-soft"
              >
                <X className="size-4" />
              </Button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-6">
              <span className="mb-4 inline-block rounded-full border border-brand-solid/20 bg-brand-soft px-3 py-1 text-xs font-bold text-brand-solid">
                {t('step')} {selectedNode.id}
              </span>
              <p className="text-base leading-relaxed text-ink-muted">
                {selectedNode.details}
              </p>
              <div className="mt-6">
                {codeBlocks && codeBlocks[selectedNode.id - 1]}
              </div>

              <div className="mt-8 flex justify-end">
                <a
                  href={`/${locale}/guide#step-${selectedNode.guideStep}`}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand-solid px-6 text-sm font-bold text-white shadow-xs transition-all hover:bg-brand active:scale-[0.98]"
                >
                  {t('viewInGuide')}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
