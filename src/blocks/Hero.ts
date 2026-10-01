import type { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: {
    singular: 'Úvodná sekcia (Hero)',
    plural: 'Úvodné sekcie (Hero)',
  },
  fields: [
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
      required: true,
      label: 'Nadpis',
    },
    {
      name: 'subheading',
      type: 'textarea',
      localized: true,
      label: 'Podnadpis',
    },
    {
      name: 'primaryCtaLabel',
      type: 'text',
      localized: true,
      label: 'Text hlavného tlačidla',
    },
    {
      name: 'primaryCtaHref',
      type: 'text',
      label: 'Odkaz hlavného tlačidla',
      admin: {
        description: 'Interná cesta (napr. /kytice) alebo URL.',
      },
    },
    {
      name: 'secondaryCtaLabel',
      type: 'text',
      localized: true,
      label: 'Text sekundárneho tlačidla',
    },
    {
      name: 'secondaryCtaHref',
      type: 'text',
      label: 'Odkaz sekundárneho tlačidla',
      admin: {
        description: 'Interná cesta (napr. /svadby) alebo URL.',
      },
    },
  ],
}
