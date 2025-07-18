import React from 'react'
import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { jsxConverter } from '@/components/RichText/converters'
import { cn } from '@/lib/utils'

type Props = {
  data: SerializedEditorState
} & React.HTMLAttributes<HTMLDivElement>

export function RichText(props: Props) {
  const { className, data, ...rest } = props

  return (
    <div
      className={cn(
        'rich-text text-foreground',
        // Word wrap and text breaking - comprehensive text wrapping
        'break-words hyphens-auto overflow-wrap-anywhere word-break-break-word',
        // Prevent horizontal overflow
        'overflow-hidden max-w-full',
        // Typography base styles
        'text-base leading-relaxed',
        // Spacing for common elements with word wrapping
        '[&>p]:mb-4 [&>p]:leading-relaxed [&>p]:break-words [&>p]:hyphens-auto [&>p]:overflow-wrap-anywhere',
        '[&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mb-6 [&>h1]:mt-8 [&>h1]:break-words [&>h1]:hyphens-auto',
        '[&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mb-4 [&>h2]:mt-6 [&>h2]:break-words [&>h2]:hyphens-auto',
        '[&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mb-3 [&>h3]:mt-5 [&>h3]:break-words [&>h3]:hyphens-auto',
        '[&>h4]:text-lg [&>h4]:font-medium [&>h4]:mb-2 [&>h4]:mt-4 [&>h4]:break-words [&>h4]:hyphens-auto',
        '[&>h5]:text-base [&>h5]:font-medium [&>h5]:mb-2 [&>h5]:mt-3 [&>h5]:break-words [&>h5]:hyphens-auto',
        '[&>h6]:text-sm [&>h6]:font-medium [&>h6]:mb-2 [&>h6]:mt-3 [&>h6]:break-words [&>h6]:hyphens-auto',
        // List styles with word wrapping
        '[&>ul]:mb-4 [&>ul]:list-disc [&>ul]:list-inside [&>ul]:space-y-1 [&>ul]:break-words [&>ul]:overflow-wrap-anywhere',
        '[&>ol]:mb-4 [&>ol]:list-decimal [&>ol]:list-inside [&>ol]:space-y-1 [&>ol]:break-words [&>ol]:overflow-wrap-anywhere',
        '[&>li]:mb-1 [&>li]:break-words [&>li]:overflow-wrap-anywhere',
        // Link styles with word wrapping - handle long URLs
        '[&_a]:text-primary [&_a]:hover:text-primary/80 [&_a]:underline [&_a]:break-all [&_a]:overflow-wrap-anywhere',
        // Text formatting with word wrapping
        '[&_strong]:font-semibold [&_strong]:break-words',
        '[&_em]:italic [&_em]:break-words',
        '[&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono [&_code]:break-all [&_code]:whitespace-pre-wrap [&_code]:overflow-x-auto [&_code]:max-w-full',
        // Quote styles with word wrapping
        '[&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:my-4 [&>blockquote]:text-muted-foreground [&>blockquote]:break-words [&>blockquote]:hyphens-auto',
        className,
      )}
      {...rest}
    >
      <RichTextConverter data={data} converters={jsxConverter} />
    </div>
  )
}
