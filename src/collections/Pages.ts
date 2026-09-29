import type { CollectionConfig } from 'payload'

import { Hero } from '../blocks/Hero'
import { RichText } from '../blocks/RichText'
import { BouquetsList } from '../blocks/BouquetsList'
import { ReviewsList } from '../blocks/ReviewsList'
import { WeddingCta } from '../blocks/WeddingCta'
import { ContactInfo } from '../blocks/ContactInfo'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
  },
  versions: {
    drafts: true,
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
      label: 'Názov stránky',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'Slug (URL)',
      admin: {
        position: 'sidebar',
        description: 'URL adresa stránky, napr. /kontakt. Rovnaké pre obe jazyky.',
      },
    },
    {
      name: 'menuLabel',
      type: 'text',
      localized: true,
      label: 'Názov v menu',
      admin: {
        position: 'sidebar',
        description: 'Kratší názov v navigácii. Ak je prázdne, použije sa názov stránky.',
      },
    },
    {
      name: 'showInMenu',
      type: 'checkbox',
      defaultValue: true,
      label: 'Zobraziť v menu',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'menuOrder',
      type: 'number',
      defaultValue: 0,
      label: 'Poradie v menu',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Hlavný obrázok (Hero)',
    },
    {
      name: 'seoTitle',
      type: 'text',
      localized: true,
      label: 'SEO titulok',
      admin: {
        description: 'Titulok prehliadača a vyhľadávačov. Ak je prázdne, použije sa názov stránky.',
      },
    },
    {
      name: 'seoDescription',
      type: 'textarea',
      localized: true,
      label: 'SEO popis',
      admin: {
        description: 'Krátky popis stránky pre vyhľadávače (meta description).',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      label: 'Sekcie stránky',
      blocks: [Hero, BouquetsList, WeddingCta, ReviewsList, RichText, ContactInfo],
    },
  ],
}
