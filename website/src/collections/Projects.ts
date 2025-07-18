import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'project_title',
      type: 'text',
      required: true,
      label: 'Project Title',
    },
    {
      name: 'featured_image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Featured Image',
    },
    {
      name: 'project_description',
      type: 'textarea',
      required: true,
      label: 'Project Description',
    },
    {
      name: 'abstract',
      type: 'richText',
      editor: lexicalEditor({}),
      required: true,
      label: 'Abstract',
    },
    {
      name: 'tags',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      label: 'Tags (Comma-separated)',
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
      label: 'URL Slug',
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
      label: 'Published Date',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },
      label: 'Status',
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
