import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import {
  HighlightBox,
  ProjectGrid,
  TechStack,
} from "@/components/mdx/MDXComponents";

interface ProjectMetadata {
  id: string;
  title: string;
  description: string;
  imgSrc: string;
  tags: string[];
  featured: boolean;
  publishedAt: string;
}

async function getProjectMetadata(
  projectId: string
): Promise<ProjectMetadata | null> {
  try {
    const projectsPath = path.join(
      process.cwd(),
      "public",
      "projects",
      "projects.json"
    );
    const jsonData = fs.readFileSync(projectsPath, "utf8");
    const projects: ProjectMetadata[] = JSON.parse(jsonData);
    return projects.find((p) => p.id === projectId) || null;
  } catch (error) {
    console.error("Error fetching project metadata:", error);
    return null;
  }
}

async function getProjectContent(
  projectId: string
): Promise<{ content: React.ReactElement } | null> {
  try {
    const contentPath = path.join(
      process.cwd(),
      "public",
      "projects",
      `${projectId}.mdx`
    );
    const source = fs.readFileSync(contentPath, "utf8");

    const { content } = await compileMDX({
      source,
      options: {
        parseFrontmatter: true,
      },
      components: {
        HighlightBox,
        ProjectGrid,
        TechStack,
      },
    });

    return { content };
  } catch (error) {
    console.error("Error fetching project content:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const projectId = slug;
  const metadata = await getProjectMetadata(projectId);

  if (!metadata) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      images: [metadata.imgSrc],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;
  const projectId = slug;
  const metadata = await getProjectMetadata(projectId);
  const contentData = await getProjectContent(projectId);

  if (!metadata || !contentData) {
    notFound();
  }

  const { content } = contentData;

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
        <div className="flex flex-wrap gap-2 mb-4">
          {metadata.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          {metadata.title}
        </h1>

        <p className="text-xl text-muted-foreground mb-6">
          {metadata.description}
        </p>

        <div className="text-sm text-muted-foreground mb-8">
          Published on {new Date(metadata.publishedAt).toLocaleDateString()}
        </div>

        {metadata.imgSrc && (
          <div className="mb-8">
            <Image
              src={metadata.imgSrc}
              alt={metadata.title}
              width={800}
              height={400}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {content}
      </div>
    </div>
  );
}
