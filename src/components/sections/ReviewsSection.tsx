import React from 'react'
import { Star, Quote } from 'lucide-react'

import type { Review } from '@/payload-types'

interface ReviewsSectionProps {
  reviews: Review[]
  isSk: boolean
  anchorId?: string
  heading?: string
  intro?: string
}

function StarRating({ rating }: { rating: string }) {
  const filled = Number.parseInt(rating, 10) || 0
  return (
    <div className="flex items-center gap-0.5" aria-label={`${filled}/5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < filled ? 'fill-primary text-primary' : 'text-muted-foreground/30'}`}
        />
      ))}
    </div>
  )
}

export function ReviewsSection({
  reviews,
  isSk,
  anchorId = 'recenzie',
  heading,
  intro,
}: ReviewsSectionProps) {
  if (reviews.length === 0) return null

  return (
    <section
      id={anchorId}
      className="scroll-mt-16 w-full py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            {heading ?? (isSk ? 'Recenzie' : 'Recenze')}
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-pretty">
            {intro ?? (isSk ? 'Čo o nás hovoria naši zákazníci' : 'Co o nás říkají naši zákazníci')}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-xs"
            >
              <div className="flex items-center justify-between mb-3">
                <StarRating rating={review.rating} />
                <Quote className="h-8 w-8 text-primary/15" />
              </div>
              <p className="text-sm text-foreground/85 leading-relaxed flex-1">
                &ldquo;{review.comment}&rdquo;
              </p>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                  {review.customerName.charAt(0)}
                </div>
                <span className="text-sm font-medium text-foreground">{review.customerName}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
