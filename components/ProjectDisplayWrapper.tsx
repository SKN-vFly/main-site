"use client";
import { createContext, useState, Dispatch } from "react";
import { ProjectComponent } from "./ProjectComponent";

type ProjectType = {
  title: string;
  description: string;
  imgSrc: string;
  link: string;
};

interface ProjectDisplayProps {
  projects: ProjectType[];
  learnMore: string;
}

export interface ProjectClickedContextType {
  allowInteraction: boolean;
  setAllowInteraction: Dispatch<React.SetStateAction<boolean>>;
}

export const ProjectClickedContext = createContext<ProjectClickedContextType>({
  allowInteraction: false,
  setAllowInteraction: () => {},
});

export const ProjectDisplay = ({
  projects,
  learnMore,
}: ProjectDisplayProps) => {
  const [allowInteraction, setAllowInteraction] = useState(true);
  return (
    <ProjectClickedContext.Provider
      value={{ allowInteraction, setAllowInteraction }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project: ProjectType) => (
          <ProjectComponent
            key={project.title}
            title={project.title}
            description={project.description}
            imgSrc={project.imgSrc}
            link={project.link}
            learnMore={learnMore}
          />
        ))}
      </div>
    </ProjectClickedContext.Provider>
  );
};
