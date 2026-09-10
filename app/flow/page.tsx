import { ShieldCheck, ArrowRight } from 'lucide-react'
import { FlowDiagram } from './flow-diagram'
import Link from 'next/link'

export const metadata = {
  title: 'مخطط التكامل | ثقة',
  description: 'المخطط التفاعلي لربط المصدرين في منصة ثقة',
}

export default function FlowPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground selection:bg-accent/30">
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 px-6 py-4 backdrop-blur-md lg:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center" aria-label="ثقة - الصفحة الرئيسية">
            <img src="/icon.png" alt="شعار ثقة" className="h-20 w-auto object-contain" />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/guide" className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-secondary/80 sm:px-4 sm:text-sm">
              <ArrowRight className="size-3 sm:size-4" />
              العودة للدليل
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-black text-primary lg:text-5xl">مخطط التكامل</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            نظرة عامة تفاعلية على دورة حياة المصدر والوثيقة في منصة ثقة. مرر مؤشر الماوس فوق أي خطوة لعرض التفاصيل.
          </p>
        </div>

        <FlowDiagram />
      </main>
    </div>
  )
}
