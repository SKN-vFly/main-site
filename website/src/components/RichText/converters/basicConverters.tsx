import React from 'react'
import { JSXConverters } from '@payloadcms/richtext-lexical/react'
import {
  SerializedParagraphNode,
  SerializedTextNode,
  SerializedListNode,
  SerializedListItemNode,
  SerializedQuoteNode,
} from '@payloadcms/richtext-lexical'

export const basicConverters: JSXConverters<
  | SerializedParagraphNode
  | SerializedTextNode
  | SerializedListNode
  | SerializedListItemNode
  | SerializedQuoteNode
> = {
  paragraph: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children })
    return React.createElement(
      'p',
      {
        className: 'mb-4 leading-relaxed break-words hyphens-auto overflow-wrap-anywhere',
      },
      children,
    )
  },

  text: ({ node }) => {
    let text: React.ReactNode = node.text

    if (node.format & 1) {
      // bold
      text = React.createElement('strong', { className: 'font-semibold' }, text)
    }
    if (node.format & 2) {
      // italic
      text = React.createElement('em', { className: 'italic' }, text)
    }
    if (node.format & 4) {
      // strikethrough
      text = React.createElement('s', { className: 'line-through' }, text)
    }
    if (node.format & 8) {
      // underline
      text = React.createElement('u', { className: 'underline' }, text)
    }
    if (node.format & 16) {
      // code
      text = React.createElement(
        'code',
        {
          className: 'bg-muted px-1.5 py-0.5 rounded text-sm font-mono',
        },
        text,
      )
    }

    return text
  },

  list: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children })
    const Tag = node.listType === 'number' ? 'ol' : 'ul'

    return React.createElement(
      Tag,
      {
        className: `mb-4 ${node.listType === 'number' ? 'list-decimal' : 'list-disc'} list-inside space-y-1 break-words overflow-wrap-anywhere`,
      },
      children,
    )
  },

  listitem: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children })
    return React.createElement(
      'li',
      {
        className: 'mb-1 break-words overflow-wrap-anywhere',
      },
      children,
    )
  },

  quote: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children })
    return React.createElement(
      'blockquote',
      {
        className:
          'border-l-4 border-primary pl-4 italic my-4 text-muted-foreground break-words hyphens-auto overflow-wrap-anywhere',
      },
      children,
    )
  },
}
