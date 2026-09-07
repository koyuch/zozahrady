'use client'

import React, { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { LOCALES, type Locale } from '@/lib/locale'
import { setLocaleAction } from '@/lib/locale-actions'

interface LocaleSwitcherProps {
  currentLocale: Locale
}

export function LocaleSwitcher({ currentLocale }: LocaleSwitcherProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleSelect = (nextLocale: Locale) => {
    if (nextLocale === currentLocale || isPending) return
    startTransition(async () => {
      await setLocaleAction(nextLocale)
      router.refresh()
    })
  }

  const otherLocale: Locale = currentLocale === 'sk_eur' ? 'cz_czk' : 'sk_eur'
  const activeConfig = LOCALES[currentLocale]
  const nextConfig = LOCALES[otherLocale]

  return (
    <button
      type="button"
      onClick={() => handleSelect(otherLocale)}
      disabled={isPending}
      title={`Prepnúť na ${nextConfig.flag} ${nextConfig.country} (${nextConfig.currencySymbol})`}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border border-border bg-card/80 hover:bg-secondary hover:text-secondary-foreground transition-all duration-200 shadow-xs cursor-pointer disabled:opacity-50"
    >
      <span className="text-sm leading-none">{activeConfig.flag}</span>
      <span className="font-semibold text-foreground">{activeConfig.country}</span>
      <span className="text-muted-foreground">/</span>
      <span className="font-bold text-primary">{activeConfig.currencySymbol}</span>
      {isPending && <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />}
    </button>
  )
}
