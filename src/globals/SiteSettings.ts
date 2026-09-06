import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Nastavenia',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'contactEmail',
      type: 'email',
      label: 'Kontaktný e-mail',
      defaultValue: 'ahoj@zozahrady.sk',
    },
    {
      name: 'contactPhone',
      type: 'text',
      label: 'Kontaktný telefón',
      defaultValue: '+421 900 000 000',
    },
    {
      name: 'instagramUrl',
      type: 'text',
      label: 'Instagram profil URL',
      defaultValue: 'https://instagram.com/zozahrady',
    },
    {
      name: 'facebookUrl',
      type: 'text',
      label: 'Facebook profil URL',
      defaultValue: 'https://facebook.com/zozahrady',
    },
    {
      name: 'showVykvetBadge',
      type: 'checkbox',
      label: 'Zobraziť odznak Výkvet',
      defaultValue: true,
    },
    {
      name: 'showBeskydyBadge',
      type: 'checkbox',
      label: 'Zobraziť odznak Beskydy originálny produkt',
      defaultValue: true,
    },
  ],
}
