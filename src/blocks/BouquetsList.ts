import type { Block } from 'payload'

export const BouquetsList: Block = {
  slug: 'bouquetsList',
  interfaceName: 'BouquetsListBlock',
  labels: {
    singular: 'Zoznam kytíc',
    plural: 'Zoznamy kytíc',
  },
  fields: [
    {
      name: 'anchorId',
      type: 'text',
      label: 'ID sekcie (kotva)',
      admin: {
        description: 'Voliteľné HTML id sekcie (napr. kytice) pre odkazovanie.',
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
