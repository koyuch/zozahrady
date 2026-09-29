import React from 'react'
import { Inter, Playfair_Display } from 'next/font/google'
import { LOCALES } from '@/lib/locale'
import { getLocale } from '@/lib/locale-server'
import { getPayloadClient } from '@/lib/payload'
import { getMenuPages, toPayloadLocale } from '@/lib/pages'
import { Navbar } from '@/components/navbar/Navbar'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata = {
  title: 'zozahrady | Kvetinová farma',
  description:
    'Sezónne ekologicky pestované kytice a svadobná kvetinová výzdoba priamo z našej záhrady.',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const locale = await getLocale()
  const localeConfig = LOCALES[locale]

  const payload = await getPayloadClient()
  const payloadLocale = toPayloadLocale(locale)
  const [siteSettings, menuPages] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings' }),
    getMenuPages(payload, payloadLocale),
  ])

  const links = menuPages
    .filter((page) => page.slug !== 'home')
    .map((page) => ({ href: `/${page.slug}`, label: page.menuLabel ?? page.title }))

  return (
    <html lang={localeConfig.lang} className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased font-sans flex flex-col">
        <Navbar
          initialLocale={locale}
          links={links}
          instagramUrl={siteSettings?.instagramUrl ?? undefined}
          facebookUrl={siteSettings?.facebookUrl ?? undefined}
        />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  )
}
