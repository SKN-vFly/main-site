import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'

export const Blog: CollectionConfig = {
  slug: 'blog',
  labels: {
    singular: {
      en: 'Blog Post',
      pl: 'Wpis na Blogu',
    },
    plural: {
      en: 'Blog Posts',
      pl: 'Wpisy na Blogu',
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: {
        en: 'Blog Title',
        pl: 'Tytuł Wpisu',
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
      name: 'excerpt',
      type: 'textarea',
      required: true,
      label: {
        en: 'Blog Excerpt',
        pl: 'Wstęp Wpisu',
      },
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({}),
      required: true,
      label: {
        en: 'Content',
        pl: 'Treść',
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

            // If no slug provided, auto-generate from title
            if (data?.title) {
              return data.title
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
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'publishedDate'],
    preview: (data) => {
      if (data?.slug) {
        return `${process.env.PAYLOAD_PUBLIC_SITE_URL || 'http://localhost:3000'}/blog/${data.slug}`
      }
      return null
    },
  },
  versions: {
    drafts: true,
  },
}
