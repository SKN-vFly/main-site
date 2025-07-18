import React from "react";

interface HighlightBoxProps {
  children: React.ReactNode;
  type?: "info" | "success" | "warning" | "error";
  title?: string;
  icon?: string;
}

const colorMap = {
  info: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200",
  success:
    "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200",
  warning:
    "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200",
  error:
    "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200",
};

export function HighlightBox({
  children,
  type = "info",
  title,
  icon,
}: HighlightBoxProps) {
  const colorClass = colorMap[type];

  return (
    <div className={`p-4 rounded-lg border ${colorClass} my-4`}>
      {title && (
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          {icon && <span>{icon}</span>}
          {title}
        </h3>
      )}
      <div className="text-sm">{children}</div>
    </div>
  );
}

export function ProjectGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">{children}</div>
  );
}

export function TechStack({ technologies }: { technologies: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 my-4">
      {technologies.map((tech) => (
        <span
          key={tech}
          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
        >
          {tech}
        </span>
      ))}
    </div>
  );
}
