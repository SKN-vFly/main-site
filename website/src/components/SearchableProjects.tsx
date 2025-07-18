'use client'
import React, { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
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
  projects,
  learnMore,
  searchPlaceholder,
  notFoundText,
  clickToExplore,
}: SearchableProjectsProps) {
  const [searchQuery, setSearchQuery] = useState('')

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

      return titleMatch || tagsMatch
    })
  }, [projects, searchQuery])

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
          <ProjectDisplay projects={filteredProjects} learnMore={learnMore} />
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
