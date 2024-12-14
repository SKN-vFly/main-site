import { useTranslations } from "next-intl";
import { MediaHeader } from "@/components/MediaHeader";
import { localeArray } from "@/i18n/routing";

export default function Landing() {
  const t = useTranslations("MainPage");
  return (
    <div className="px-4 lg:w-[66%] lg:px-0 mx-auto min-h-[600vh]">
      <MediaHeader text={t("title")} />
      <div className="p-4 mx-auto w-[60%]">
        <h2>{t("subtitle")}</h2>
      </div>
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
