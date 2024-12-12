import { useTranslations } from "next-intl";

export default function Projects() {
  const t = useTranslations("ProjectsPage");
  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("body")}</p>
    </div>
  );
}