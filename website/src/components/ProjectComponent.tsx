'use client'
import { useEffect, useState, useContext } from 'react'
import { Link } from '@/i18n/routing'
import { ProjectClickedContext } from './ProjectDisplayWrapper'
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
import { Project } from '@/payload-types'
import Image from 'next/image'

export function ProjectComponent(props: { project: Project; learnMore: string }) {
  const [hover, setHover] = useState(false)
  const [open, setOpen] = useState(false)
  const { project, learnMore } = props
  const { allowInteraction, setAllowInteraction } = useContext(ProjectClickedContext)

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
              {project.featured_image ? (
                <Image
                  src={
                    typeof project.featured_image === 'object' && project.featured_image.url
                      ? project.featured_image.url
                      : ''
                  }
                  alt={project.project_title}
                  className="w-full h-full object-cover rounded-t-lg"
                  width={500}
                  height={500}
                />
              ) : (
                <Skeleton className="w-full h-full rounded-t-lg" />
              )}
            </div>
            <div className="p-4 space-y-3">
              <CardTitle className="text-center">{project.project_title}</CardTitle>
              {project.tags && Array.isArray(project.tags) && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 justify-center">
                  {(project.tags as any[]).slice(0, 3).map((tagItem: any, index: number) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tagItem.tag}
                    </Badge>
                  ))}
                  {(project.tags as any[]).length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{(project.tags as any[]).length - 3}
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
          <DialogTitle>{project.project_title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {project.tags && Array.isArray(project.tags) && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {(project.tags as any[]).map((tagItem: any, index: number) => (
                <Badge key={index} variant="secondary">
                  {tagItem.tag}
                </Badge>
              ))}
            </div>
          )}
          <div className="relative aspect-video">
            {project.featured_image ? (
              <Image
                src={
                  typeof project.featured_image === 'object' && project.featured_image.url
                    ? project.featured_image.url
                    : ''
                }
                alt={project.project_title}
                className="w-full h-full object-cover rounded-lg shadow-lg"
                width={500}
                height={300}
              />
            ) : (
              <Skeleton className="w-full h-full rounded-lg" />
            )}
          </div>
          <DialogDescription className="text-base">{project.project_description}</DialogDescription>
          <div className="flex justify-end">
            <Button asChild>
              <Link href={`/projects/${project.slug}`}>{learnMore}</Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
