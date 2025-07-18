import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: {
      en: 'Media',
      pl: 'Media',
    },
    plural: {
      en: 'Media',
      pl: 'Media',
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: {
        en: 'Alt Text',
        pl: 'Tekst Alternatywny',
      },
    },
  ],
  upload: true,
}
