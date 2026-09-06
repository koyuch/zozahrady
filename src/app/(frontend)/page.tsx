import React from 'react'
import Link from 'next/link'
import { Flower2, Heart, Sparkles, ArrowRight } from 'lucide-react'
import { getLocale, LOCALES } from '@/lib/locale'

export default async function HomePage() {
  const locale = await getLocale()
  const localeConfig = LOCALES[locale]
  const isSk = locale === 'sk_eur'

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 px-4 sm:px-6 lg:px-8 text-center bg-linear-to-b from-secondary/40 via-background to-background">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold tracking-wide uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>{isSk ? 'Ekologická kvetinová farma' : 'Ekologická květinová farma'}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground text-balance">
            {isSk ? (
              <>
                Kytice s láskou viazané, <br />
                <span className="text-primary italic">priamo z našej záhrady</span>
              </>
            ) : (
              <>
                Kytice s láskou vázané, <br />
                <span className="text-primary italic">přímo z naší zahrady</span>
              </>
            )}
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground text-pretty leading-relaxed">
            {isSk
              ? 'Pestujeme sezónne slovenské kvety s rešpektom k prírode. Prinášame čerstvú radosť do vašich domovov a nezabudnuteľnú atmosféru na svadobné stoly.'
              : 'Pěstujeme sezónní květiny s respektem k přírodě. Přinášíme čerstvou radost do vašich domovů a nezapomenutelnou atmosféru na svatební stoly.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="#kytice"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-md hover:opacity-95 hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              <Flower2 className="w-4 h-4" />
              <span>{isSk ? 'Prezrieť kytice' : 'Prohlédnout kytice'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="#svadby"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-card hover:bg-secondary text-foreground font-semibold text-sm transition-all duration-200 shadow-xs cursor-pointer"
            >
              <Heart className="w-4 h-4 text-primary" />
              <span>{isSk ? 'Svadobný dopyt' : 'Svatební poptávka'}</span>
            </Link>
          </div>

          <div className="pt-8 text-xs text-muted-foreground">
            <span>
              {isSk ? 'Zobrazované meny:' : 'Zobrazované měny:'}{' '}
              <strong className="text-foreground">
                {localeConfig.flag} {localeConfig.label} ({localeConfig.currencySymbol})
              </strong>
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}
