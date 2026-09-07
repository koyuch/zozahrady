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
