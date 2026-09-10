'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { useTransition } from 'react'
import { Globe } from 'lucide-react'

export function LanguageToggle() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const switchLocale = () => {
    const next = locale === 'ar' ? 'en' : 'ar'
    // Replace current locale prefix with the new one
    const newPath = pathname.replace(`/${locale}`, `/${next}`)
    startTransition(() => {
      router.push(newPath)
    })
  }

  return (
    <button
      onClick={switchLocale}
      disabled={isPending}
      aria-label={locale === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
      className="flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1.5 text-xs font-bold text-primary transition-all hover:border-accent/50 hover:bg-accent/10 hover:text-accent disabled:opacity-50"
    >
      <Globe className="size-3.5" />
      <span>{locale === 'ar' ? 'EN' : 'AR'}</span>
    </button>
  )
}
