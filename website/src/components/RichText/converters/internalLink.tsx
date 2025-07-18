import { SerializedLinkNode } from '@payloadcms/richtext-lexical'

export const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!

  const slug =
    typeof value === 'object' &&
    value !== null &&
    'slug' in value &&
    typeof (value as { slug?: unknown }).slug === 'string'
      ? String((value as Record<string, unknown>)?.slug ?? '')
      : ''

  if (relationTo === 'blog') {
    return `/blog/${slug}`
  } else if (relationTo === 'projects') {
    return `/projects/${slug}`
  } else if (relationTo === 'users') {
    return `/users/${slug}`
  } else {
    return `/${slug}`
  }
}
