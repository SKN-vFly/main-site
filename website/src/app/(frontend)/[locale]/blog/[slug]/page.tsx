import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft } from 'lucide-react'
import { Link } from '@/i18n/routing'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Blog } from '@/payload-types'
import { RichText } from '@/components/RichText'

async function getBlogPost(slug: string): Promise<Blog | null> {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'blog',
      where: {
        and: [
          {
            slug: {
              equals: slug,
            },
          },
          {
            status: {
              equals: 'published',
            },
          },
        ],
      },
      limit: 1,
      depth: 2,
    })
    return result.docs[0] || null
  } catch (error) {
    console.error('Failed to fetch blog post:', error)
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return {
      title: 'Blog Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const featuredImageUrl =
    typeof post.featured_image === 'object' && post.featured_image?.url
      ? post.featured_image.url
      : null

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Back Button */}
      <div className="mb-8">
        <Button variant="ghost" asChild className="p-0 h-auto">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
      </div>

      {/* Blog Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          {post.title}
        </h1>

        <p className="text-xl text-muted-foreground mb-4">{post.excerpt}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags && typeof post.tags === 'string' && post.tags.trim().length > 0 ? (
            post.tags.split(',').map((tag: string, index: number) => (
              <Badge key={index} variant="secondary">
                {tag.trim()}
              </Badge>
            ))
          ) : (
            <Badge variant="secondary">No Tags</Badge>
          )}
        </div>

        <div className="text-sm text-muted-foreground mb-4">
          {post.publishedDate && (
            <>Published on {new Date(post.publishedDate).toLocaleDateString()}</>
          )}
        </div>

        {featuredImageUrl && (
          <div className="mb-8">
            <Image
              src={featuredImageUrl}
              alt={post.title}
              width={800}
              height={400}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>

      {/* Blog Content */}
      <div className="mt-8">
        <RichText data={post.content} />
      </div>
    </div>
  )
}
