import type { Block } from 'payload'

export const WeddingCta: Block = {
  slug: 'weddingCta',
  interfaceName: 'WeddingCtaBlock',
  labels: {
    singular: 'Svadobná sekcia (CTA)',
    plural: 'Svadobné sekcie (CTA)',
  },
  fields: [
    {
      name: 'anchorId',
      type: 'text',
      label: 'ID sekcie (kotva)',
      admin: {
        description: 'Voliteľné HTML id sekcie (napr. svadby) pre odkazovanie.',
      },
    },
    {
      name: 'eyebrow',
      type: 'text',
      localized: true,
      label: 'Text v badge (eyebrow)',
    },
    {
      name: 'heading',
      type: 'text',
      localized: true,
      label: 'Nadpis',
    },
    {
      name: 'body',
      type: 'textarea',
      localized: true,
      label: 'Text',
    },
    {
      name: 'ctaLabel',
      type: 'text',
      localized: true,
      label: 'Text tlačidla',
    },
    {
      name: 'ctaHref',
      type: 'text',
      label: 'Odkaz tlačidla',
      admin: {
        description: 'Interná cesta (napr. /kontakt) alebo URL.',
      },
    },
  ],
}
