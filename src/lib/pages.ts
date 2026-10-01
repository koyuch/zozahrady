import type { Payload } from 'payload'

import type { Page } from '@/payload-types'

import { LOCALES, type Locale } from './locale'

export type PayloadLocale = 'sk' | 'cs'

/** Maps the cookie locale (sk_eur | cz_czk) to the Payload locale code (sk | cs). */
export function toPayloadLocale(locale: Locale): PayloadLocale {
  return LOCALES[locale].lang as PayloadLocale
}

export async function getPublishedPage(
  payload: Payload,
  slug: string,
  locale: PayloadLocale,
): Promise<Page | null> {
  const { docs } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: slug },
      _status: { equals: 'published' },
    },
    limit: 1,
    locale,
    depth: 1,
    draft: false,
  })
  return docs[0] ?? null
}

export async function getMenuPages(payload: Payload, locale: PayloadLocale): Promise<Page[]> {
  const { docs } = await payload.find({
    collection: 'pages',
    where: {
      showInMenu: { equals: true },
      _status: { equals: 'published' },
    },
    sort: 'menuOrder',
    locale,
    depth: 0,
    limit: 100,
    draft: false,
  })
  return docs
}
