import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations("ContactPage");
  return (
    <body>
      <h1>{t("title")}</h1>
      <p>{t("body")}</p>
    </body>
  );
}
