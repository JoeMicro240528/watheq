import { ShieldCheck, BookOpen, Key, FileCheck, Info, Terminal, Download, UserPlus, FilePlus, PenTool, CheckCircle, XCircle, Database, QrCode, Zap, CircleAlert } from 'lucide-react'
import { CodeBlock } from '@/components/ui/code-block'
import { LanguageToggle } from '@/components/ui/language-toggle'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { getTranslations } from 'next-intl/server'
import { useTranslations, useLocale } from 'next-intl'
import { SiteHeader } from '@/components/ui/site-header'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return {
    title: t('guideTitle'),
    description: t('guideDesc'),
  }
}

import { cliConfigSnippet, cliCmdSnippet, cliOutputSnippet, step1Snippets, step2Snippets, step2bSnippets, step3Snippets, step4aSnippets, step4bSnippets, step5aSnippets, step5bSnippets, step6Snippets, step7Snippets } from '@/lib/snippets'

// --- Helper Components ---
function StepSection({ id, number, title, icon: Icon, children }: { id: string, number?: string, title: string, icon: any, children: React.ReactNode }) {
  return (
    <Card id={id} className="group scroll-mt-28 relative overflow-hidden rounded-2xl border-line bg-card shadow-xs transition-all duration-200 hover:border-brand-solid/60 hover:shadow-md">
      <CardHeader className="border-b border-line bg-paper/50 pb-5 px-6 sm:px-8">
        <div className="flex items-center gap-4">
          <span className="relative grid size-11 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand-solid border border-brand-solid/20 shadow-xs">
            <Icon className="size-5" />
          </span>
          <CardTitle className="flex items-center gap-3 text-lg font-extrabold text-ink sm:text-xl">
            {number && (
              <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-brand-solid text-xs font-black text-white shadow-xs">
                {number}
              </span>
            )}
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 px-6 pt-6 text-sm leading-relaxed text-ink-muted sm:px-8">
        {children}
      </CardContent>
    </Card>
  )
}

function Callout({ type, children }: { type: 'info' | 'warning' | 'tip', children: React.ReactNode }) {
  const Icon = type === 'info' ? Info : type === 'warning' ? CircleAlert : Zap
  const styles = {
    info: 'border-blue-500/25 bg-blue-500/10 text-blue-700 dark:text-blue-400',
    warning: 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400',
    tip: 'border-brand-solid/25 bg-brand-soft text-brand-solid',
  }
  return (
    <div className={cn('flex items-start gap-3.5 rounded-xl border p-4 shadow-xs', styles[type])}>
      <Icon className="mt-0.5 size-5 shrink-0" strokeWidth={2.2} />
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  )
}

function InfoPanel({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-paper/60 p-5 sm:p-6 shadow-xs">
      <p className="mb-3 text-xs font-black uppercase tracking-wider text-ink">{title}</p>
      {children}
    </div>
  )
}

function TableShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line shadow-xs">
      {children}
    </div>
  )
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="bg-paper border-b border-line px-4 py-3 text-start text-xs font-black uppercase tracking-wider text-ink">{children}</th>
}

