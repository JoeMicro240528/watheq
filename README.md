# ثقة — Watheq

**Trusted multi-signature document verification** powered by government PKI and OCSP evidence.

Watheq (ثقة, "trust" in Arabic) is a bilingual (Arabic / English) landing-page and developer-guide application for a document-signing and verification platform. It showcases how documents are created, signed, and verified using PKI infrastructure, CAdES-BES signatures, SHA-256 hashing, and real-time OCSP certificate validation.

---

## ✨ Features

- **Bilingual UI** — Full Arabic (RTL) and English (LTR) support with locale-aware routing
- **Dark / Light theme** — System-aware theme toggle with smooth transitions
- **Developer guide** — In-app technical guide with syntax-highlighted code snippets (Shiki)
- **Signature flow diagram** — Interactive visualization of the signing and verification workflow
- **Responsive design** — Mobile-first layout with collapsible navigation
- **Analytics** — Vercel Analytics integration (production only)

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | TypeScript 5.7 |
| Styling | Tailwind CSS 4 + CSS custom properties |
| Internationalization | [next-intl](https://next-intl.dev/) (Arabic & English) |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| Syntax Highlighting | [Shiki](https://shiki.style/) |
| Icons | [Lucide React](https://lucide.dev/) |
| UI Primitives | [Base UI](https://base-ui.com/), [shadcn/ui](https://ui.shadcn.com/) |
| Analytics | Vercel Analytics |
| Font | [Tajawal](https://fonts.google.com/specimen/Tajawal) (Arabic + Latin) |

---

## 📁 Project Structure

```
watheq/
├── app/
│   ├── globals.css              # Global styles & design tokens
│   └── [locale]/
│       ├── layout.tsx           # Root layout (fonts, theme, i18n provider)
│       ├── page.tsx             # Landing page (hero, features, how-it-works, security, CTA)
│       ├── guide/
│       │   └── page.tsx         # Developer integration guide
│       └── flow/
│           ├── page.tsx         # Signature flow page
│           └── flow-diagram.tsx # Interactive flow diagram component
├── components/
│   └── ui/
│       ├── button.tsx           # Button component
│       ├── code-block.tsx       # Server-side code block
│       ├── code-block-client.tsx# Client-side syntax highlighting
│       ├── language-toggle.tsx  # AR ↔ EN locale switcher
│       ├── theme-provider.tsx   # Dark / light theme context
│       └── theme-toggle.tsx     # Theme toggle button
├── i18n/
│   ├── routing.ts               # Locale routing config
│   └── request.ts               # Server-side locale resolution
├── lib/
│   ├── utils.ts                 # Shared utilities (cn helper)
│   └── snippets.ts              # Code snippets for the developer guide
├── messages/
│   ├── ar.json                  # Arabic translations
│   └── en.json                  # English translations
├── middleware.ts                # next-intl locale middleware
├── next.config.mjs              # Next.js configuration
├── public/                      # Static assets (logos, icons, downloads)
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **pnpm** (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd watheq

# Install dependencies
pnpm install
# or
npm install
```

### Development

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you will be redirected to `/ar` (default locale).

### Production Build

```bash
pnpm build && pnpm start
# or
npm run build && npm start
```

---

## 🌍 Internationalization

| Locale | Path Prefix | Direction |
|---|---|---|
| Arabic (default) | `/ar` | RTL |
| English | `/en` | LTR |

Translation files live in `messages/`. The locale is always present in the URL (`localePrefix: 'always'`). To add a new language:

1. Create `messages/<locale>.json` with all required keys
2. Add the locale to `i18n/routing.ts` → `locales` array
3. The middleware and layout will pick it up automatically

---

## 🔐 Security Standards

Watheq is built around the following cryptographic and compliance standards:

- **PKI** — Public Key Infrastructure for identity and certificate management
- **OCSP** — Online Certificate Status Protocol for real-time revocation checks
- **CAdES-BES** — CMS Advanced Electronic Signatures (Basic Electronic Signature)
- **SHA-256** — Cryptographic hashing for document integrity

---

## 📜 License

Private — all rights reserved.
