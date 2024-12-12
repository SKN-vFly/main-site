import { useTranslations } from "next-intl";

export default function Join() {
  const t = useTranslations("JoinPage");
  return (
<div>
  <h1>{t("title")}</h1>
  <p>{t("body")}</p>
</div>
  );
}