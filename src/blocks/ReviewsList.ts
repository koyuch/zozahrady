import type { Block } from 'payload'

export const ReviewsList: Block = {
  slug: 'reviewsList',
  interfaceName: 'ReviewsListBlock',
  labels: {
    singular: 'Zoznam recenzií',
    plural: 'Zoznamy recenzií',
  },
  fields: [
    {
      name: 'anchorId',
      type: 'text',
      label: 'ID sekcie (kotva)',
      admin: {
        description: 'Voliteľné HTML id sekcie (napr. recenzie) pre odkazovanie.',
      },
    },
    {
      name: 'heading',
      type: 'text',
      localized: true,
      label: 'Nadpis',
    },
    {
      name: 'intro',
      type: 'textarea',
      localized: true,
      label: 'Úvodný text',
    },
  ],
}
