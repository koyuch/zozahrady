'use server'

import { cookies } from 'next/headers'

import { LOCALES, LOCALE_COOKIE_NAME } from './locale'
import type { Locale } from './locale'

export async function setLocaleAction(locale: Locale): Promise<void> {
  if (!Object.hasOwn(LOCALES, locale)) return
  const cookieStore = await cookies()
  cookieStore.set(LOCALE_COOKIE_NAME, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax',
  })
}
