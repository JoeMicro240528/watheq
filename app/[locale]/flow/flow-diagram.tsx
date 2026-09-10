'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ShieldCheck, UserPlus, FilePlus, PenTool, CheckCircle, XCircle, Server, X } from 'lucide-react'
import { cn } from '@/lib/utils'

import { useTranslations } from 'next-intl'

import { useLocale } from 'next-intl'

export function FlowDiagram({ codeBlocks }: { codeBlocks?: React.ReactNode[] }) {
  const t = useTranslations('flowDiagram')
  const locale = useLocale()
  const isRtl = locale === 'ar'
  const dir = isRtl ? 'rtl' : 'ltr'
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [selectedNode, setSelectedNode] = useState<any>(null)

  const nodes = [
    {
      id: 1,
      title: t('n1Title'),
      desc: t('n1Desc'),
      icon: ShieldCheck,
      color: 'from-blue-500 to-cyan-400',
      details: t('n1Details'),
      api: 'CLI / OpenSSL'
    },
    {
      id: 2,
      title: t('n2Title'),
      desc: t('n2Desc'),
      icon: UserPlus,
      color: 'from-indigo-500 to-blue-400',
      details: t('n2Details'),
      api: 'POST /api/certs/enroll'
    },
    {
      id: 3,
      title: t('n3Title'),
      desc: t('n3Desc'),
      icon: FilePlus,
      color: 'from-purple-500 to-indigo-400',
      details: t('n3Details'),
      api: 'POST /api/documents/initiate'
    },
    {
      id: 4,
      title: t('n4Title'),
      desc: t('n4Desc'),
      icon: PenTool,
      color: 'from-emerald-500 to-teal-400',
      details: t('n4Details'),
      api: 'POST /api/documents/{docId}/signatures'
    },
    {
      id: 5,
      title: t('n5Title'),
      desc: t('n5Desc'),
      icon: XCircle,
      color: 'from-red-500 to-orange-400',
      details: t('n5Details'),
      api: 'POST /api/documents/{docId}/revoke'
    },
    {
      id: 6,
      title: t('n6Title'),
      desc: t('n6Desc'),
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-400',
      details: t('n6Details'),
      api: 'POST /api/documents/verify'
    }
  ]

  // Node Component
  const renderNode = (nodeIndex: number, className: string = "") => {
    const node = nodes[nodeIndex]
    const isActive = activeStep === node.id
    const Icon = node.icon

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: node.id * 0.2 }}
        onMouseEnter={() => setActiveStep(node.id)}
        onMouseLeave={() => setActiveStep(null)}
        onClick={() => setSelectedNode(node)}
        className={cn(
          "relative z-10 mx-auto flex w-[280px] cursor-pointer flex-col items-center gap-4 rounded-3xl border border-white/5 bg-background/60 p-5 backdrop-blur-xl transition-all duration-300 sm:w-[320px]",
          isActive ? "border-primary/50 shadow-2xl shadow-primary/20 scale-105 bg-background/90" : "hover:border-white/10 hover:bg-background/80",
          className
        )}
      >
        <div className={cn(
          "relative grid size-16 place-items-center rounded-2xl bg-gradient-to-br shadow-lg transition-transform duration-300 group-hover:scale-110",
          node.color
        )}>
          <div className="absolute inset-0 rounded-2xl bg-black/10" />
          <Icon className="relative size-8 text-white" />
          {/* Ping effect */}
          {isActive && <div className="absolute inset-0 -z-10 animate-ping rounded-2xl bg-white/30" />}
        </div>

        <div className="text-center">
          <div className="mb-2 inline-flex items-center rounded-full bg-secondary px-3 py-1 text-[10px] font-bold text-primary">
            {t('step')} {node.id}
          </div>
          <h3 className="text-lg font-bold text-foreground">{node.title}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{node.desc}</p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          className="mt-2 text-[10px] font-bold text-accent"
        >
          {t('clickHint')}
        </motion.div>
      </motion.div>
    )
  }

  return (
    <>
      <div className="relative mx-auto mt-12 max-w-4xl p-4 md:p-10" dir={dir}>
        
        {/* SVG Background Lines for Tree */}
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" style={{ zIndex: 0 }}>
          <motion.line x1="50%" y1="120" x2="50%" y2="280" stroke="currentColor" strokeWidth="2" className="text-border/40" strokeDasharray="6,6"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 }} />
          <motion.line x1="50%" y1="280" x2="50%" y2="440" stroke="currentColor" strokeWidth="2" className="text-border/40" strokeDasharray="6,6"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.9 }} />
          <motion.line x1="50%" y1="440" x2="50%" y2="600" stroke="currentColor" strokeWidth="2" className="text-border/40" strokeDasharray="6,6"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1.3 }} />
        </svg>

        <div className="relative z-10 flex flex-col items-center gap-12">
          {/* Step 1 */}
          <div className="relative flex w-full flex-col items-center">
            {renderNode(0)}
            <motion.div initial={{ height: 0 }} animate={{ height: '48px' }} transition={{ duration: 0.5, delay: 0.5 }} className="absolute -bottom-12 w-0.5 bg-gradient-to-b from-blue-500/50 to-indigo-500/50" />
          </div>

          {/* Step 2 */}
          <div className="relative flex w-full flex-col items-center">
            {renderNode(1)}
            <motion.div initial={{ height: 0 }} animate={{ height: '48px' }} transition={{ duration: 0.5, delay: 0.9 }} className="absolute -bottom-12 w-0.5 bg-gradient-to-b from-indigo-500/50 to-purple-500/50" />
          </div>

          {/* Step 3 */}
          <div className="relative flex w-full flex-col items-center">
            {renderNode(2)}
            <motion.div initial={{ height: 0 }} animate={{ height: '48px' }} transition={{ duration: 0.5, delay: 1.3 }} className="absolute -bottom-12 w-0.5 bg-gradient-to-b from-purple-500/50 to-emerald-500/50" />
          </div>

          {/* Step 4 */}
          <div className="relative flex w-full flex-col items-center">
            {renderNode(3)}
            
            {/* The Branching lines */}
            <div className="relative mt-8 flex w-full max-w-[500px] justify-center">
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: '80%' }} 
                transition={{ duration: 0.8, delay: 1.7 }} 
                className="absolute top-0 h-0.5 bg-gradient-to-r from-red-500/40 via-border to-green-500/40" 
              />
              <motion.div 
                initial={{ height: 0 }} 
                animate={{ height: '32px' }} 
                transition={{ duration: 0.3, delay: 1.7 }} 
                className="absolute -top-8 h-8 w-0.5 bg-emerald-500/50" 
              />
              <motion.div 
                initial={{ height: 0 }} 
                animate={{ height: '32px' }} 
                transition={{ duration: 0.3, delay: 2.2 }} 
                className="absolute right-[10%] top-0 h-8 w-0.5 bg-red-500/50 md:right-[20%]" 
              />
              <motion.div 
                initial={{ height: 0 }} 
                animate={{ height: '32px' }} 
                transition={{ duration: 0.3, delay: 2.2 }} 
                className="absolute left-[10%] top-0 h-8 w-0.5 bg-green-500/50 md:left-[20%]" 
              />
            </div>
          </div>

          {/* Step 5 and 6 (Branches) */}
          <div className="mt-8 flex w-full flex-col items-center justify-between gap-8 md:flex-row md:justify-center md:gap-16">
            <div className="relative">
               {renderNode(4)}
            </div>
            <div className="relative">
               {renderNode(5)}
            </div>
          </div>

        </div>
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedNode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4" dir={dir}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNode(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center gap-4 border-b border-border/50 bg-secondary/30 p-6 shrink-0">
                <div className={cn("grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br shadow-lg text-white", selectedNode.color)}>
                  <selectedNode.icon className="size-6" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-black text-foreground">{selectedNode.title}</h2>
                  <div className="mt-1 flex items-center gap-2 text-sm text-primary">
                    <Server className="size-4" />
                    <span className="font-mono" dir="ltr">{selectedNode.api}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedNode(null)}
                  className="grid size-8 shrink-0 place-items-center rounded-full bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-white"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="overflow-y-auto p-6">
                <p className="text-base leading-relaxed text-muted-foreground">
                  {selectedNode.details}
                </p>
                <div className="mt-6">
                  {codeBlocks && codeBlocks[selectedNode.id - 1]}
                </div>

                <div className="mt-8 flex justify-end">
                  <a href={`/${locale}/guide#step-${selectedNode.id}`} className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90">
                    {t('viewInGuide')}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
