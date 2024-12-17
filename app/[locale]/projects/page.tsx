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
    <>
      <div className="my-3">
        <h1 className="text-3xl text-center">{t("title")}</h1>
      </div>
      <ProjectDisplay projects={projects} />
    </>
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
