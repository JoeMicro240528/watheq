'use client'

import {
  ArrowLeft,
  ArrowUpLeft,
  BadgeCheck,
  Check,
  ChevronDown,
  FileCheck2,
  Fingerprint,
  LockKeyhole,
  Menu,
  Network,
  ScanLine,
  ShieldCheck,
  X,
  Zap,
} from 'lucide-react'
import { useState } from 'react'

const features = [
  {
    icon: Fingerprint,
    title: 'توقيع موثوق',
    text: 'تحقق تشفيري كامل من كل توقيع باستخدام شهادات PKI الحكومية المعتمدة.',
  },
  {
    icon: Network,
    title: 'توقيع متعدد الأطراف',
    text: 'أدر العقود والوثائق التي تتطلب توقيع أكثر من طرف، بترتيب ووضوح تام.',
  },
  {
    icon: FileCheck2,
    title: 'صلاحية موثقة بمرور الزمن',
    text: 'أدلة OCSP محفوظة لحظة التوقيع تثبت أن الشهادة كانت سارية وقتها.',
  },
]

const steps = [
  ['01', 'أنشئ الوثيقة', 'ارفع الوثيقة أو سجل بصمتها الرقمية وحدد الأطراف المطلوبة.'],
  ['02', 'اجمع التوقيعات', 'كل طرف يوقع بصمته الرقمية دون الحاجة إلى مشاركة محتوى الوثيقة.'],
  ['03', 'تحقق بثقة', 'شارك رمز التحقق ودع أي جهة تتأكد من صحة الوثيقة خلال ثوانٍ.'],
]

