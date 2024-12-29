import { getPost } from "@/components/Projects";
import { localeType } from "@/i18n/routing";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: localeType; project: string }>;
}) {
  const { locale, project } = await params;
  const projectData = getPost(locale, project);
  const { title } = projectData.data;
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(projectData.content);
  return (
    <>
      <div className="my-3">
        <h1 className="text-3xl text-center">{title}</h1>
      </div>
      <div dangerouslySetInnerHTML={{ __html: processedContent.toString() }} />
    </>
  );
}
