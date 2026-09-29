import type { Block } from 'payload'

export const ContactInfo: Block = {
  slug: 'contactInfo',
  interfaceName: 'ContactInfoBlock',
  labels: {
    singular: 'Kontaktná sekcia',
    plural: 'Kontaktné sekcie',
  },
  fields: [
    {
      name: 'anchorId',
      type: 'text',
      label: 'ID sekcie (kotva)',
      admin: {
        description: 'Voliteľné HTML id sekcie (napr. kontakt) pre odkazovanie.',
      },
    },
    {
      name: 'heading',
      type: 'text',
      localized: true,
      label: 'Nadpis',
    },
    {
      name: 'subheading',
      type: 'textarea',
      localized: true,
      label: 'Podnadpis',
    },
  ],
}
