import { useTranslations } from "next-intl";

export default function Landing() {
  const t = useTranslations("MainPage");
  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("body")}</p>
    </div>
  );
}
