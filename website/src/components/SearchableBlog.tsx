'use client'
import React, { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
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
  posts,
  readMore,
  searchPlaceholder,
  notFoundText,
  clickToExplore,
}: SearchableBlogProps) {
  const [searchQuery, setSearchQuery] = useState('')

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
          <BlogDisplay posts={filteredPosts} readMore={readMore} />
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
