import type { Block } from 'payload'

export const RichText: Block = {
  slug: 'richText',
  interfaceName: 'RichTextBlock',
  labels: {
    singular: 'Textová sekcia',
    plural: 'Textové sekcie',
  },
  fields: [
    {
      name: 'anchorId',
      type: 'text',
      label: 'ID sekcie (kotva)',
      admin: {
        description: 'Voliteľné HTML id sekcie (napr. o-nas) pre odkazovanie.',
      },
    },
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
      label: 'Nadpis',
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
      required: true,
      label: 'Obsah',
    },
  ],
}
