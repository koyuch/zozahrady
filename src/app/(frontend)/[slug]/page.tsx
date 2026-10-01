import React from 'react'
import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'

import { getLocale } from '@/lib/locale-server'
import { getPayloadClient } from '@/lib/payload'
import { getPublishedPage, toPayloadLocale } from '@/lib/pages'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'

// CMS pages render on demand: the build must never depend on the database
// (a pending migration must not break `next build`), and admin edits should
// go live without a redeploy.
export const dynamic = 'force-dynamic'

interface SlugPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: SlugPageProps): Promise<Metadata> {
  const { slug } = await params
  if (slug === 'home') return {}

  const locale = await getLocale()
  const payload = await getPayloadClient()
  const page = await getPublishedPage(payload, slug, toPayloadLocale(locale))
  if (!page) return {}

  return {
    title: page.seoTitle ?? page.title,
    description: page.seoDescription ?? undefined,
    alternates: {
      canonical: `/${slug}`,
    },
  }
}

export default async function SlugPage({ params }: SlugPageProps) {
  const { slug } = await params

  // The homepage lives at `/`; /home must never render duplicate content.
  if (slug === 'home') {
    permanentRedirect('/')
  }

  const locale = await getLocale()
  const payload = await getPayloadClient()
  const page = await getPublishedPage(payload, slug, toPayloadLocale(locale))

  if (!page) {
    notFound()
  }

  return <RenderBlocks blocks={page.layout ?? []} />
}
