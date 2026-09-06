import type { CollectionConfig } from 'payload'

export const SiteAlerts: CollectionConfig = {
  slug: 'site-alerts',
  admin: {
    useAsTitle: 'message',
    defaultColumns: ['message', 'type', 'isActive', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'message',
      type: 'text',
      required: true,
      label: 'Správa bannera',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Aktívny banner',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'info',
      label: 'Typ hlásenia',
      options: [
        { label: 'Informácia (Info)', value: 'info' },
        { label: 'Upozornenie (Warning)', value: 'warning' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
