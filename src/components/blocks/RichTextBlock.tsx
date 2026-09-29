import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Leaf } from 'lucide-react'

import type { RichTextBlock as RichTextBlockType } from '@/payload-types'

interface RichTextBlockProps {
  block: RichTextBlockType
}

export function RichTextBlockComponent({ block }: RichTextBlockProps) {
  return (
    <section
      id={block.anchorId ?? undefined}
      className="scroll-mt-16 w-full py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto space-y-6 text-center">
        {block.eyebrow && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold tracking-wide uppercase shadow-xs">
            <Leaf className="w-3.5 h-3.5 text-primary" />
            <span>{block.eyebrow}</span>
          </div>
        )}
        {block.heading && (
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            {block.heading}
          </h2>
        )}
        <RichText
          data={block.content}
          className="space-y-4 text-base text-muted-foreground leading-relaxed text-pretty [&_p]:m-0"
        />
      </div>
    </section>
  )
}
