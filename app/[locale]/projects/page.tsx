import { useTranslations } from "next-intl";
// import { localeArray } from "@/i18n/routing";
import { ProjectDisplay } from "@/components/ProjectDisplayWrapper";
const projects = [
  {
    title: "Project 1",
    description: "Description 1",
    imgSrc: "/placeholder.jpg",
    link: "/projects/project1",
  },
  {
    title: "Project 2",
    description: "Description 2",
    imgSrc: "/placeholder.jpg",
    link: "/projects/project2",
  },
  {
    title: "Project 3",
    description: "Description 3",
    imgSrc: "/placeholder.jpg",
    link: "/projects/project3",
  },
  {
    title: "Project 4",
    description: "Description 4",
    imgSrc: "/placeholder.jpg",
    link: "/projects/project4",
  },
  {
    title: "Project 5",
    description: "Description 5",
    imgSrc: "/placeholder.jpg",
    link: "/projects/project5",
  },
  {
    title: "Project 6",
    description: "Description 6",
    imgSrc: "/placeholder.jpg",
    link: "/projects/project6",
  },
  {
    title: "Project 7",
    description: "Description 7",
    imgSrc: "/placeholder.jpg",
    link: "/projects/project7",
  },
  {
    title: "Project 8",
    description: "Description 8",
    imgSrc: "/placeholder.jpg",
    link: "/projects/project8",
  },
  {
    title: "Project 9",
    description: "Description 9",
    imgSrc: "/placeholder.jpg",
    link: "/projects/project9",
  },
  {
    title: "Project 10",
    description: "Description 10",
    imgSrc: "/placeholder.jpg",
    link: "/projects/project10",
  },
  {
    title: "Project 11",
    description: "Description 11",
    imgSrc: "/placeholder.jpg",
    link: "/projects/project11",
  },
];

export default function Projects() {
  const t = useTranslations("ProjectsPage");

  return (
    <div className="container mx-auto px-4 py-12 space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          {t("title")}
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Odkryj nasze innowacyjne projekty i rozwiązania w dziedzinie lotnictwa
        </p>
      </div>

      {/* Projects Grid */}
      <div className="space-y-8">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">
            Kliknij na projekt, aby dowiedzieć się więcej
          </p>
        </div>
        <ProjectDisplay projects={projects} />
      </div>
    </div>
  );
}

// export function generateStaticParams() {
//   // Generate static paths for all locales
//   const locales = localeArray;
//   const paths = locales.map((locale) => ({
//     params: { locale },
//   }));
//   return paths;
// }
