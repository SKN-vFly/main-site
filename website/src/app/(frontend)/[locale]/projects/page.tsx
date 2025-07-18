import { getTranslations } from 'next-intl/server'
import { ProjectDisplay } from '@/components/ProjectDisplayWrapper'

interface ProjectMetadata {
  id: string
  title: string
  description: string
  imgSrc: string
  tags: string[]
  featured: boolean
  publishedAt: string
}

async function getProjects(): Promise<ProjectMetadata[]> {
  return []
}

export default async function Projects() {
  const t = await getTranslations('ProjectsPage')
  const projectsData = await getProjects()

  const projects = projectsData.map((project) => ({
    title: project.title,
    description: project.description,
    imgSrc: project.imgSrc,
    link: `/projects/${project.id}`,
  }))

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

      <div className="space-y-8">
        <div className="text-center">
          <p className="text-md italic text-muted-foreground">{t('clickToExplore')}</p>
        </div>
        {projects.length > 0 ? (
          <ProjectDisplay projects={projects} learnMore={t('learnMore')} />
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t('notfound')}</p>
          </div>
        )}
      </div>
    </div>
  )
}
