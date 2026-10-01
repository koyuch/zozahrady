import React from 'react'

import type { ReviewsListBlock } from '@/payload-types'
import { getLocale } from '@/lib/locale-server'
import { getPayloadClient } from '@/lib/payload'
import { ReviewsSection } from '@/components/sections/ReviewsSection'

interface ReviewsListBlockProps {
  block: ReviewsListBlock
}

export async function ReviewsListBlockComponent({ block }: ReviewsListBlockProps) {
  const locale = await getLocale()
  const payload = await getPayloadClient()

  const { docs: reviews } = await payload.find({
    collection: 'reviews',
    where: {
      status: { equals: 'Approved' },
    },
    limit: 100,
    sort: '-createdAt',
  })

  return (
    <ReviewsSection
      reviews={reviews}
      isSk={locale === 'sk_eur'}
      anchorId={block.anchorId ?? undefined}
      heading={block.heading ?? undefined}
      intro={block.intro ?? undefined}
    />
  )
}
