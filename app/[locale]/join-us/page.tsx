import { useTranslations } from "next-intl";
import { localeArray } from "@/i18n/routing";

export default function Join() {
  const t = useTranslations("JoinPage");
  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("body")}</p>
    </div>
  );
}

export function generateStaticParams() {
  // Generate static paths for all locales
  const locales = localeArray;
  const paths = locales.map((locale) => ({
    params: { locale },
  }));
  return paths;
}