export default function GuidePage() {
  const t = useTranslations('guide')
  const navT = useTranslations('nav')
  const locale = useLocale()
  const isRtl = locale === 'ar'
  const dir = isRtl ? 'rtl' : 'ltr'

  const navItems = [
    ['intro', t('introNav')],
    ['cli', t('cliNav')],
    ['prerequisites', t('prereqNav')],
    ['step-1', t('step1Nav')],
    ['step-2', t('step2Nav')],
    ['step-3', t('step3Nav')],
    ['step-4', t('step4Nav')],
    ['step-5', t('step5Nav')],
    ['step-6', t('step6Nav')],
    ['step-7', t('step7Nav')],
    ['reference', t('reference')],
  ]

  return (
    <div dir={dir} className="min-h-screen bg-background text-foreground selection:bg-brand-solid selection:text-white">

      {/* ══ Official Institutional Header ══ */}
      <SiteHeader active="guide" />

      {/* ══ Watania-Style Deep Brand Hero ══ */}
      <section className="relative bg-brand-deep text-white overflow-hidden py-12 lg:py-16 border-b border-line">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <svg viewBox="0 0 400 400" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="0.7" className="absolute -top-40 -end-32 w-[38rem] max-w-none text-on-deep-line opacity-20">
            <ellipse cx="200" cy="200" rx="190" ry="62" transform="rotate(0 200 200)" />
            <ellipse cx="200" cy="200" rx="190" ry="62" transform="rotate(30 200 200)" />
            <ellipse cx="200" cy="200" rx="190" ry="62" transform="rotate(60 200 200)" />
            <ellipse cx="200" cy="200" rx="190" ry="62" transform="rotate(90 200 200)" />
            <ellipse cx="200" cy="200" rx="190" ry="62" transform="rotate(120 200 200)" />
            <ellipse cx="200" cy="200" rx="190" ry="62" transform="rotate(150 200 200)" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-6xl px-4 lg:px-6">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/10 text-white border border-white/20 shadow-xs backdrop-blur-sm">
              <BookOpen className="size-5" />
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold text-on-deep-muted backdrop-blur-sm">
              {navT('devGuide')}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl tracking-tight">
            {t('pageTitle')}
          </h1>
          <p className="mt-4 max-w-2xl text-base lg:text-lg leading-relaxed text-on-deep-muted">
            {t('intro')}
          </p>
        </div>
      </section>

      <div className="mx-auto flex max-w-6xl flex-col items-start gap-10 px-4 py-10 lg:flex-row lg:gap-12 lg:px-6 lg:py-14">

        {/* Sidebar Navigation */}
        <aside className="sticky top-24 hidden w-64 shrink-0 lg:block">
          <div className="rounded-2xl border border-line bg-surface p-5 shadow-xs">
            <span className="mb-4 inline-block rounded-full bg-brand-soft px-3 py-1 text-[11px] font-bold text-brand-solid border border-brand-solid/20">
              {t('sidebarTitle')}
            </span>
            <nav className="flex flex-col gap-1 text-[13px] font-semibold">
              {navItems.map(([id, label]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="group flex items-center gap-2.5 rounded-xl px-3 py-2 text-ink-muted transition-colors hover:bg-brand-soft hover:text-ink"
                >
                  <span className="size-1.5 shrink-0 rounded-full bg-line transition-colors group-hover:bg-brand-solid" />
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="min-w-0 flex-1 space-y-16">

          {/* Intro goals */}
          <section id="intro" className="scroll-mt-28">
            <InfoPanel title={t('whatYouWillAchieve')}>
              <ul className="space-y-2.5 text-sm text-foreground">
                {[
                  t('achieve1'), t('achieve2'), t('achieve3'),
                  t('achieve4'), t('achieve5'), t('achieve6'),
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary text-[10px] font-black text-primary ring-1 ring-primary/15">{i + 1}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </InfoPanel>
          </section>

          {/* Quick Start CLI */}
          <section id="cli" className="scroll-mt-28">
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-black text-primary">
              <Terminal className="size-6 text-accent" /> {t('cliTitle')}
            </h2>
            <Card className="rounded-3xl border-border/50 bg-card/70 p-6 shadow-lg backdrop-blur-xl sm:p-8">
              <p className="leading-relaxed text-muted-foreground">{t('cliDesc')}</p>

              <Callout type="warning">
                {t('cliWarning')}
              </Callout>

              <div className="mt-6 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <a href="/ejbca-issuer-cli.zip" download className="group inline-flex h-11 items-center justify-center gap-3 rounded-full bg-primary px-8 font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:bg-accent hover:text-accent-foreground hover:shadow-xl hover:shadow-accent/30">
                  <Download className="size-5 transition-transform group-hover:translate-y-0.5" /> {t('cliDownloadBtn')}
                </a>
                <p className="text-xs leading-5 text-muted-foreground sm:max-w-md">{t('cliAutomationNote')}</p>
              </div>

              <h3 className="mb-4 mt-8 text-lg font-bold text-primary">{t('cliSetup')}</h3>
              <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
                <li>{t('cliSetup1')}</li>
                <li>{t('cliSetup2')}</li>
              </ol>
              <div className="mt-4">
                <CodeBlock snippets={cliConfigSnippet} />
              </div>

              <h3 className="mb-4 mt-8 text-lg font-bold text-primary">{t('cliCommands')}</h3>
              <TableShell>
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <Th>{t('cliCmd')}</Th>
                      <Th>{t('cliCmdDesc')}</Th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60 bg-card">
                    {[
                      ['python3 create-issuer.py create <org> <pw>', t('cliCmd1')],
                      ['python3 create-issuer.py list', t('cliCmd2')],
                      ['python3 create-issuer.py disable <username>', t('cliCmd3')],
                      ['python3 create-issuer.py enable <username>', t('cliCmd4')],
                      ['python3 create-issuer.py renew <username>', t('cliCmd5')],
                      ['python3 create-issuer.py', t('cliCmd6')],
                    ].map(([cmd, desc], i) => (
                      <tr key={i} className="transition-colors hover:bg-secondary/30">
                        <td className="px-4 py-3 font-mono text-xs text-primary" dir="ltr">{cmd}</td>
                        <td className="px-4 py-3 text-muted-foreground">{desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TableShell>

              <h3 className="mb-4 mt-8 text-lg font-bold text-primary">{t('cliExample')}</h3>
              <CodeBlock snippets={cliCmdSnippet} />
              <p className="mb-2 mt-4 text-sm text-muted-foreground">{t('cliExampleDesc')}</p>
              <CodeBlock snippets={cliOutputSnippet} />
            </Card>
          </section>

          {/* Prerequisites */}
          <section id="prerequisites" className="scroll-mt-28">
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-black text-primary">
              <FileCheck className="size-6 text-accent" /> {t('prereqTitle')}
            </h2>
            <TableShell>
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <Th>{t('prereqReq')}</Th>
                    <Th>{t('prereqDetails')}</Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 bg-card/50">
                  {[
                    ['OpenSSL 1.1.1+', 'مطلوب للتوقيع بـ CAdES-BES (الراية -cades). تحقق بـ openssl version'],
                    ['jq', 'لبناء وتحليل JSON بأمان. ثبّته عبر مدير الحزم'],
                    ['curl', 'لجميع طلبات API'],
                    ['بيانات EJBCA Admin', 'شهادة عميل ومفتاح خاص للمصادقة (mTLS) على EJBCA REST API'],
                    ['أسماء Profile في EJBCA', 'اسم Certificate Profile واسم End Entity Profile واسم CA'],
                    ['الوصول للشبكة', 'اتصال بـ EJBCA (منفذ 8443) ومنصة ثقة (منفذ 8081)'],
                  ].map(([req, detail], i) => (
                    <tr key={i} className="transition-colors hover:bg-secondary/30">
                      <td className="px-4 py-3 font-mono text-xs font-bold text-primary" dir="ltr">{req}</td>
                      <td className="px-4 py-3 text-muted-foreground">{detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableShell>

            <InfoPanel title={t('baseUrlsTitle')}>
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="pb-2 text-start font-bold text-primary">{t('service')}</th>
                    <th className="pb-2 text-start font-bold text-primary">{t('defaultValue')}</th>
                    <th className="pb-2 text-start font-bold text-primary">{t('example')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  <tr>
                    <td className="py-2.5 font-mono text-xs font-bold text-primary">EJBCA REST API</td>
                    <td className="py-2.5 text-muted-foreground">YOUR_EJBCA_URL</td>
                    <td className="py-2.5 font-mono text-xs text-muted-foreground" dir="ltr">https://ejbca.example.com:8443</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-mono text-xs font-bold text-primary">Thiqa Hub API</td>
                    <td className="py-2.5 text-muted-foreground">YOUR_HUB_URL</td>
                    <td className="py-2.5 font-mono text-xs text-muted-foreground" dir="ltr">http://hub.example.com:8081</td>
                  </tr>
                </tbody>
              </table>
            </InfoPanel>
          </section>

          {/* Steps */}
          <div className="relative space-y-10">
            {/* Connector rail */}
            <div className="absolute start-[calc(3rem+1px)] top-16 bottom-16 hidden w-px bg-gradient-to-b from-accent/50 via-primary/20 to-transparent sm:block" />

            <StepSection id="step-1" number="١" icon={Key} title={t('step1Title')}>
              <p className="leading-relaxed text-muted-foreground">{t('step1Desc')}</p>
              <CodeBlock snippets={step1Snippets} />
              <Callout type="info">{t('step1Callout')}</Callout>
              <InfoPanel title={t('outputFiles')}>
                <ul className="space-y-1.5 text-muted-foreground">
                  <li><code className="rounded-md bg-primary/10 px-1.5 py-0.5 font-mono text-xs text-primary">issuer.key</code> — {t('issuerKeyDesc')}</li>
                  <li><code className="rounded-md bg-primary/10 px-1.5 py-0.5 font-mono text-xs text-primary">issuer.csr</code> — {t('issuerCsrDesc')}</li>
                </ul>
              </InfoPanel>
            </StepSection>

            <StepSection id="step-2" number="٢" icon={ShieldCheck} title={t('step2Title')}>
              <p className="leading-relaxed text-muted-foreground">{t('step2Desc')}</p>
              <CodeBlock snippets={step2Snippets} />
              <InfoPanel title={t('expectedResponse200')}>
                <CodeBlock code={`{
  "certificate": "MIIHJzCCBQ...",
  "serial_number": "72CA..."
}`} language="json" />
              </InfoPanel>

              <h3 className="mt-8 text-lg font-bold text-primary">{t('step2bTitle')}</h3>
              <p className="leading-relaxed text-muted-foreground">{t('step2bDesc')}</p>
              <CodeBlock snippets={step2bSnippets} />

              <Callout type="tip">
                <strong>{t('step2Tip')}</strong><br />
                <code className="mt-1.5 block font-mono text-xs" dir="ltr">openssl pkcs12 -in issuer.p12 -nocerts -out issuer.key -nodes</code>
                <code className="block font-mono text-xs" dir="ltr">openssl pkcs12 -in issuer.p12 -clcerts -nokeys -out issuer.pem</code>
              </Callout>
            </StepSection>

            <StepSection id="step-3" number="٣" icon={UserPlus} title={t('step3Title')}>
              <p className="leading-relaxed text-muted-foreground">{t('step3Desc')}</p>
              <CodeBlock snippets={step3Snippets} />
              <InfoPanel title={t('expectedResponse201')}>
                <CodeBlock code={`{
  "issuerId": 1,
  "serial": "abc123...",
  "validFrom": "2026-01-01T00:00:00Z",
  "validUntil": "2027-01-01T00:00:00Z"
}`} language="json" />
              </InfoPanel>
              <Callout type="warning">{t('step3Callout')}</Callout>
            </StepSection>

            <StepSection id="step-4" number="٤" icon={FilePlus} title={t('step4Title')}>
              <p className="leading-relaxed text-muted-foreground">{t('step4Desc')}</p>

              <h3 className="mt-4 text-lg font-bold text-primary">{t('step4aTitle')}</h3>
              <CodeBlock snippets={step4aSnippets} />
              <Callout type="warning">{t('step4aCallout')}</Callout>

              <h3 className="mt-6 text-lg font-bold text-primary">{t('step4bTitle')}</h3>
              <CodeBlock snippets={step4bSnippets} />
              <InfoPanel title={t('expectedResponse201')}>
                <CodeBlock code={`{ "docId": "550e8400-e29b-41d4-a716-446655440000" }`} language="json" />
              </InfoPanel>
            </StepSection>

            <StepSection id="step-5" number="٥" icon={PenTool} title={t('step5Title')}>
              <p className="leading-relaxed text-muted-foreground">{t('step5Desc')}</p>

              <h3 className="mt-4 text-lg font-bold text-primary">{t('step5aTitle')}</h3>
              <CodeBlock snippets={step5aSnippets} />
              <Callout type="warning">{t('step5aCallout')}</Callout>

              <h3 className="mt-6 text-lg font-bold text-primary">{t('step5bTitle')}</h3>
              <CodeBlock snippets={step5bSnippets} />
              <InfoPanel title={t('expectedResponse201')}>
                <CodeBlock code={`{
  "signatureId": "660e8400-e29b-41d4-a716-446655440001",
  "status": "VALID"
}`} language="json" />
              </InfoPanel>
              <Callout type="info">{t('step5bCallout')}</Callout>
            </StepSection>

            <StepSection id="step-6" number="٦" icon={XCircle} title={t('step6Title')}>
              <p className="leading-relaxed text-muted-foreground">{t('step6Desc')}</p>
              <CodeBlock snippets={step6Snippets} />
              <InfoPanel title={t('expectedResponse200')}>
                <CodeBlock code={`{ "revoked": true }`} language="json" />
              </InfoPanel>
            </StepSection>

            <StepSection id="step-7" number="٧" icon={CheckCircle} title={t('step7Title')}>
              <p className="leading-relaxed text-muted-foreground">{t('step7Desc')}</p>
              <CodeBlock snippets={step7Snippets} />
              <InfoPanel title={t('expectedResponse200')}>
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
              </InfoPanel>
            </StepSection>
          </div>

          {/* Reference */}
          <section id="reference" className="scroll-mt-28">
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-black text-primary">
              <Database className="size-6 text-accent" /> {t('refTitle')}
            </h2>

            <h3 className="mb-3 text-lg font-bold text-primary">{t('apiEndpoints')}</h3>
            <TableShell>
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <Th>{t('method')}</Th>
                    <Th>{t('path')}</Th>
                    <Th>{t('desc')}</Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 bg-card/50">
                  {[
                    ['POST', '/api/certs/enroll', t('api1Desc')],
                    ['POST', '/api/documents/initiate', t('api2Desc')],
                    ['POST', '/api/documents/{docId}/signatures', t('api3Desc')],
                    ['POST', '/api/documents/{docId}/revoke', t('api4Desc')],
                    ['POST', '/api/documents/verify', t('api5Desc')],
                    ['GET', '/api/documents/health', t('api6Desc')],
                  ].map(([method, path, desc], i) => (
                    <tr key={i} className="transition-colors hover:bg-secondary/30">
                      <td className="px-4 py-3">
                        <Badge className="rounded-md bg-accent/15 px-2 py-0.5 font-mono text-[10px] font-black text-accent" dir="ltr">{method}</Badge>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-primary" dir="ltr">{path}</td>
                      <td className="px-4 py-3 text-muted-foreground">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableShell>

            <h3 className="mb-3 mt-10 text-lg font-bold text-primary">{t('commonErrors')}</h3>
            <TableShell>
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <Th>{t('code')}</Th>
                    <Th>{t('error')}</Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 bg-card/50">
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
                    <tr key={i} className="transition-colors hover:bg-secondary/30">
                      <td className="px-4 py-3 font-mono text-xs font-black text-red-500" dir="ltr">{code}</td>
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground" dir="ltr">{msg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableShell>
          </section>

        </main>
      </div>
    </div>
  )
}
