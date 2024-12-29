import { localeType } from "@/i18n/routing";
import grayMatter from "gray-matter";
import fs from "fs";
import path from "path";

const projectsDirectory = path.join(process.cwd(), "projects");

export function getAllPosts(locale: localeType) {
  const fileNames = fs.readdirSync(path.join(projectsDirectory, locale));
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(projectsDirectory, locale, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = grayMatter(fileContents);
    return {
      id,
      data: matterResult.data,
      content: matterResult.content,
    };
  });
  return allPostsData;
}
export function getPost(locale: localeType, id: string) {
  const sanitizedId = path.basename(id).replace(/[^a-zA-Z0-9_-]/g, "");
  const fullPath = path.join(projectsDirectory, locale, `${sanitizedId}.md`);
  if (!fullPath.startsWith(path.join(projectsDirectory, locale))) {
    throw new Error("Invalid file path");
  }
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = grayMatter(fileContents);
  return {
    id: sanitizedId,
    data: matterResult.data,
    content: matterResult.content,
  };
}
