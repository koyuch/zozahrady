import React from 'react'
import Link from 'next/link'
import { ArrowRight, Flower2, Heart, Sparkles } from 'lucide-react'

import type { HeroBlock as HeroBlockType } from '@/payload-types'

interface HeroBlockProps {
  block: HeroBlockType
}

export function HeroBlockComponent({ block }: HeroBlockProps) {
  return (
    <section className="w-full py-20 md:py-32 px-4 sm:px-6 lg:px-8 text-center bg-linear-to-b from-secondary/40 via-background to-background">
      <div className="max-w-4xl mx-auto space-y-6">
        {block.eyebrow && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold tracking-wide uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>{block.eyebrow}</span>
          </div>
        )}

        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground text-balance">
          {block.heading}
        </h1>

        {block.subheading && (
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground text-pretty leading-relaxed">
            {block.subheading}
          </p>
        )}

        {(block.primaryCtaHref || block.secondaryCtaHref) && (
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            {block.primaryCtaHref && block.primaryCtaLabel && (
              <Link
                href={block.primaryCtaHref}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-md hover:opacity-95 hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <Flower2 className="w-4 h-4" />
                <span>{block.primaryCtaLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}

            {block.secondaryCtaHref && block.secondaryCtaLabel && (
              <Link
                href={block.secondaryCtaHref}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-card hover:bg-secondary text-foreground font-semibold text-sm transition-all duration-200 shadow-xs cursor-pointer"
              >
                <Heart className="w-4 h-4 text-primary" />
                <span>{block.secondaryCtaLabel}</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
