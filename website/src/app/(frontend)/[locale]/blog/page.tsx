import { getTranslations } from 'next-intl/server'
import { SearchableBlog } from '@/components/SearchableBlog'
import { getPayload } from 'payload'
import config from '@/payload.config'

async function getBlogPosts() {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'blog',
      where: {
        status: {
          equals: 'published',
        },
      },
      sort: '-publishedDate',
      depth: 2,
    })
    return result.docs
  } catch (error) {
    console.error('Failed to fetch blog posts:', error)
    return []
  }
}

export default async function BlogPage() {
  const t = await getTranslations('BlogPage')
  const posts = await getBlogPosts()

  return (
    <div className="container mx-auto px-4 py-12 space-y-16">
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          {t('title')}
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {t('description')}
        </p>
      </div>

      <SearchableBlog
        posts={posts}
        readMore={t('readMore')}
        searchPlaceholder={t('searchPlaceholder')}
        notFoundText={t('notfound')}
        clickToExplore={t('clickToExplore')}
      />
    </div>
  )
}
