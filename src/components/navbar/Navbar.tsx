import React from 'react'
import Link from 'next/link'
import { Flower2 } from 'lucide-react'
import { Locale, getLocale } from '@/lib/locale'
import { LocaleSwitcher } from './LocaleSwitcher'

interface NavbarProps {
  initialLocale?: Locale
  instagramUrl?: string
  facebookUrl?: string
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

export async function Navbar({
  initialLocale,
  instagramUrl = 'https://instagram.com',
  facebookUrl = 'https://facebook.com',
}: NavbarProps) {
  const currentLocale = initialLocale ?? (await getLocale())

  const isSk = currentLocale === 'sk_eur'

  const navLinks = [
    { href: '#kytice', label: isSk ? 'Kytice' : 'Kytice' },
    { href: '#svadby', label: isSk ? 'Svadby' : 'Svatby' },
    { href: '#recenzie', label: isSk ? 'Recenzie' : 'Recenze' },
    { href: '#o-nas', label: isSk ? 'O farme' : 'O farmě' },
    { href: '#kontakt', label: isSk ? 'Kontakt' : 'Kontakt' },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/90 backdrop-blur-md transition-colors">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2.5 transition-transform hover:scale-[1.01]"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
            <Flower2 className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl font-bold tracking-tight text-foreground">
              zozahrady
            </span>
            <span className="text-[10px] font-medium tracking-widest uppercase text-muted-foreground -mt-1">
              kvetinová farma
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/85 hover:text-primary transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions: Socials + Locale Switcher */}
        <div className="flex items-center gap-3">
          {/* Social Links */}
          <div className="hidden sm:flex items-center gap-1.5 border-r border-border/70 pr-3">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram zozahrady"
              className="flex h-8 w-8 items-center justify-center rounded-full text-foreground/75 hover:bg-secondary hover:text-primary transition-colors"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook zozahrady"
              className="flex h-8 w-8 items-center justify-center rounded-full text-foreground/75 hover:bg-secondary hover:text-primary transition-colors"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
          </div>

          {/* Locale & Currency Switcher */}
          <LocaleSwitcher currentLocale={currentLocale} />

          {/* Admin Link */}
          <Link
            href="/admin"
            className="hidden lg:inline-flex text-xs font-semibold px-2.5 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            Admin
          </Link>
        </div>
      </div>
    </header>
  )
}
