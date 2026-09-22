import React from 'react'
import { Flower2, Sparkles } from 'lucide-react'

import type { Bouquet } from '@/payload-types'

interface BouquetsSectionProps {
  bouquets: Bouquet[]
  isSk: boolean
  currencySymbol: string
}

const SIZE_LABELS: Record<string, { sk: string; cz: string }> = {
  Small: { sk: 'Malá', cz: 'Malá' },
  Medium: { sk: 'Stredná', cz: 'Střední' },
  Large: { sk: 'Veľká', cz: 'Velká' },
}

export function BouquetsSection({ bouquets, isSk, currencySymbol }: BouquetsSectionProps) {
  if (bouquets.length === 0) return null

  const priceKey = isSk ? 'priceEUR' : 'priceCZK'

  return (
    <section id="kytice" className="scroll-mt-16 w-full py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            {isSk ? 'Naše kytice' : 'Naše kytice'}
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-pretty">
            {isSk
              ? 'Sezónne viazané kytice z našej záhrady. Každá kytica je jedinečná a viazaná s láskou.'
              : 'Sezónní vázané kytice z naší zahrady. Každý kytice je jedinečný a vázaný s láskou.'}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bouquets.map((bouquet) => {
            const variants = [...bouquet.variants].sort((a, b) => a[priceKey] - b[priceKey])
            const startingPrice = variants[0]?.[priceKey]

            return (
              <article
                key={bouquet.id}
                className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-xs transition-all duration-200 hover:shadow-md hover:border-primary/30"
              >
                <div className="relative aspect-[4/3] bg-linear-to-br from-secondary/60 to-secondary/30 flex items-center justify-center overflow-hidden">
                  <Flower2 className="h-16 w-16 text-primary/30 group-hover:scale-110 group-hover:text-primary/50 transition-all duration-300" />
                  {!bouquet.isAvailable && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-semibold">
                      {isSk ? 'Vypredané' : 'Vyprodáno'}
                    </span>
                  )}
                </div>

                <div className="flex flex-col flex-1 p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif text-lg font-semibold text-foreground leading-tight">
                      {bouquet.title}
                    </h3>
                    {startingPrice != null && (
                      <span className="shrink-0 text-sm font-bold text-primary whitespace-nowrap">
                        {isSk ? 'od' : 'od'} {startingPrice} {currencySymbol}
                      </span>
                    )}
                  </div>

                  {bouquet.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {bouquet.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 pt-1 mt-auto">
                    {variants.map((variant) => (
                      <span
                        key={variant.id ?? variant.size}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium"
                      >
                        {SIZE_LABELS[variant.size]?.[isSk ? 'sk' : 'cz'] ?? variant.size}
                        <span className="text-primary font-semibold">
                          {variant[priceKey]} {currencySymbol}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <div className="text-center mt-10">
          <p className="inline-flex items-center gap-2 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" />
            {isSk
              ? 'Ceny sa môžu líšiť podľa sezóny a dostupnosti kvetov'
              : 'Ceny se mohou lišit podle sezóny a dostupnosti květin'}
          </p>
        </div>
      </div>
    </section>
  )
}
