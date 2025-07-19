import { getTranslations } from 'next-intl/server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CalendarIcon, TagIcon } from 'lucide-react'
import Link from 'next/link'

async function getAllProjects() {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'projects',
      where: {
        status: {
          equals: 'published',
        },
      },
      sort: '-publishedDate',
      depth: 2,
      limit: 1000, // Get all projects
    })
    return result.docs
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return []
  }
}

export default async function Index() {
  const projects = await getAllProjects()
  const t = await getTranslations()

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-4xl space-y-12">
        {/* Club Information */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Studenckie Koło Naukowe Wirtualnego Latania vFly
          </h1>
        </section>

        <Separator />

        {/* Projects List */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
              <CalendarIcon className="w-7 h-7" />
              {t('allProjects')} ({projects.length})
            </h2>
            <p className="text-muted-foreground">{t('allProjectsDescription')}</p>
          </div>

          {projects.length > 0 ? (
            <div className="space-y-6">
              {projects.map((project, index) => (
                <Card key={project.id} className="hover:shadow-md transition-shadow">
                  <CardContent>
                    <div className="space-y-4">
                      {/* Project Header */}
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between gap-4">
                            <h3 className="text-xl font-bold text-foreground leading-tight">
                              {project.slug && (
                                <Link
                                  href={`/projects/${project.slug}`}
                                  className="text-primary hover:underline"
                                >
                                  {project.project_title}
                                </Link>
                              )}
                            </h3>
                            <span className="text-sm text-muted-foreground font-medium whitespace-nowrap">
                              #{index + 1}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Project Description */}
                      <div className="space-y-3">
                        <p className="text-muted-foreground leading-relaxed">
                          {project.project_description}
                        </p>

                        {/* Tags */}
                        {project.tags && (
                          <div className="flex items-center gap-2 flex-wrap">
                            <TagIcon className="w-4 h-4 text-muted-foreground" />
                            {project.tags.split(',').map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="secondary" className="text-xs">
                                {tag.trim()}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <h3 className="text-xl font-semibold mb-2">No Projects Available</h3>
                <p className="text-muted-foreground">
                  Projects will be listed here once they are published.
                </p>
              </CardContent>
            </Card>
          )}
        </section>
      </div>
    </div>
  )
}
