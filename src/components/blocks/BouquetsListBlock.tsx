import React from 'react'

import type { BouquetsListBlock } from '@/payload-types'
import { getLocale } from '@/lib/locale-server'
import { getPayloadClient } from '@/lib/payload'
import { toPayloadLocale } from '@/lib/pages'
import { BouquetsSection } from '@/components/sections/BouquetsSection'
import { LOCALES } from '@/lib/locale'

interface BouquetsListBlockProps {
  block: BouquetsListBlock
}

export async function BouquetsListBlockComponent({ block }: BouquetsListBlockProps) {
  const locale = await getLocale()
  const localeConfig = LOCALES[locale]
  const payload = await getPayloadClient()

  const { docs: bouquets } = await payload.find({
    collection: 'bouquets',
    limit: 100,
    depth: 1,
    sort: '-createdAt',
    locale: toPayloadLocale(locale),
  })

  return (
    <BouquetsSection
      bouquets={bouquets}
      isSk={locale === 'sk_eur'}
      currencySymbol={localeConfig.currencySymbol}
      anchorId={block.anchorId ?? undefined}
      heading={block.heading ?? undefined}
      intro={block.intro ?? undefined}
    />
  )
}
