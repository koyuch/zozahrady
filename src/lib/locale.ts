'use server'

import { cookies } from 'next/headers'

export type Locale = 'sk_eur' | 'cz_czk'

export const DEFAULT_LOCALE: Locale = 'sk_eur'
export const LOCALE_COOKIE_NAME = 'zozahrady_locale'

export interface LocaleConfig {
  code: Locale
  lang: string
  country: string
  label: string
  currency: string
  currencySymbol: string
  flag: string
}

export const LOCALES: Record<Locale, LocaleConfig> = {
  sk_eur: {
    code: 'sk_eur',
    lang: 'sk',
    country: 'SK',
    label: 'Slovensko',
    currency: 'EUR',
    currencySymbol: '€',
    flag: '🇸🇰',
  },
  cz_czk: {
    code: 'cz_czk',
    lang: 'cs',
    country: 'CZ',
    label: 'Česko',
    currency: 'CZK',
    currencySymbol: 'Kč',
    flag: '🇨🇿',
  },
}

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const val = cookieStore.get(LOCALE_COOKIE_NAME)?.value as Locale | undefined
  if (val && val in LOCALES) {
    return val
  }
  return DEFAULT_LOCALE
}

export async function setLocaleAction(locale: Locale): Promise<void> {
  if (!LOCALES[locale]) return
  const cookieStore = await cookies()
  cookieStore.set(LOCALE_COOKIE_NAME, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax',
  })
}
