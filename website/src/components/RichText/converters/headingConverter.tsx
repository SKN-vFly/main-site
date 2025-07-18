import React from 'react'
import { JSXConverters } from '@payloadcms/richtext-lexical/react'
import { SerializedHeadingNode } from '@payloadcms/richtext-lexical'

export const headingConverter: JSXConverters<SerializedHeadingNode> = {
  heading: ({ node, nodesToJSX }) => {
    const text = nodesToJSX({ nodes: node.children })

    if (node.tag === 'h2') {
      const textStr = text
        .map((t) => (typeof t === 'string' ? t : ''))
        .join('')
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')

      return React.createElement(
        'h2',
        {
          id: textStr,
          className: 'text-2xl font-bold mb-4 mt-6 break-words hyphens-auto',
        },
        text,
      )
    } else if (node.tag === 'h3') {
      return React.createElement(
        'h3',
        {
          className: 'text-xl font-semibold mb-3 mt-5 break-words hyphens-auto',
        },
        text,
      )
    } else if (node.tag === 'h4') {
      return React.createElement(
        'h4',
        {
          className: 'text-lg font-medium mb-2 mt-4 break-words hyphens-auto',
        },
        text,
      )
    } else {
      return React.createElement(
        node.tag,
        {
          className:
            node.tag === 'h1'
              ? 'text-3xl font-bold mb-6 mt-8 break-words hyphens-auto'
              : 'break-words hyphens-auto',
        },
        text,
      )
    }
  },
}
