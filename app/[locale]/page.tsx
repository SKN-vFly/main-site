import { useTranslations } from "next-intl";
import { MediaHeader } from "@/components/MediaHeader";

export default function Landing() {
  const t = useTranslations("MainPage");
  return (
    <div>
      <MediaHeader text={t("title")} />
    </div>
  );
}
