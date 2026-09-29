import React from 'react'

import type { Page } from '@/payload-types'

import { HeroBlockComponent } from './HeroBlock'
import { BouquetsListBlockComponent } from './BouquetsListBlock'
import { WeddingCtaBlockComponent } from './WeddingCtaBlock'
import { ReviewsListBlockComponent } from './ReviewsListBlock'
import { RichTextBlockComponent } from './RichTextBlock'
import { ContactInfoBlockComponent } from './ContactInfoBlock'

interface RenderBlocksProps {
  blocks: NonNullable<Page['layout']>
}

export function RenderBlocks({ blocks }: RenderBlocksProps) {
  return (
    <div className="flex flex-col">
      {blocks.map((block) => {
        const key = block.id ?? `${block.blockType}-${blocks.indexOf(block)}`
        switch (block.blockType) {
          case 'hero':
            return <HeroBlockComponent key={key} block={block} />
          case 'bouquetsList':
            return <BouquetsListBlockComponent key={key} block={block} />
          case 'weddingCta':
            return <WeddingCtaBlockComponent key={key} block={block} />
          case 'reviewsList':
            return <ReviewsListBlockComponent key={key} block={block} />
          case 'richText':
            return <RichTextBlockComponent key={key} block={block} />
          case 'contactInfo':
            return <ContactInfoBlockComponent key={key} block={block} />
          default:
            return null
        }
      })}
    </div>
  )
}
