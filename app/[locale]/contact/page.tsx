import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations("ContactPage");
  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("body")}</p>
    </div>
  );
}