import React from 'react'
import { Mail, Phone } from 'lucide-react'

import type { SiteSetting } from '@/payload-types'

interface ContactSectionProps {
  settings: SiteSetting | null
  isSk: boolean
  anchorId?: string
  heading?: string
  subheading?: string
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

function socialHandle(url: string | undefined): string | null {
  if (!url) return null
  try {
    const path = new URL(url).pathname.split('/').filter(Boolean)
    const handle = path[0]?.replace(/^@/, '')
    return handle || null
  } catch {
    return null
  }
}

export function ContactSection({
  settings,
  isSk,
  anchorId = 'kontakt',
  heading,
  subheading,
}: ContactSectionProps) {
  const email = settings?.contactEmail ?? 'ahoj@zozahrady.sk'
  const phone = settings?.contactPhone ?? '+421 900 000 000'
  const instagram = settings?.instagramUrl ?? 'https://instagram.com/zozahrady'
  const facebook = settings?.facebookUrl ?? 'https://facebook.com/zozahrady'
  const instagramHandle = socialHandle(instagram)
  const facebookHandle = socialHandle(facebook)

  return (
    <section id={anchorId} className="scroll-mt-16 w-full py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            {heading ?? 'Kontakt'}
          </h2>
          <p className="text-muted-foreground text-pretty">
            {subheading ??
              (isSk
                ? 'Máte otázku alebo chcete objednať? Ozvite sa nám.'
                : 'Máte otázku nebo chcete objednat? Ozvěte se nám.')}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-xs hover:border-primary/30 hover:shadow-md transition-all duration-200"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {isSk ? 'E-mail' : 'E-mail'}
              </p>
              <p className="text-sm font-semibold text-foreground">{email}</p>
            </div>
          </a>

          <a
            href={`tel:${phone.replace(/\s/g, '')}`}
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-xs hover:border-primary/30 hover:shadow-md transition-all duration-200"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {isSk ? 'Telefón' : 'Telefon'}
              </p>
              <p className="text-sm font-semibold text-foreground">{phone}</p>
            </div>
          </a>

          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-xs hover:border-primary/30 hover:shadow-md transition-all duration-200"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
              <InstagramIcon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Instagram</p>
              <p className="text-sm font-semibold text-foreground">{instagramHandle}</p>
            </div>
          </a>

          <a
            href={facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-xs hover:border-primary/30 hover:shadow-md transition-all duration-200"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
              <FacebookIcon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Facebook</p>
              <p className="text-sm font-semibold text-foreground">{facebookHandle}</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
