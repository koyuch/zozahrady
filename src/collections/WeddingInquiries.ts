import type { CollectionConfig } from 'payload'

export const WeddingInquiries: CollectionConfig = {
  slug: 'wedding-inquiries',
  admin: {
    useAsTitle: 'customerName',
    defaultColumns: ['customerName', 'weddingDate', 'status', 'createdAt'],
  },
  access: {
    // Only authenticated admins can read inquiries
    read: ({ req: { user } }) => Boolean(user),
    // Public can submit new inquiries
    create: () => true,
  },
  fields: [
    {
      name: 'customerName',
      type: 'text',
      required: true,
      label: 'Meno a priezvisko',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'E-mailová adresa',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Telefónne číslo',
    },
    {
      name: 'weddingDate',
      type: 'date',
      label: 'Plánovaný dátum svadby',
    },
    {
      name: 'venue',
      type: 'text',
      label: 'Miesto svadby / Lokalita',
    },
    {
      name: 'budget',
      type: 'text',
      label: 'Orientačný rozpočet',
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Predstavy o výzdobe a poznámky',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'New',
      label: 'Stav dopytu',
      options: [
        { label: 'Nová (New)', value: 'New' },
        { label: 'Kontaktovaný (Contacted)', value: 'Contacted' },
        { label: 'Uzatvorená (Closed)', value: 'Closed' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
