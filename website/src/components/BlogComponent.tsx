'use client'
import { useEffect, useState, useContext } from 'react'
import { Link } from '@/i18n/routing'
import { BlogClickedContext } from './BlogDisplayWrapper'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Blog } from '@/payload-types'
import Image from 'next/image'

export function BlogComponent(props: { post: Blog; readMore: string }) {
  const [hover, setHover] = useState(false)
  const [open, setOpen] = useState(false)
  const { post, readMore } = props
  const { allowInteraction, setAllowInteraction } = useContext(BlogClickedContext)

  useEffect(() => {
    setAllowInteraction(!open)
  }, [open, setAllowInteraction])

  const handleOpenChange = (isOpen: boolean) => {
    if (allowInteraction || !isOpen) {
      setOpen(isOpen)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Card
          className={`cursor-pointer transition-all duration-300 p-0 hover:shadow-lg ${
            hover ? 'scale-105' : ''
          } ${!allowInteraction ? 'opacity-50 cursor-not-allowed' : ''}`}
          onMouseEnter={() => allowInteraction && setHover(true)}
          onMouseLeave={() => allowInteraction && setHover(false)}
        >
          <CardContent className="p-0">
            <div className="relative aspect-square">
              {post.featured_image ? (
                <Image
                  src={
                    typeof post.featured_image === 'object' && post.featured_image.url
                      ? post.featured_image.url
                      : ''
                  }
                  alt={post.title}
                  className="w-full h-full object-cover rounded-t-lg"
                  width={500}
                  height={500}
                />
              ) : (
                <Skeleton className="w-full h-full rounded-t-lg" />
              )}
            </div>
            <div className="p-4 space-y-3">
              <CardTitle className="text-center">{post.title}</CardTitle>
              {post.tags && typeof post.tags === 'string' && post.tags.trim().length > 0 && (
                <div className="flex flex-wrap gap-1 justify-center">
                  {post.tags
                    .split(',')
                    .slice(0, 3)
                    .map((tag: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag.trim()}
                      </Badge>
                    ))}
                  {post.tags.split(',').length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{post.tags.split(',').length - 3}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{post.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {post.tags && typeof post.tags === 'string' && post.tags.trim().length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.split(',').map((tag: string, index: number) => (
                <Badge key={index} variant="secondary">
                  {tag.trim()}
                </Badge>
              ))}
            </div>
          )}
          <div className="relative aspect-video">
            {post.featured_image ? (
              <Image
                src={
                  typeof post.featured_image === 'object' && post.featured_image.url
                    ? post.featured_image.url
                    : ''
                }
                alt={post.title}
                className="w-full h-full object-cover rounded-lg shadow-lg"
                width={500}
                height={300}
              />
            ) : (
              <Skeleton className="w-full h-full rounded-lg" />
            )}
          </div>
          <DialogDescription className="text-base">{post.excerpt}</DialogDescription>
          <div className="flex justify-end">
            <Button asChild>
              <Link href={`/blog/${post.slug}`}>{readMore}</Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
