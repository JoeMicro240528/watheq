import { ShieldCheck, BookOpen, Key, FileCheck, Info, AlertTriangle, Terminal, Download, UserPlus, FilePlus, PenTool, CheckCircle, XCircle, FileText, Database, QrCode } from 'lucide-react'
import { CodeBlock } from '@/components/ui/code-block'
import { LanguageToggle } from '@/components/ui/language-toggle'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { cn } from '@/lib/utils'
import { getTranslations } from 'next-intl/server'
import { useTranslations, useLocale } from 'next-intl'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return {
    title: t('guideTitle'),
    description: t('guideDesc'),
  }
}

import { step1Snippets, step2Snippets, step2bSnippets, step3Snippets, step4aSnippets, step4bSnippets, step5aSnippets, step5bSnippets, step6Snippets, step7Snippets } from '@/lib/snippets'

// --- Helper Components ---
function StepSection({ id, title, icon: Icon, children }: { id: string, title: string, icon: any, children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="mb-6 flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent"><Icon className="size-5" /></span>
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      </div>
      <div className="space-y-5 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  )
}

function Callout({ type, children }: { type: 'info' | 'warning', children: React.ReactNode }) {
  const Icon = type === 'info' ? Info : AlertTriangle
  const bgClass = type === 'info' ? 'bg-blue-500/10 border-blue-500/20 text-blue-500' : 'bg-amber-500/10 border-amber-500/20 text-amber-500'
  const textClass = type === 'info' ? 'text-blue-500/90' : 'text-amber-500/90'

  return (
    <div className={`mt-4 flex items-start gap-3 rounded-xl border p-4 ${bgClass}`}>
      <Icon className="mt-0.5 size-5 shrink-0" />
      <div className={`text-sm leading-relaxed ${textClass}`}>{children}</div>
    </div>
  )
}

export default function GuidePage() {
  const t = useTranslations('guide')
  const navT = useTranslations('nav')
  const locale = useLocale()
  const isRtl = locale === 'ar'
  const dir = isRtl ? 'rtl' : 'ltr'

  return (
    <div dir={dir} className="min-h-screen bg-background text-foreground selection:bg-accent/30">
      
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 px-6 py-4 backdrop-blur-md lg:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="/" className="flex items-center gap-2" aria-label={isRtl ? "ثقة - الصفحة الرئيسية" : "Thiqa - Home"}>
            <div className="flex items-center gap-[-0.6rem] text-primary">
              <ShieldCheck className="size-6" strokeWidth={2.5} />
              <QrCode className="size-6" strokeWidth={2.5} />
              <img src={isRtl ? "/logo_ar.png" : "/logo_en.png"} alt={isRtl ? "شعار ثقة" : "Thiqa Logo"} className={cn("h-10", isRtl ? "mr-[-2.2rem]" : "ml-[-1.9rem]")} />
            </div>
          </a>
          <div className="flex items-center gap-3">
            <a href={`/${locale}/flow`} className="hidden rounded-full bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent transition-colors hover:bg-accent/20 sm:inline-flex sm:px-4 sm:text-sm">
              {navT('flowMap')}
            </a>
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl flex-col items-start gap-10 px-6 py-10 lg:flex-row lg:gap-16 lg:px-10 lg:py-16">

        {/* Sidebar Navigation */}
        <aside className="sticky top-28 hidden w-64 shrink-0 lg:block">
          <div className="mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('sidebarTitle')}</div>
          <nav className="flex flex-col gap-1.5 text-sm font-medium">
            <a href="#intro" className="rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-secondary">{t('introNav')}</a>
            <a href="#prerequisites" className="rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-secondary">{t('prereqNav')}</a>
            <a href="#step-1" className="rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-secondary">{t('step1Nav')}</a>
            <a href="#step-2" className="rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-secondary">{t('step2Nav')}</a>
            <a href="#step-3" className="rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-secondary">{t('step3Nav')}</a>
            <a href="#step-4" className="rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-secondary">{t('step4Nav')}</a>
            <a href="#step-5" className="rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-secondary">{t('step5Nav')}</a>
            <a href="#step-6" className="rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-secondary">{t('step6Nav')}</a>
            <a href="#step-7" className="rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-secondary">{t('step7Nav')}</a>
            <a href="#reference" className="rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-secondary">{t('reference')}</a>
          </nav>
          <a href="/public/ejbca-issuer-cli.zip" download className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90">
            <Download className="size-4" />
            {t('downloadCli')}
          </a>
        </aside>

        {/* Main Content */}
        <main className="min-w-0 flex-1 space-y-16">

          {/* Intro */}
          <section id="intro" className="scroll-mt-28">
            <div className="mb-6 flex items-center gap-4">
              <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-lg">
                <BookOpen className="size-6" />
              </div>
              <h1 className="text-3xl font-black text-primary">{t('pageTitle')}</h1>
            </div>
            <p className="leading-relaxed text-muted-foreground">
              {t('intro')}
            </p>
            <div className="mt-6 rounded-xl border border-border bg-card p-5">
              <p className="mb-3 text-sm font-bold text-muted-foreground">{t('whatYouWillAchieve')}</p>
              <ul className="space-y-2 text-sm text-foreground">
                {[
                  t('achieve1'),
                  t('achieve2'),
                  t('achieve3'),
                  t('achieve4'),
                  t('achieve5'),
                  t('achieve6')
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[10px] font-black text-accent">{i + 1}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Prerequisites */}
          <section id="prerequisites" className="scroll-mt-28">
            <h2 className="mb-6 text-2xl font-black text-primary">{t('prereqTitle')}</h2>
            <div className="overflow-hidden rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="px-4 py-3 text-right font-bold text-primary">{t('prereqReq')}</th>
                    <th className="px-4 py-3 text-right font-bold text-primary">{t('prereqDetails')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['OpenSSL 1.1.1+', 'مطلوب للتوقيع بـ CAdES-BES (الراية -cades). تحقق بـ openssl version'],
                    ['jq', 'لبناء وتحليل JSON بأمان. ثبّته عبر مدير الحزم'],
                    ['curl', 'لجميع طلبات API'],
                    ['بيانات EJBCA Admin', 'شهادة عميل ومفتاح خاص للمصادقة (mTLS) على EJBCA REST API'],
                    ['أسماء Profile في EJBCA', 'اسم Certificate Profile واسم End Entity Profile واسم CA'],
                    ['الوصول للشبكة', 'اتصال بـ EJBCA (منفذ 8443) ومنصة ثقة (منفذ 8081)'],
                  ].map(([req, detail], i) => (
                    <tr key={i} className="bg-card">
                      <td className="px-4 py-3 font-mono text-xs text-primary">{req}</td>
                      <td className="px-4 py-3 text-muted-foreground">{detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 rounded-xl border border-border bg-card p-5">
              <p className="mb-3 text-sm font-bold text-muted-foreground">{t('baseUrlsTitle')}</p>
              <table className="w-full text-sm">
                <thead><tr>
                  <th className="py-2 text-right font-bold text-primary">{t('service')}</th>
                  <th className="py-2 text-right font-bold text-primary">{t('defaultValue')}</th>
                  <th className="py-2 text-right font-bold text-primary">{t('example')}</th>
                </tr></thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="py-2 font-mono text-xs text-primary">EJBCA REST API</td><td className="py-2 text-muted-foreground">YOUR_EJBCA_URL</td><td className="py-2 font-mono text-xs text-muted-foreground">https://ejbca.example.com:8443</td></tr>
                  <tr><td className="py-2 font-mono text-xs text-primary">Thiqa Hub API</td><td className="py-2 text-muted-foreground">YOUR_HUB_URL</td><td className="py-2 font-mono text-xs text-muted-foreground">http://hub.example.com:8081</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Step 1 */}
          <StepSection id="step-1" number="١" icon={Key} title={t('step1Title')}>
            <p className="leading-relaxed text-muted-foreground">
              {t('step1Desc')}
            </p>
            <CodeBlock snippets={step1Snippets} />
            <Callout type="info">
              {t('step1Callout')}
            </Callout>
            <div className="rounded-xl border border-border bg-card p-5 text-sm">
              <p className="mb-2 font-bold text-muted-foreground">{t('outputFiles')}</p>
              <ul className="space-y-1 text-muted-foreground">
                <li><code className="font-mono text-primary">issuer.key</code> — {t('issuerKeyDesc')}</li>
                <li><code className="font-mono text-primary">issuer.csr</code> — {t('issuerCsrDesc')}</li>
              </ul>
            </div>
          </StepSection>

          {/* Step 2 */}
          <StepSection id="step-2" number="٢" icon={ShieldCheck} title={t('step2Title')}>
            <p className="leading-relaxed text-muted-foreground">
              {t('step2Desc')}
            </p>
            <CodeBlock snippets={step2Snippets} />
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="mb-2 text-sm font-bold text-muted-foreground">{t('expectedResponse200')}</p>
              <CodeBlock code={`{
  "certificate": "MIIHJzCCBQ...",
  "serial_number": "72CA..."
}`} language="json" />
            </div>

            <h3 className="mt-8 text-lg font-bold text-primary">{t('step2bTitle')}</h3>
            <p className="leading-relaxed text-muted-foreground">{t('step2bDesc')}</p>
            <CodeBlock snippets={step2bSnippets} />

            <Callout type="tip">
              <strong>{t('step2Tip')}</strong><br />
              <code className="font-mono text-xs">openssl pkcs12 -in issuer.p12 -nocerts -out issuer.key -nodes</code><br />
              <code className="font-mono text-xs">openssl pkcs12 -in issuer.p12 -clcerts -nokeys -out issuer.pem</code>
            </Callout>
          </StepSection>

          {/* Step 3 */}
          <StepSection id="step-3" number="٣" icon={UserPlus} title={t('step3Title')}>
            <p className="leading-relaxed text-muted-foreground">
              {t('step3Desc')}
            </p>
            <CodeBlock snippets={step3Snippets} />
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="mb-2 text-sm font-bold text-muted-foreground">{t('expectedResponse201')}</p>
              <CodeBlock code={`{
  "issuerId": 1,
  "serial": "abc123...",
  "validFrom": "2026-01-01T00:00:00Z",
  "validUntil": "2027-01-01T00:00:00Z"
}`} language="json" />
            </div>
            <Callout type="warning">
              {t('step3Callout')}
            </Callout>
          </StepSection>

          {/* Step 4 */}
          <StepSection id="step-4" number="٤" icon={FilePlus} title={t('step4Title')}>
            <p className="leading-relaxed text-muted-foreground">
              {t('step4Desc')}
            </p>

            <h3 className="mt-4 text-lg font-bold text-primary">{t('step4aTitle')}</h3>
            <CodeBlock snippets={step4aSnippets} />
            <Callout type="warning">
              {t('step4aCallout')}
            </Callout>

            <h3 className="mt-6 text-lg font-bold text-primary">{t('step4bTitle')}</h3>
            <CodeBlock snippets={step4bSnippets} />
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="mb-2 text-sm font-bold text-muted-foreground">{t('expectedResponse201')}</p>
              <CodeBlock code={`{ "docId": "550e8400-e29b-41d4-a716-446655440000" }`} language="json" />
            </div>
          </StepSection>

          {/* Step 5 */}
          <StepSection id="step-5" number="٥" icon={PenTool} title={t('step5Title')}>
            <p className="leading-relaxed text-muted-foreground">
              {t('step5Desc')}
            </p>

            <h3 className="mt-4 text-lg font-bold text-primary">{t('step5aTitle')}</h3>
            <CodeBlock snippets={step5aSnippets} />
            <Callout type="warning">
              {t('step5aCallout')}
            </Callout>

            <h3 className="mt-6 text-lg font-bold text-primary">{t('step5bTitle')}</h3>
            <CodeBlock snippets={step5bSnippets} />
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="mb-2 text-sm font-bold text-muted-foreground">{t('expectedResponse201')}</p>
              <CodeBlock code={`{
  "signatureId": "660e8400-e29b-41d4-a716-446655440001",
  "status": "VALID"
}`} language="json" />
            </div>
            <Callout type="info">
              {t('step5bCallout')}
            </Callout>
          </StepSection>

          {/* Step 6 */}
          <StepSection id="step-6" number="٦" icon={XCircle} title={t('step6Title')}>
            <p className="leading-relaxed text-muted-foreground">
              {t('step6Desc')}
            </p>
            <CodeBlock snippets={step6Snippets} />
            <div className="rounded-xl border border-border bg-card p-5 mt-4">
              <p className="mb-2 text-sm font-bold text-muted-foreground">{t('expectedResponse200')}</p>
              <CodeBlock code={`{ "revoked": true }`} language="json" />
            </div>
          </StepSection>

          {/* Step 7 */}
          <StepSection id="step-7" number="٧" icon={CheckCircle} title={t('step7Title')}>
            <p className="leading-relaxed text-muted-foreground">
              {t('step7Desc')}
            </p>
            <CodeBlock snippets={step7Snippets} />
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="mb-2 text-sm font-bold text-muted-foreground">{t('expectedResponse200')}</p>
              <CodeBlock code={`{
  "valid": true,
  "docHash": "a1b2c3d4...",
  "hashAlgorithm": "SHA-256",
  "status": "VALID",
  "signatureCount": 1,
  "minRequiredSignatures": 1,
  "signatures": [
    {
      "issuerName": "CN=Ministry of Health,O=Government,C=SD",
      "signedAt": "2026-09-07T12:00:00Z",
      "receiptTime": "2026-09-07T12:00:01Z",
      "certWasValidAtSigning": true,
      "ocspStatusAtSigning": "GOOD"
    }
  ],
  "rendering": "JVBERi0xLjQK..."
}`} language="json" />
            </div>
          </StepSection>

          {/* Reference */}
          <section id="reference" className="scroll-mt-28">
            <h2 className="mb-6 text-2xl font-black text-primary">{t('refTitle')}</h2>

            <h3 className="mb-3 text-lg font-bold text-primary">{t('apiEndpoints')}</h3>
            <div className="overflow-hidden rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="px-4 py-3 text-right font-bold text-primary">{t('method')}</th>
                    <th className="px-4 py-3 text-right font-bold text-primary">{t('path')}</th>
                    <th className="px-4 py-3 text-right font-bold text-primary">{t('desc')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['POST', '/api/certs/enroll', t('api1Desc')],
                    ['POST', '/api/documents/initiate', t('api2Desc')],
                    ['POST', '/api/documents/{docId}/signatures', t('api3Desc')],
                    ['POST', '/api/documents/{docId}/revoke', t('api4Desc')],
                    ['POST', '/api/documents/verify', t('api5Desc')],
                    ['GET', '/api/documents/health', t('api6Desc')],
                  ].map(([method, path, desc], i) => (
                    <tr key={i} className="bg-card">
                      <td className="px-4 py-3 font-mono text-xs font-bold text-accent">{method}</td>
                      <td className="px-4 py-3 font-mono text-xs text-primary">{path}</td>
                      <td className="px-4 py-3 text-muted-foreground">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="mb-3 mt-8 text-lg font-bold text-primary">{t('commonErrors')}</h3>
            <div className="overflow-hidden rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="px-4 py-3 text-right font-bold text-primary">{t('code')}</th>
                    <th className="px-4 py-3 text-right font-bold text-primary">{t('error')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['400', 'Hash does not match rendering'],
                    ['400', 'Certificate is not currently certified GOOD by OCSP'],
                    ['400', 'Signing time is outside the certificate validity period'],
                    ['400', 'Issuer already enrolled'],
                    ['404', 'Document not found'],
                    ['409', 'Issuer has already signed this document'],
                    ['409', 'Document is revoked'],
                    ['413', 'Request body exceeds ~15 MB'],
                  ].map(([code, msg], i) => (
                    <tr key={i} className="bg-card">
                      <td className="px-4 py-3 font-mono text-xs font-bold text-red-500">{code}</td>
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{msg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        </main>
      </div>
    </div>
  )
}