export default function Page() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <main dir="rtl" className="min-h-screen overflow-hidden bg-background text-foreground selection:bg-accent/30">
      <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between border-b border-border/60 px-6 py-5 lg:px-10">
        <a href="#top" className="flex items-center gap-3" aria-label="ثقة - الصفحة الرئيسية">
          <span className="grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground shadow-[0_8px_20px_-8px_rgba(16,64,68,.5)]">
            <ShieldCheck className="size-6" strokeWidth={1.8} />
          </span>
          <span className="text-xl font-bold tracking-tight">ثقة<span className="text-accent">.</span></span>
        </a>
        <nav className="hidden items-center gap-9 text-sm font-medium text-muted-foreground md:flex">
          <a href="#why" className="transition-colors hover:text-foreground">لماذا ثقة؟</a>
          <a href="#how" className="transition-colors hover:text-foreground">كيف يعمل؟</a>
          <a href="#security" className="transition-colors hover:text-foreground">الأمان والثقة</a>
        </nav>
        <div className="hidden items-center gap-5 md:flex">
          <a href="#login" className="text-sm font-semibold text-muted-foreground hover:text-foreground">تسجيل الدخول</a>
          <a href="#start" className="rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5">ابدأ الآن <ArrowLeft className="mr-2 inline size-4" /></a>
        </div>
        <button className="rounded-lg border border-border p-2 md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="فتح القائمة">
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </header>

      {mobileOpen && (
        <nav className="mx-6 flex flex-col gap-5 rounded-xl border border-border bg-card p-5 text-sm font-semibold shadow-lg md:hidden">
          <a href="#why" onClick={() => setMobileOpen(false)}>لماذا ثقة؟</a>
          <a href="#how" onClick={() => setMobileOpen(false)}>كيف يعمل؟</a>
          <a href="#security" onClick={() => setMobileOpen(false)}>الأمان والثقة</a>
          <a href="#start" className="rounded-lg bg-primary px-4 py-3 text-center text-primary-foreground">ابدأ الآن</a>
        </nav>
      )}

      <section id="top" className="relative mx-auto max-w-7xl bg-[linear-gradient(to_left,transparent_0%,rgba(45,143,132,.05)_100%)] px-6 pb-24 pt-14 lg:px-10 lg:pb-32 lg:pt-24">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
          <div className="max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/8 px-4 py-2 text-xs font-bold text-primary">
              <span className="size-2 rounded-full bg-accent" /> بنية ثقة رقمية للمستقبل
            </div>
            <h1 className="text-balance text-5xl font-black leading-[1.14] tracking-[-.04em] text-primary sm:text-6xl lg:text-7xl">
              وثّق مستنداتك،<br /><span className="text-accent">وابنِ الثقة.</span>
            </h1>
            <p className="mt-7 max-w-xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">
              ثقة هو المركز الموثوق للتحقق من المستندات متعددة التوقيعات. اجمع التوقيعات الرقمية، واحفظ دليل صلاحية كل توقيع، وامنح أي جهة ثقة فورية في مستنداتك.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#start" className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-4 font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/15">أنشئ مستندك الأول <ArrowLeft className="mr-3 size-5" /></a>
              <a href="#how" className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-6 py-4 font-bold text-primary hover:border-primary/40">اكتشف كيف يعمل <ArrowUpLeft className="mr-3 size-5" /></a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-semibold text-muted-foreground">
              <span className="flex items-center gap-2"><Check className="size-4 text-accent" /> بدون مشاركة محتوى المستند</span>
              <span className="flex items-center gap-2"><Check className="size-4 text-accent" /> مبني على PKI الحكومية</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[520px] lg:ml-0" aria-label="لوحة تحقق من وثيقة">
            <div className="absolute -inset-8 -z-10 bg-[radial-gradient(circle_at_center,rgba(45,143,132,.15),transparent_64%)]" />
            <div className="relative rounded-[1.35rem] border border-primary/10 bg-card p-5 shadow-[0_28px_80px_-36px_rgba(16,64,68,.48)] ring-1 ring-white/70 sm:p-7">
              <div className="flex items-center justify-between border-b border-border pb-5">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-lg bg-secondary"><FileCheck2 className="size-5 text-primary" /></span>
                  <div><p className="text-sm font-bold">عقد بيع عقار.pdf</p><p className="mt-1 font-mono text-[10px] text-muted-foreground">SHA-256 · 4A8F...91C2</p></div>
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1.5 text-[11px] font-bold text-accent"><BadgeCheck className="size-3.5" /> موثّق</span>
              </div>
              <div className="py-6">
                <div className="mb-4 flex items-center justify-between"><span className="text-xs font-bold text-muted-foreground">حالة التوقيعات</span><span className="font-mono text-xs text-muted-foreground">3 / 3</span></div>
                <div className="h-2 overflow-hidden rounded-full bg-secondary"><div className="h-full w-full rounded-full bg-accent" /></div>
              </div>
              <div className="divide-y divide-border rounded-xl border border-border">
                {[['مكتب المحاماة المتحدة','تم التحقق · ١ يونيو ٢٠٢٦'],['البائع · محمد أحمد','تم التحقق · ٢ يونيو ٢٠٢٦'],['المشتري · سارة علي','تم التحقق · ٣ يونيو ٢٠٢٦']].map(([name, date]) => <div key={name} className="flex items-center justify-between px-4 py-4"><div className="flex items-center gap-3"><span className="grid size-8 place-items-center rounded-full bg-secondary"><Fingerprint className="size-4 text-primary" /></span><div><p className="text-xs font-bold">{name}</p><p className="mt-1 text-[10px] text-muted-foreground">{date}</p></div></div><Check className="size-4 text-accent" /></div>)}
              </div>
              <div className="mt-5 flex items-center gap-2 rounded-lg bg-primary p-3 text-xs leading-5 text-primary-foreground"><LockKeyhole className="size-4 shrink-0 text-accent" /> تم حفظ دليل OCSP لكل توقيع لحظة اعتماده</div>
            </div>
            <div className="absolute -bottom-5 -left-3 hidden items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-xl sm:flex"><span className="grid size-8 place-items-center rounded-full bg-accent/10"><Zap className="size-4 text-accent" /></span><div><p className="text-[10px] text-muted-foreground">زمن التحقق</p><p className="font-mono text-sm font-bold text-primary">0.84 ثانية</p></div></div>
          </div>
        </div>
      </section>

      <section id="why" className="border-y border-border bg-secondary/40 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10"><div className="max-w-2xl"><p className="mb-4 text-sm font-bold text-accent">لماذا ثقة؟</p><h2 className="text-balance text-3xl font-black tracking-tight text-primary sm:text-4xl">الثقة ليست وعداً.<br />إنها دليل يمكن التحقق منه.</h2></div><div className="mt-14 grid gap-5 md:grid-cols-3">{features.map(({icon: Icon, title, text}) => <article key={title} className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_18px_40px_-28px_rgba(16,64,68,.55)] sm:p-7"><div className="mb-7 grid size-11 place-items-center rounded-lg bg-card text-primary shadow-sm"><Icon className="size-5" /></div><h3 className="text-lg font-bold text-primary">{title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{text}</p></article>)}</div></div>
      </section>

      <section id="how" className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28"><div className="grid gap-14 lg:grid-cols-[.75fr_1.25fr] lg:gap-24"><div><p className="mb-4 text-sm font-bold text-accent">ببساطة، وبأمان</p><h2 className="text-balance text-3xl font-black tracking-tight text-primary sm:text-4xl">من المستند<br />إلى الثقة.</h2><p className="mt-6 text-sm leading-7 text-muted-foreground">صُمم ثقة ليجعل دورة التوقيع والتحقق واضحة لكل الأطراف، من المنشئ إلى الموقّع وحتى جهة التحقق.</p></div><div className="divide-y divide-border border-y border-border">{steps.map(([number,title,text]) => <div key={number} className="grid gap-5 py-7 sm:grid-cols-[64px_1fr] sm:items-start"><span className="font-mono text-sm font-bold text-accent">{number}</span><div><h3 className="text-lg font-bold text-primary">{title}</h3><p className="mt-2 max-w-lg text-sm leading-7 text-muted-foreground">{text}</p></div></div>)}</div></div></section>

      <section id="security" className="bg-primary py-20 text-primary-foreground lg:py-28"><div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:items-center lg:px-10"><div><p className="mb-4 text-sm font-bold text-accent">أمان يمكن إثباته</p><h2 className="text-balance text-3xl font-black tracking-tight sm:text-4xl">كل توقيع يحمل<br />قصة ثقة كاملة.</h2><p className="mt-6 max-w-lg text-sm leading-8 text-primary-foreground/70">نحن لا نكتفي بالتحقق من التوقيع. نتحقق من سلسلة الشهادة، ونلتقط حالة OCSP لحظة التوقيع، ونحفظها كدليل غير قابل للتغيير.</p></div><div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-primary-foreground/15 bg-primary-foreground/15">{[['PKI','مرساة ثقة حكومية'],['OCSP','دليل صلاحية لحظي'],['CAdES-BES','توقيع متقدم'],['SHA-256','سلامة المحتوى']].map(([big,small]) => <div key={big} className="bg-primary p-6 sm:p-8"><p className="font-mono text-lg font-bold text-accent">{big}</p><p className="mt-2 text-xs leading-5 text-primary-foreground/60">{small}</p></div>)}</div></div></section>

      <section id="start" className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28"><div className="flex flex-col items-start justify-between gap-8 rounded-2xl bg-accent px-7 py-10 text-accent-foreground sm:px-12 sm:py-14 lg:flex-row lg:items-center"><div><h2 className="text-balance text-3xl font-black sm:text-4xl">جاهز لتوثيق ما يهمك؟</h2><p className="mt-3 text-sm leading-7 opacity-75">ابدأ ببناء طبقة الثقة الرقمية لمؤسستك اليوم.</p></div><a href="#login" className="inline-flex shrink-0 items-center rounded-lg bg-primary px-6 py-4 font-bold text-primary-foreground transition-transform hover:-translate-y-0.5">ابدأ مع ثقة <ArrowLeft className="mr-3 size-5" /></a></div></section>

      <footer className="border-t border-border"><div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-10"><div className="flex items-center gap-2 font-bold text-primary"><span className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground"><ShieldCheck className="size-4" /></span> ثقة<span className="text-accent">.</span></div><p>منصة التحقق من الوثائق متعددة التوقيعات</p><p>© ٢٠٢٦ ثقة. جميع الحقوق محفوظة.</p></div></footer>
    </main>
  )
}
