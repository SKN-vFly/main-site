'use client'
import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { BlogDisplay } from '@/components/BlogDisplayWrapper'
import { Blog } from '@/payload-types'

interface SearchableBlogProps {
  posts: Blog[]
  readMore: string
  searchPlaceholder: string
  notFoundText: string
  clickToExplore: string
}

export function SearchableBlog({
  posts: initialPosts,
  readMore,
  searchPlaceholder,
  notFoundText,
  clickToExplore,
}: SearchableBlogProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [posts, setPosts] = useState<Blog[]>(initialPosts)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadingRef = useRef<HTMLDivElement | null>(null)

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) {
      return posts
    }

    const query = searchQuery.toLowerCase()

    return posts.filter((post) => {
      // Search in blog title
      const titleMatch = post.title.toLowerCase().includes(query)

      // Search in tags (if they exist)
      const tagsMatch = post.tags ? post.tags.toLowerCase().includes(query) : false

      // Search in excerpt
      const excerptMatch = post.excerpt ? post.excerpt.toLowerCase().includes(query) : false

      return titleMatch || tagsMatch || excerptMatch
    })
  }, [posts, searchQuery])

  const loadMorePosts = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)
    try {
      const response = await fetch(`/api/blog?page=${page + 1}&limit=12`)
      const data = await response.json()

      if (data.docs && data.docs.length > 0) {
        setPosts((prev) => [...prev, ...data.docs])
        setPage((prev) => prev + 1)
        setHasMore(data.hasNextPage)
      } else {
        setHasMore(false)
      }
    } catch (error) {
      console.error('Failed to load more posts:', error)
      setHasMore(false)
    } finally {
      setLoading(false)
    }
  }, [loading, hasMore, page])

  // Set up intersection observer for infinite scrolling
  useEffect(() => {
    if (!searchQuery.trim() && hasMore && loadingRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const target = entries[0]
          if (target.isIntersecting && !loading) {
            loadMorePosts()
          }
        },
        {
          threshold: 0.1,
          rootMargin: '100px',
        },
      )

      observerRef.current.observe(loadingRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [loadMorePosts, loading, hasMore, searchQuery])

  // Reset to initial data when search query changes
  useEffect(() => {
    if (searchQuery.trim()) {
      // When searching, we work with the current loaded posts
      return
    }
    // When search is cleared, reset to show all loaded posts
  }, [searchQuery])

  return (
    <>
      <div className="text-center mb-8">
        <Input
          type="text"
          className="max-w-md mx-auto"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-8">
        <div className="text-center">
          <p className="text-md italic text-muted-foreground">{clickToExplore}</p>
        </div>
        {filteredPosts.length > 0 ? (
          <>
            <BlogDisplay posts={filteredPosts} readMore={readMore} />
            {!searchQuery.trim() && (
              <div ref={loadingRef} className="text-center py-8">
                {loading && <LoadingSpinner size="lg" />}
                {!hasMore && !loading && (
                  <p className="text-muted-foreground text-sm">No more posts to load</p>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {searchQuery.trim() ? `No blog posts found matching "${searchQuery}"` : notFoundText}
            </p>
          </div>
        )}
      </div>
    </>
  )
}
