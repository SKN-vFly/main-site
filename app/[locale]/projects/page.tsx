import { getTranslations } from "next-intl/server";
import { ProjectDisplay } from "@/components/ProjectDisplayWrapper";
import fs from "fs";
import path from "path";

interface ProjectMetadata {
  id: string;
  title: string;
  description: string;
  imgSrc: string;
  tags: string[];
  featured: boolean;
  publishedAt: string;
}

async function getProjects(): Promise<ProjectMetadata[]> {
  try {
    const projectsPath = path.join(
      process.cwd(),
      "public",
      "projects",
      "projects.json"
    );
    const jsonData = fs.readFileSync(projectsPath, "utf8");
    const projects: ProjectMetadata[] = JSON.parse(jsonData);
    return projects.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export default async function Projects() {
  const t = await getTranslations("ProjectsPage");
  const projectsData = await getProjects();

  // Transform projects data to match the expected format with locale-aware URLs
  const projects = projectsData.map((project) => ({
    title: project.title,
    description: project.description,
    imgSrc: project.imgSrc,
    link: `/projects/${project.id}`, // This will be handled by the Link component from i18n/routing
  }));

  return (
    <div className="container mx-auto px-4 py-12 space-y-16">
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          {t("title")}
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {t("description")}
        </p>
      </div>

      <div className="space-y-8">
        <div className="text-center">
          <p className="text-md italic text-muted-foreground">
            {t("clickToExplore")}
          </p>
        </div>
        {projects.length > 0 ? (
          <ProjectDisplay projects={projects} learnMore={t("learnMore")} />
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No projects found. Check back later!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
