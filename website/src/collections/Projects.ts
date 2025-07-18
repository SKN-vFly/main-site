import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: {
      en: 'Project',
      pl: 'Projekt',
    },
    plural: {
      en: 'Projects',
      pl: 'Projekty',
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'project_title',
      type: 'text',
      required: true,
      label: {
        en: 'Project Title',
        pl: 'Tytuł Projektu',
      },
    },
    {
      name: 'featured_image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: {
        en: 'Featured Image',
        pl: 'Zdjęcie Główne',
      },
    },
    {
      name: 'project_description',
      type: 'textarea',
      required: true,
      label: {
        en: 'Project Description',
        pl: 'Opis Projektu',
      },
    },
    {
      name: 'abstract',
      type: 'richText',
      editor: lexicalEditor({}),
      required: true,
      label: {
        en: 'Abstract',
        pl: 'Abstrakt',
      },
    },
    {
      name: 'tags',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      label: {
        en: 'Tags (Comma-separated)',
        pl: 'Tagi (oddzielone przecinkami)',
      },
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ data }) => {
            // If slug is provided and not empty, clean and use it
            if (data?.slug && data.slug.trim() !== '') {
              return data.slug
                .toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, '')
            }

            // If no slug provided, auto-generate from project_title
            if (data?.project_title) {
              return data.project_title
                .toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, '')
            }

            return ''
          },
        ],
      },
      label: {
        en: 'URL Slug',
        pl: 'Identyfikator URL',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      defaultValue: () => new Date(),
      label: {
        en: 'Published Date',
        pl: 'Data Publikacji',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: {
            en: 'Draft',
            pl: 'Szkic',
          },
          value: 'draft',
        },
        {
          label: {
            en: 'Published',
            pl: 'Opublikowano',
          },
          value: 'published',
        },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },
      label: {
        en: 'Status',
        pl: 'Status',
      },
    },
  ],
  admin: {
    useAsTitle: 'project_title',
    defaultColumns: ['project_title', 'status', 'publishedDate'],
    preview: (data) => {
      if (data?.slug) {
        return `${process.env.PAYLOAD_PUBLIC_SITE_URL || 'http://localhost:3000'}/projects/${data.slug}`
      }
      return null
    },
  },
  versions: {
    drafts: true,
  },
}
