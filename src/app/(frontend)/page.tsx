import React from 'react'
import Link from 'next/link'
import { Flower2, Heart, Sparkles, ArrowRight, Leaf, Mail } from 'lucide-react'

import { LOCALES } from '@/lib/locale'
import { getLocale } from '@/lib/locale-server'
import { getPayloadClient } from '@/lib/payload'
import { BouquetsSection } from '@/components/sections/BouquetsSection'
import { ReviewsSection } from '@/components/sections/ReviewsSection'
import { ContactSection } from '@/components/sections/ContactSection'

export default async function HomePage() {
  const locale = await getLocale()
  const localeConfig = LOCALES[locale]
  const isSk = locale === 'sk_eur'

  const payload = await getPayloadClient()

  const [bouquetsRes, reviewsRes, siteSettings] = await Promise.all([
    payload.find({ collection: 'bouquets', limit: 100, depth: 1, sort: '-createdAt' }),
    payload.find({ collection: 'reviews', limit: 100, sort: '-createdAt' }),
    payload.findGlobal({ slug: 'site-settings' }),
  ])

  return (
    <div className="flex flex-col">
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

      {/* Bouquets */}
      <BouquetsSection
        bouquets={bouquetsRes.docs}
        isSk={isSk}
        currencySymbol={localeConfig.currencySymbol}
      />

      {/* Weddings */}
      <section
        id="svadby"
        className="scroll-mt-16 w-full py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-primary/5 to-background"
      >
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold tracking-wide uppercase shadow-xs">
            <Heart className="w-3.5 h-3.5 text-primary" />
            <span>{isSk ? 'Svadobné kytice' : 'Svatební kytice'}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            {isSk ? 'Svadby' : 'Svatby'}
          </h2>
          <p className="max-w-2xl mx-auto text-base text-muted-foreground text-pretty leading-relaxed">
            {isSk
              ? 'Vytvoríme pre vás svadobné kytice a výzdobu presne podľa vašich predstáv. Od nevestinej kytice cez kancelárske kytice pre družičky až po výzdobu svadobného stola — staráme sa o každý detail s láskou a citom pre krásu.'
              : 'Vytvoříme pro vás svatební kytice a výzdobu přesně podle vašich představ. Od nevěstina kytice přes kancelářské kytice pro družičky až po výzdobu svatebního stolu — staráme se o každý detail s láskou a citem pro krásu.'}
          </p>
          <Link
            href="#kontakt"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-md hover:opacity-95 hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            <span>{isSk ? 'Poslať dopyt' : 'Poslat poptávku'}</span>
          </Link>
        </div>
      </section>

      {/* Reviews */}
      <ReviewsSection reviews={reviewsRes.docs} isSk={isSk} />

      {/* About */}
      <section id="o-nas" className="scroll-mt-16 w-full py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold tracking-wide uppercase shadow-xs">
            <Leaf className="w-3.5 h-3.5 text-primary" />
            <span>{isSk ? 'O nás' : 'O nás'}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            {isSk ? 'O farme' : 'O farmě'}
          </h2>
          <div className="space-y-4 text-base text-muted-foreground leading-relaxed text-pretty">
            <p>
              {isSk
                ? 'zozahrady je rodinná kvetinová farma, ktorá pestuje sezónne kvety s rešpektom k prírode. Veríme, že krásne kvety rastú tam, kde im doprajeme čas a lásku.'
                : 'zozahrady je rodinná květinová farma, která pěstuje sezónní květiny s respektem k přírodě. Věříme, že krásné květiny rostou tam, kde jim dopřejeme čas a lásku.'}
            </p>
            <p>
              {isSk
                ? 'Naše kytice viažeme ručne z čerstvo nazbieraných kvetov, bez zbytočných plastov a s dôrazom na udržateľnosť. Každá kytica je jedinečná — ako príroda samotná.'
                : 'Naše kytice vážeme ručně z čerstvo nasbíraných květů, bez zbytečných plastů a s důrazem na udržitelnost. Každý kytice je jedinečný — jako příroda samotná.'}
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <ContactSection settings={siteSettings} isSk={isSk} />
    </div>
  )
}
