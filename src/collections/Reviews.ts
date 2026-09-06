import type { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'customerName',
    defaultColumns: ['customerName', 'rating', 'status', 'createdAt'],
  },
  access: {
    // Authenticated users can view all; public visitors can only read Approved reviews
    read: ({ req: { user } }) => {
      if (user) return true
      return {
        status: {
          equals: 'Approved',
        },
      }
    },
    // Public can submit a review (defaults to Pending)
    create: () => true,
  },
  fields: [
    {
      name: 'customerName',
      type: 'text',
      required: true,
      label: 'Meno zákazníka',
    },
    {
      name: 'rating',
      type: 'select',
      required: true,
      defaultValue: '5',
      label: 'Hodnotenie (1-5 hviezdičiek)',
      options: [
        { label: '★☆☆☆☆ (1)', value: '1' },
        { label: '★★☆☆☆ (2)', value: '2' },
        { label: '★★★☆☆ (3)', value: '3' },
        { label: '★★★★☆ (4)', value: '4' },
        { label: '★★★★★ (5)', value: '5' },
      ],
    },
    {
      name: 'comment',
      type: 'textarea',
      required: true,
      label: 'Text recenzie',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'Pending',
      label: 'Stav recenzie',
      options: [
        { label: 'Čaká na schválenie (Pending)', value: 'Pending' },
        { label: 'Schválená (Approved)', value: 'Approved' },
        { label: 'Zamietnutá (Rejected)', value: 'Rejected' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
