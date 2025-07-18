import React from 'react'
import { DefaultNodeTypes } from '@payloadcms/richtext-lexical'
import { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import { headingConverter } from './headingConverter'
import { basicConverters } from './basicConverters'
import { internalDocToHref } from './internalLink'

type NodeTypes = DefaultNodeTypes

export const jsxConverter: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...headingConverter,
  ...basicConverters,
  link: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children })

    if (node.fields.linkType === 'internal' && node.fields.doc) {
      const href = internalDocToHref({ linkNode: node })
      return React.createElement(
        'a',
        {
          href,
          className:
            'text-primary hover:text-primary/80 underline break-all overflow-wrap-anywhere',
        },
        children,
      )
    }

    if (node.fields.linkType === 'custom' && node.fields.url) {
      return React.createElement(
        'a',
        {
          href: node.fields.url,
          target: node.fields.newTab ? '_blank' : undefined,
          rel: node.fields.newTab ? 'noopener noreferrer' : undefined,
          className:
            'text-primary hover:text-primary/80 underline break-all overflow-wrap-anywhere',
        },
        children,
      )
    }

    return React.createElement('span', {}, children)
  },
})
