import type { CollectionConfig } from 'payload'

export const Bouquets: CollectionConfig = {
  slug: 'bouquets',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'isAvailable', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Názov kytice',
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: 'Popis kytice',
    },
    {
      name: 'images',
      type: 'array',
      label: 'Galéria obrázkov',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Fotografia',
        },
      ],
    },
    {
      name: 'isAvailable',
      type: 'checkbox',
      defaultValue: true,
      label: 'Dostupná na predaj',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'variants',
      type: 'array',
      required: true,
      label: 'Veľkostné varianty a ceny',
      fields: [
        {
          name: 'size',
          type: 'select',
          required: true,
          label: 'Veľkosť',
          options: [
            { label: 'Malá (Small)', value: 'Small' },
            { label: 'Stredná (Medium)', value: 'Medium' },
            { label: 'Veľká (Large)', value: 'Large' },
          ],
        },
        {
          name: 'priceEUR',
          type: 'number',
          required: true,
          min: 0,
          label: 'Cena EUR (€)',
        },
        {
          name: 'priceCZK',
          type: 'number',
          required: true,
          min: 0,
          label: 'Cena CZK (Kč)',
        },
      ],
    },
  ],
}
