import React from 'react'
import { Inter, Playfair_Display } from 'next/font/google'
import { getLocale, LOCALES } from '@/lib/locale'
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

  return (
    <html lang={localeConfig.lang} className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased font-sans flex flex-col">
        <Navbar initialLocale={locale} />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  )
}
