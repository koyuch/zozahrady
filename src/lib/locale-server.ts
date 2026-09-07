import { cookies } from 'next/headers'

import { DEFAULT_LOCALE, LOCALES, LOCALE_COOKIE_NAME } from './locale'
import type { Locale } from './locale'

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const val = cookieStore.get(LOCALE_COOKIE_NAME)?.value as Locale | undefined
  if (val && Object.hasOwn(LOCALES, val)) {
    return val
  }
  return DEFAULT_LOCALE
}
