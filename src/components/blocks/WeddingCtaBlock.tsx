import React from 'react'
import Link from 'next/link'
import { Heart, Mail } from 'lucide-react'

import type { WeddingCtaBlock } from '@/payload-types'

interface WeddingCtaBlockProps {
  block: WeddingCtaBlock
}

export function WeddingCtaBlockComponent({ block }: WeddingCtaBlockProps) {
  return (
    <section
      id={block.anchorId ?? 'svadby'}
      className="scroll-mt-16 w-full py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-primary/5 to-background"
    >
      <div className="max-w-4xl mx-auto text-center space-y-6">
        {block.eyebrow && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold tracking-wide uppercase shadow-xs">
            <Heart className="w-3.5 h-3.5 text-primary" />
            <span>{block.eyebrow}</span>
          </div>
        )}
        {block.heading && (
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            {block.heading}
          </h2>
        )}
        {block.body && (
          <p className="max-w-2xl mx-auto text-base text-muted-foreground text-pretty leading-relaxed">
            {block.body}
          </p>
        )}
        {block.ctaHref && block.ctaLabel && (
          <Link
            href={block.ctaHref}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-md hover:opacity-95 hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            <span>{block.ctaLabel}</span>
          </Link>
        )}
      </div>
    </section>
  )
}
