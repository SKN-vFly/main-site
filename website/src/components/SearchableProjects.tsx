'use client'
import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { ProjectDisplay } from '@/components/ProjectDisplayWrapper'
import { Project } from '@/payload-types'

interface SearchableProjectsProps {
  projects: Project[]
  learnMore: string
  searchPlaceholder: string
  notFoundText: string
  clickToExplore: string
}

export function SearchableProjects({
  projects: initialProjects,
  learnMore,
  searchPlaceholder,
  notFoundText,
  clickToExplore,
}: SearchableProjectsProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadingRef = useRef<HTMLDivElement | null>(null)

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) {
      return projects
    }

    const query = searchQuery.toLowerCase()

    return projects.filter((project) => {
      // Search in project title
      const titleMatch = project.project_title.toLowerCase().includes(query)

      // Search in tags (if they exist)
      const tagsMatch = project.tags ? project.tags.toLowerCase().includes(query) : false

      // Search in project description
      const descriptionMatch = project.project_description
        ? project.project_description.toLowerCase().includes(query)
        : false

      return titleMatch || tagsMatch || descriptionMatch
    })
  }, [projects, searchQuery])

  const loadMoreProjects = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)
    try {
      const response = await fetch(`/api/projects?page=${page + 1}&limit=12`)
      const data = await response.json()

      if (data.docs && data.docs.length > 0) {
        setProjects((prev) => [...prev, ...data.docs])
        setPage((prev) => prev + 1)
        setHasMore(data.hasNextPage)
      } else {
        setHasMore(false)
      }
    } catch (error) {
      console.error('Failed to load more projects:', error)
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
            loadMoreProjects()
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
  }, [loadMoreProjects, loading, hasMore, searchQuery])

  // Reset to initial data when search query changes
  useEffect(() => {
    if (searchQuery.trim()) {
      // When searching, we work with the current loaded projects
      return
    }
    // When search is cleared, reset to show all loaded projects
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
        {filteredProjects.length > 0 ? (
          <>
            <ProjectDisplay projects={filteredProjects} learnMore={learnMore} />
            {!searchQuery.trim() && (
              <div ref={loadingRef} className="text-center py-8">
                {loading && <LoadingSpinner size="lg" />}
                {!hasMore && !loading && (
                  <p className="text-muted-foreground text-sm">No more projects to load</p>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {searchQuery.trim() ? `No projects found matching "${searchQuery}"` : notFoundText}
            </p>
          </div>
        )}
      </div>
    </>
  )
}
