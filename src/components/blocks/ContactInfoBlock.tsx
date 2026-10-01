import React from 'react'

import type { ContactInfoBlock } from '@/payload-types'
import { getLocale } from '@/lib/locale-server'
import { getPayloadClient } from '@/lib/payload'
import { ContactSection } from '@/components/sections/ContactSection'

interface ContactInfoBlockProps {
  block: ContactInfoBlock
}

export async function ContactInfoBlockComponent({ block }: ContactInfoBlockProps) {
  const locale = await getLocale()
  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({ slug: 'site-settings' })

  return (
    <ContactSection
      settings={settings}
      isSk={locale === 'sk_eur'}
      anchorId={block.anchorId ?? undefined}
      heading={block.heading ?? undefined}
      subheading={block.subheading ?? undefined}
    />
  )
}
