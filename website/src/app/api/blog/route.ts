import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const search = searchParams.get('search') || ''

    const payload = await getPayload({ config })

    const whereClause: any = {
      status: {
        equals: 'published',
      },
    }

    // Add search functionality
    if (search.trim()) {
      whereClause.or = [
        {
          title: {
            contains: search,
          },
        },
        {
          excerpt: {
            contains: search,
          },
        },
        {
          tags: {
            contains: search,
          },
        },
      ]
    }

    const result = await payload.find({
      collection: 'blog',
      where: whereClause,
      sort: '-publishedDate',
      depth: 2,
      limit,
      page,
    })

    return NextResponse.json({
      docs: result.docs,
      totalDocs: result.totalDocs,
      page: result.page,
      totalPages: result.totalPages,
      hasNextPage: result.hasNextPage,
      hasPrevPage: result.hasPrevPage,
    })
  } catch (error) {
    console.error('Failed to fetch blog posts:', error)
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 })
  }
}
