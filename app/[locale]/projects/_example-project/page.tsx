import { useTranslations } from "next-intl";

export default function Projects() {
  const t = useTranslations("Projects.Example");

  return (
    <>
      <div className="my-3">
        <h1 className="text-3xl text-center">{t("title")}</h1>
      </div>
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
