import { ShieldCheck, BookOpen, Key, Link as LinkIcon, FileCheck, Info, AlertTriangle, Terminal, Download } from 'lucide-react'
import { CodeBlock } from '@/components/ui/code-block'

export const metadata = {
  title: 'دليل ربط المصدرين | ثقة',
  description: 'دليل ربط المصدرين لتسجيل الشهادات وتوقيع الوثائق في منصة ثقة',
}

export default function GuidePage() {
  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground selection:bg-accent/30">
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 px-6 py-4 backdrop-blur-md lg:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="/" className="flex items-center gap-3" aria-label="ثقة - الصفحة الرئيسية">
            <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <ShieldCheck className="size-5" strokeWidth={1.8} />
            </span>
            <span className="text-lg font-bold tracking-tight">ثقة<span className="text-accent">.</span></span>
          </a>
          <div className="flex items-center gap-4">
            <span className="hidden rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary sm:inline-block">
              مركز المطورين
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl flex-col items-start gap-10 px-6 py-10 lg:flex-row lg:gap-16 lg:px-10 lg:py-16">
        
        {/* Sidebar Navigation */}
        <aside className="sticky top-28 hidden w-64 shrink-0 lg:block">
          <div className="mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">محتويات الدليل</div>
          <nav className="flex flex-col gap-1.5 text-sm font-medium">
            <a href="#intro" className="rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-secondary">المقدمة والأهداف</a>
            <a href="#prerequisites" className="rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-secondary">المتطلبات الأساسية</a>
            <a href="#base-urls" className="rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-secondary">الروابط الأساسية (Base URLs)</a>
            <a href="#step-1" className="rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-secondary">الخطوة ١: الحصول على الشهادة</a>
            <a href="#step-2" className="rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-secondary">الخطوة ٢: التسجيل في ثقة</a>
            <a href="#step-3" className="rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-secondary">الخطوة ٣: بدء وثيقة جديدة</a>
            <a href="#step-4" className="rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-secondary">الخطوة ٤: توقيع الوثيقة</a>
            <a href="#step-5" className="rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-secondary">الخطوة ٥: إلغاء وثيقة</a>
            <a href="#step-6" className="rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-secondary">الخطوة ٦: التحقق من وثيقة</a>
            <a href="#reference" className="rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-secondary">المراجع والأخطاء</a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="w-full min-w-0 flex-1 space-y-16">
          <div className="space-y-4 border-b border-border pb-10">
            <h1 className="text-4xl font-black text-primary lg:text-5xl">دليل ربط المصدرين</h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              يرشدك هذا الدليل خلال دورة حياة المصدر الكاملة: تسجيل شهادتك في منصة ثقة، بدء الوثائق، توقيعها باستخدام CAdES-BES، وإلغائها أو التحقق منها عند الحاجة.
            </p>
          </div>

          {/* Intro Section */}
          <section id="intro" className="space-y-6 scroll-mt-28">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-primary"><BookOpen className="size-6 text-accent" /> لمن هذا الدليل؟</h2>
            <p className="leading-relaxed text-muted-foreground">
              للمؤسسات التي تحتاج إلى توقيع الوثائق على منصة ثقة باستخدام شهادات PKI الصادرة عن المرجع المعتمد (EJBCA CA).
            </p>
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h3 className="mb-4 font-bold text-primary">ماذا ستحقق بنهاية الدليل؟</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><CheckIcon /> الحصول على شهادة من EJBCA.</li>
                <li className="flex items-center gap-2"><CheckIcon /> التسجيل كمصدر معتمد في منصة ثقة.</li>
                <li className="flex items-center gap-2"><CheckIcon /> بدء، توقيع، إلغاء، والتحقق من الوثائق.</li>
              </ul>
            </div>
          </section>

          {/* Prerequisites */}
          <section id="prerequisites" className="space-y-6 scroll-mt-28">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-primary"><Terminal className="size-6 text-accent" /> المتطلبات الأساسية</h2>
            
            <h3 className="text-lg font-bold">للمصدرين (Issuers)</h3>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm text-right">
                <thead className="bg-secondary/50 font-bold text-primary">
                  <tr>
                    <th className="p-4 border-b border-border">المتطلب</th>
                    <th className="p-4 border-b border-border">التفاصيل</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-card">
                  <tr>
                    <td className="p-4 font-mono">OpenSSL 1.1.1+</td>
                    <td className="p-4 text-muted-foreground">مطلوب لاستخراج الشهادة من P12 وتوقيع CAdES-BES. تحقق باستخدام <code className="bg-secondary px-1 py-0.5 rounded">openssl version</code>.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono">jq</td>
                    <td className="p-4 text-muted-foreground">يستخدم لبناء وقراءة JSON بأمان (يتجنب حدود طول المتغيرات في سطر الأوامر).</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono">curl</td>
                    <td className="p-4 text-muted-foreground">لإرسال الطلبات لـ Thiqa Hub API.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono">uuidgen</td>
                    <td className="p-4 text-muted-foreground">لإنشاء معرفات الوثائق (Document IDs).</td>
                  </tr>
                  <tr>
                    <td className="p-4">متصفح الويب</td>
                    <td className="p-4 text-muted-foreground">لإكمال عملية التسجيل في EJBCA.</td>
                  </tr>
                  <tr>
                    <td className="p-4">بيانات التسجيل في EJBCA</td>
                    <td className="p-4 text-muted-foreground">سيوفر لك مسؤول EJBCA: رابط التسجيل، اسم المستخدم، وكلمة المرور.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="mt-8 text-lg font-bold">لمسؤولي EJBCA</h3>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm text-right">
                <thead className="bg-secondary/50 font-bold text-primary">
                  <tr>
                    <th className="p-4 border-b border-border">المتطلب</th>
                    <th className="p-4 border-b border-border">التفاصيل</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-card">
                  <tr>
                    <td className="p-4 font-mono">Python 3.6+</td>
                    <td className="p-4 text-muted-foreground">مطلوب لتشغيل أداة <code className="bg-secondary px-1 py-0.5 rounded">create-issuer.py</code>.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono">paramiko</td>
                    <td className="p-4 text-muted-foreground">مكتبة Python لـ SSH (استخدم <code className="bg-secondary px-1 py-0.5 rounded">pip install paramiko</code>).</td>
                  </tr>
                  <tr>
                    <td className="p-4">صلاحيات SSH</td>
                    <td className="p-4 text-muted-foreground">تتصل الأداة بخادم EJBCA عبر SSH لإدارة الكيانات النهائية (End Entities).</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono">ejbca-config.json</td>
                    <td className="p-4 text-muted-foreground">ملف إعدادات للاتصال بـ EJBCA.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex items-center justify-between rounded-xl border border-primary/20 bg-primary/5 p-5">
              <div>
                <h4 className="font-bold text-primary">تحميل أدوات المصدر (CLI Scripts)</h4>
                <p className="mt-1 text-sm text-muted-foreground">تحتوي هذه الحزمة على أدوات Python لإدارة المصدرين على EJBCA.</p>
              </div>
              <a href="/ejbca-issuer-cli.zip" download className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20">
                <Download className="size-4" />
                تحميل الحزمة
              </a>
            </div>
          </section>

          {/* Base URLs */}
          <section id="base-urls" className="space-y-6 scroll-mt-28">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-primary"><LinkIcon className="size-6 text-accent" /> الروابط الأساسية (Base URLs)</h2>
            <p className="leading-relaxed text-muted-foreground">
              استبدل الروابط المؤقتة أدناه بالعناوين الفعلية لبيئة العمل الخاصة بك.
            </p>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm text-right">
                <thead className="bg-secondary/50 font-bold text-primary">
                  <tr>
                    <th className="p-4 border-b border-border">الخدمة</th>
                    <th className="p-4 border-b border-border">المتغير المؤقت (Placeholder)</th>
                    <th className="p-4 border-b border-border">مثال</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-card">
                  <tr>
                    <td className="p-4">EJBCA RA Web UI</td>
                    <td className="p-4 font-mono text-accent">YOUR_EJBCA_RA_URL</td>
                    <td className="p-4 font-mono text-muted-foreground text-left" dir="ltr">https://ejbca.example.com:8443/ejbca/ra/cas.xhtml</td>
                  </tr>
                  <tr>
                    <td className="p-4">Thiqa Hub API</td>
                    <td className="p-4 font-mono text-accent">YOUR_HUB_URL</td>
                    <td className="p-4 font-mono text-muted-foreground text-left" dir="ltr">http://hub.example.com:8081</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Step 1 */}
          <section id="step-1" className="space-y-6 scroll-mt-28">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-primary"><span className="grid size-8 place-items-center rounded-full bg-accent/20 text-accent font-mono text-sm">1</span> الحصول على الشهادة من EJBCA</h2>
            <p className="leading-relaxed text-muted-foreground">
              يقوم مسؤول EJBCA بإنشاء كيان نهائي (End Entity) لمؤسستك باستخدام أداة <code className="bg-secondary px-1 py-0.5 rounded text-foreground">create-issuer.py</code>. ثم تقوم بالتسجيل من خلال واجهة الويب لتحميل شهادتك.
            </p>

            <h3 className="text-lg font-bold text-primary mt-8">١.١ يقوم مسؤول EJBCA بإنشاء الكيان النهائي</h3>
            <p className="leading-relaxed text-muted-foreground">يشغل المسؤول الأمر التالي:</p>
            <CodeBlock code={'python3 create-issuer.py create "Your Organization Name" "your_enrollment_password" --country SD'} language="bash" />
            <p className="leading-relaxed text-muted-foreground mt-4">سيوفر لك المسؤول: رابط التسجيل، اسم المستخدم، وكلمة المرور.</p>

            <h3 className="text-lg font-bold text-primary mt-8">١.٢ التسجيل عبر واجهة الويب</h3>
            <ul className="list-decimal list-inside space-y-2 text-muted-foreground pr-4">
              <li>افتح رابط التسجيل في متصفحك.</li>
              <li>اختر &quot;Use username&quot; كطريقة مصادقة.</li>
              <li>أدخل اسم المستخدم وكلمة المرور التي قدمها المسؤول.</li>
              <li>انقر على &quot;Enroll&quot; لإنشاء الشهادة.</li>
              <li>قم بتنزيل ملف P12 عند مطالبتك بذلك.</li>
            </ul>

            <h3 className="text-lg font-bold text-primary mt-8">١.٣ استخراج المفتاح الخاص وسلسلة الشهادات</h3>
            <p className="leading-relaxed text-muted-foreground">
              يحتوي ملف P12 على مفتاحك الخاص (مطلوب للتوقيع) وسلسلة الشهادات (مطلوبة للتسجيل في ثقة). قم باستخراجهما:
            </p>
            <CodeBlock code={`# استخراج المفتاح الخاص (الخطوة ٥)
openssl pkcs12 -in issuer.p12 -nocerts -out issuer.key \\
  -passin pass:YOUR_ENROLLMENT_PASSWORD -passout pass:YOUR_ENROLLMENT_PASSWORD

# استخراج سلسلة الشهادات (الخطوة ٢)
openssl pkcs12 -in issuer.p12 -nokeys -out issuer.pem \\
  -passin pass:YOUR_ENROLLMENT_PASSWORD`} language="bash" />

            <Callout type="warning">
              احفظ ملف <strong>issuer.key</strong> بشكل آمن ولا تشاركه أبداً. يُستخدم هذا المفتاح لتوقيع الوثائق نيابة عنك.
            </Callout>
          </section>

          {/* Step 2 */}
          <section id="step-2" className="space-y-6 scroll-mt-28">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-primary"><span className="grid size-8 place-items-center rounded-full bg-accent/20 text-accent font-mono text-sm">2</span> التسجيل في منصة ثقة</h2>
            <p className="leading-relaxed text-muted-foreground">
              أرسل سلسلة الشهادات المستخرجة إلى منصة ثقة (Thiqa Hub). ستقوم المنصة بالتحقق من السلسلة مقابل الجذر الحكومي المعتمد، والتحقق من حالة OCSP، وتسجيلك كموقع معتمد.
            </p>
            <CodeBlock code={`CERT_PEM=$(awk 'NF {sub(/\\r/, ""); printf "%s\\\\n",$0;}' issuer.pem)

curl -X POST "YOUR_HUB_URL/api/certs/enroll" \\
  -H "Content-Type: application/json" \\
  -d "{ \\"certPem\\": \\"$CERT_PEM\\" }"`} language="bash" />

            <div className="rounded-xl border border-border bg-card p-6">
              <p className="mb-4 text-sm font-bold text-muted-foreground">الاستجابة المتوقعة (HTTP 201 Created):</p>
              <CodeBlock code={`{
  "issuerId": 1,
  "serial": "abc123...",
  "validFrom": "2026-01-01T00:00:00Z",
  "validUntil": "2027-01-01T00:00:00Z"
}`} language="json" className="my-0" />
            </div>

            <Callout type="important">
              يجب أن يحتوي حقل <code>certPem</code> على سلسلة الشهادات الكاملة (شهادة النهاية + شهادات CA الوسيطة). إرسال شهادة النهاية فقط سيؤدي إلى خطأ في التحقق من السلسلة.
            </Callout>
          </section>

          {/* Step 3 */}
          <section id="step-3" className="space-y-6 scroll-mt-28">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-primary"><span className="grid size-8 place-items-center rounded-full bg-accent/20 text-accent font-mono text-sm">3</span> بدء وثيقة جديدة</h2>
            <p className="leading-relaxed text-muted-foreground">
              قم بإنشاء معرف فريد للوثيقة (Document ID)، ثم اطبعه كرمز استجابة سريعة (QR Code) على وثيقتك، ثم احسب الـ Hash وسجله في منصة ثقة.
            </p>

            <h3 className="text-lg font-bold text-primary mt-8">٣.١ إنشاء المعرف وختم الوثيقة</h3>
            <CodeBlock code={`DOC_ID=$(uuidgen)`} language="bash" />
            <p className="leading-relaxed text-muted-foreground">
              قم بختم رمز QR يحتوي على <code>$DOC_ID</code> على ملف الـ PDF قبل المتابعة. يجب تضمين الرمز في هذه المرحلة لأن الـ Hash يُحسب بناءً على المحتوى النهائي للوثيقة.
            </p>

            <h3 className="text-lg font-bold text-primary mt-8">٣.٢ حساب الـ Hash والتسجيل</h3>
            <CodeBlock code={`# حساب SHA-256 للوثيقة المختومة
DOC_HASH=$(sha256sum document.pdf | awk '{print $1}')

# ترميز الوثيقة بـ Base64
RENDERING_B64=$(base64 -w 0 document.pdf)

# بناء حمولة JSON بأمان باستخدام jq
jq -n \\
  --arg docId "$DOC_ID" \\
  --arg docHash "$DOC_HASH" \\
  --arg renderingBase64 "$RENDERING_B64" \\
  '{
    docId: $docId,
    docHash: $docHash,
    hashAlgorithm: "SHA-256",
    renderingBase64: $renderingBase64,
    minRequiredSignatures: 1
  }' > initiate_payload.json

curl -X POST "YOUR_HUB_URL/api/documents/initiate" \\
  -H "Content-Type: application/json" \\
  -d @initiate_payload.json`} language="bash" />

            <div className="rounded-xl border border-border bg-card p-6">
              <p className="mb-4 text-sm font-bold text-muted-foreground">الاستجابة المتوقعة (HTTP 201 Created):</p>
              <CodeBlock code={`{
  "docId": "550e8400-e29b-41d4-a716-446655440000"
}`} language="json" className="my-0" />
            </div>

            <Callout type="info">
              تقوم المنصة بحساب الـ Hash على بايتات الوثيقة الخام (بعد فك تشفير Base64). يجب أن يتطابق <code>docHash</code> الذي ترسله مع ما تحسبه المنصة. استخدام <code>sha256sum</code> على ملف PDF الخام ينتج الـ Hash الصحيح.
            </Callout>
          </section>

          {/* Step 4 */}
          <section id="step-4" className="space-y-6 scroll-mt-28">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-primary"><span className="grid size-8 place-items-center rounded-full bg-accent/20 text-accent font-mono text-sm">4</span> توقيع الوثيقة (CAdES-BES)</h2>
            <p className="leading-relaxed text-muted-foreground">
              وقع الـ Hash للوثيقة باستخدام توقيع CAdES-BES وأرسله إلى منصة ثقة.
            </p>

            <h3 className="text-lg font-bold text-primary mt-8">٤.١ تحويل الـ Hash وتوقيعه</h3>
            <CodeBlock code={`# تحويل الـ Hash النصي (Hex) إلى بايتات ثنائية (Binary)
echo -n "$DOC_HASH" | xxd -r -p > hash.bin

# التوقيع باستخدام CAdES-BES
# -nodetach: يدمج الـ Hash داخل هيكل CMS (مطلوب)
# -cades: يتضمن السمة signing-certificate-v2 (مطلوب)
# -binary: يمنع اقتطاع البايتات الصفرية (حيوي جداً)
openssl cms -sign -in hash.bin -outform DER -out signature.der \\
  -signer issuer.pem -inkey issuer.key -nodetach -md sha256 -cades -binary`} language="bash" />

            <Callout type="warning">
              مُعامل <code>-binary</code> إلزامي. بدونه، قد يقتطع OpenSSL الإدخال عند البايتات الصفرية، مما ينتج توقيعاً سترفضه المنصة (عدم تطابق الـ Hash).
            </Callout>

            <h3 className="text-lg font-bold text-primary mt-8">٤.٢ إرسال التوقيع</h3>
            <CodeBlock code={`SIG_B64=$(base64 -w 0 signature.der)

curl -X POST "YOUR_HUB_URL/api/documents/$DOC_ID/signatures" \\
  -H "Content-Type: application/json" \\
  -d "{ \\"cadesSignatureBase64\\": \\"$SIG_B64\\" }"`} language="bash" />

            <div className="rounded-xl border border-border bg-card p-6">
              <p className="mb-4 text-sm font-bold text-muted-foreground">الاستجابة المتوقعة (HTTP 201 Created):</p>
              <CodeBlock code={`{
  "signatureId": "660e8400-e29b-41d4-a716-446655440001",
  "status": "VALID"
}`} language="json" className="my-0" />
            </div>
          </section>

          {/* Step 5 */}
          <section id="step-5" className="space-y-6 scroll-mt-28">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-primary"><span className="grid size-8 place-items-center rounded-full bg-accent/20 text-accent font-mono text-sm">5</span> إلغاء وثيقة</h2>
            <p className="leading-relaxed text-muted-foreground">
              لإلغاء وثيقة سابقة، استدعِ نقطة النهاية الخاصة بالإلغاء. الإلغاء إجراء دائم - يجب إنشاء وثيقة مصححة كوثيقة جديدة.
            </p>
            <CodeBlock code={`curl -X POST "YOUR_HUB_URL/api/documents/$DOC_ID/revoke" \\
  -H "Content-Type: application/json" \\
  -d '{
    "reason": "Administrative cancellation",
    "revokedBy": "YOUR_ISSUER_NAME"
  }'`} language="bash" />
            
            <div className="rounded-xl border border-border bg-card p-6 mt-4">
              <p className="mb-4 text-sm font-bold text-muted-foreground">الاستجابة المتوقعة (HTTP 200 OK):</p>
              <CodeBlock code={`{
  "revoked": true
}`} language="json" className="my-0" />
            </div>
          </section>

          {/* Step 6 */}
          <section id="step-6" className="space-y-6 scroll-mt-28">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-primary"><span className="grid size-8 place-items-center rounded-full bg-accent/20 text-accent font-mono text-sm">6</span> التحقق من وثيقة</h2>
            <p className="leading-relaxed text-muted-foreground">
              يمكنك التحقق من صحة الوثيقة في أي وقت. تعيد المنصة التحقق من جميع التوقيعات المخزنة مقابل الـ Hash وتُرجع الحالة الحالية.
            </p>
            <CodeBlock code={`curl -X POST "YOUR_HUB_URL/api/documents/verify" \\
  -H "Content-Type: application/json" \\
  -d "{ \\"docId\\": \\"$DOC_ID\\" }"`} language="bash" />
            
            <div className="rounded-xl border border-border bg-card p-6 mt-4">
              <p className="mb-4 text-sm font-bold text-muted-foreground">الاستجابة المتوقعة (HTTP 200 OK):</p>
              <CodeBlock code={`{
  "valid": true,
  "docHash": "a1b2c3d4...",
  "hashAlgorithm": "SHA-256",
  "status": "VALID",
  "signatureCount": 1,
  "minRequiredSignatures": 1,
  "signatures": [
    {
      "issuerName": "CN=Your Organization Name,O=Your Organization,C=SD",
      "signedAt": "2026-09-07T12:00:00Z",
      "receiptTime": "2026-09-07T12:00:01Z",
      "certWasValidAtSigning": true,
      "ocspStatusAtSigning": "GOOD"
    }
  ],
  "rendering": "JVBERi0xLjQK..."
}`} language="json" className="my-0" />
            </div>
          </section>

          {/* Reference */}
          <section id="reference" className="space-y-8 scroll-mt-28 border-t border-border pt-10">
            <h2 className="text-3xl font-black text-primary">المراجع</h2>

            <div>
              <h3 className="mb-4 text-lg font-bold">نقاط النهاية (API Endpoints)</h3>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm text-right">
                  <thead className="bg-secondary/50 font-bold text-primary">
                    <tr>
                      <th className="p-4 border-b border-border">المسار (Path)</th>
                      <th className="p-4 border-b border-border">العملية</th>
                      <th className="p-4 border-b border-border">الوصف</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card font-mono">
                    <tr><td className="p-4">/api/certs/enroll</td><td className="p-4 text-accent">POST</td><td className="p-4 text-muted-foreground font-sans">تسجيل شهادة مُصدر</td></tr>
                    <tr><td className="p-4">/api/documents/initiate</td><td className="p-4 text-accent">POST</td><td className="p-4 text-muted-foreground font-sans">بدء وثيقة جديدة</td></tr>
                    <tr><td className="p-4">/api/documents/{"{docId}"}/signatures</td><td className="p-4 text-accent">POST</td><td className="p-4 text-muted-foreground font-sans">إرسال توقيع CAdES-BES</td></tr>
                    <tr><td className="p-4">/api/documents/{"{docId}"}/revoke</td><td className="p-4 text-accent">POST</td><td className="p-4 text-muted-foreground font-sans">إلغاء وثيقة</td></tr>
                    <tr><td className="p-4">/api/documents/verify</td><td className="p-4 text-accent">POST</td><td className="p-4 text-muted-foreground font-sans">التحقق من وثيقة</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-bold">الأخطاء الشائعة (Troubleshooting)</h3>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm text-right">
                  <thead className="bg-secondary/50 font-bold text-primary">
                    <tr>
                      <th className="p-4 border-b border-border">الخطأ</th>
                      <th className="p-4 border-b border-border">السبب المحتمل</th>
                      <th className="p-4 border-b border-border">الحل</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card">
                    <tr>
                      <td className="p-4 font-mono text-xs">Chain does not terminate at trust anchor</td>
                      <td className="p-4 text-muted-foreground">سلسلة الشهادات غير مكتملة أو لا تتضمن CA وسيطة.</td>
                      <td className="p-4 text-muted-foreground">تأكد أن <code>issuer.pem</code> يحتوي على السلسلة الكاملة.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-mono text-xs">Hash does not match rendering</td>
                      <td className="p-4 text-muted-foreground">تم تعديل الوثيقة بعد حساب الـ Hash.</td>
                      <td className="p-4 text-muted-foreground">أعد الحساب على ملف الـ PDF النهائي (بعد ختم QR).</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-mono text-xs">Hash mismatch (signature)</td>
                      <td className="p-4 text-muted-foreground">تم استخدام OpenSSL بدون مُعامل <code>-binary</code>.</td>
                      <td className="p-4 text-muted-foreground">أضف <code>-binary</code> لأمر التوقيع.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  )
}

function CheckIcon() {
  return (
    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-accent/20 text-accent">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  )
}

function Callout({ type, children }: { type: 'warning' | 'important' | 'info', children: React.ReactNode }) {
  const styles = {
    warning: 'border-yellow-500/50 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
    important: 'border-red-500/50 bg-red-500/10 text-red-600 dark:text-red-400',
    info: 'border-blue-500/50 bg-blue-500/10 text-blue-600 dark:text-blue-400',
  }
  
  const icons = {
    warning: <AlertTriangle className="size-5 shrink-0" />,
    important: <Info className="size-5 shrink-0" />,
    info: <Info className="size-5 shrink-0" />,
  }

  return (
    <div className={`my-6 flex items-start gap-4 rounded-xl border p-4 ${styles[type]}`}>
      {icons[type]}
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  )
}
