import React from 'react'
import type { Metadata } from 'next'

import { getLocale } from '@/lib/locale-server'
import { getPayloadClient } from '@/lib/payload'
import { getPublishedPage, toPayloadLocale } from '@/lib/pages'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'

async function getHomePage() {
  const locale = await getLocale()
  const payload = await getPayloadClient()
  const page = await getPublishedPage(payload, 'home', toPayloadLocale(locale))
  return { page, locale }
}

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getHomePage()
  if (!page) return {}
  return {
    title: page.seoTitle ?? page.title,
    description: page.seoDescription ?? undefined,
  }
}

export default async function HomePage() {
  const { page, locale } = await getHomePage()

  // Graceful fallback when no published `home` page exists yet (e.g. fresh DB before seeding).
  if (!page) {
    const isSk = locale === 'sk_eur'
    return (
      <div className="flex flex-col">
        <section className="w-full py-20 md:py-32 px-4 sm:px-6 lg:px-8 text-center bg-linear-to-b from-secondary/40 via-background to-background">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground text-balance">
              zozahrady
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground text-pretty leading-relaxed">
              {isSk
                ? 'Kvetinová farma — obsah sa práve pripravuje.'
                : 'Květinová farma — obsah se právě připravuje.'}
            </p>
          </div>
        </section>
      </div>
    )
  }

  return <RenderBlocks blocks={page.layout ?? []} />
}
