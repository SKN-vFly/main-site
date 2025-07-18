import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft } from 'lucide-react'
import { Link } from '@/i18n/routing'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Project } from '@/payload-types'
import { RichText } from '@/components/RichText'

async function getProject(slug: string): Promise<Project | null> {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'projects',
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
    console.error('Failed to fetch project:', error)
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: project.project_title,
    description: project.project_description,
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    notFound()
  }

  const featuredImageUrl =
    typeof project.featured_image === 'object' && project.featured_image?.url
      ? project.featured_image.url
      : null

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Back Button */}
      <div className="mb-8">
        <Button variant="ghost" asChild className="p-0 h-auto">
          <Link
            href="/projects"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>
        </Button>
      </div>

      {/* Project Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          {project.project_title}
        </h1>

        <p className="text-xl text-muted-foreground mb-4">{project.project_description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags && typeof project.tags === 'string' && project.tags.trim().length > 0 ? (
            project.tags.split(',').map((tag: string, index: number) => (
              <Badge key={index} variant="secondary">
                {tag.trim()}
              </Badge>
            ))
          ) : (
            <Badge variant="secondary">No Tags</Badge>
          )}
        </div>

        <div className="text-sm text-muted-foreground mb-4">
          {project.publishedDate && (
            <>Published on {new Date(project.publishedDate).toLocaleDateString()}</>
          )}
        </div>

        {featuredImageUrl && (
          <div className="mb-8">
            <Image
              src={featuredImageUrl}
              alt={project.project_title}
              width={800}
              height={400}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="mt-8">
        <RichText data={project.abstract} />
      </div>
    </div>
  )
}
