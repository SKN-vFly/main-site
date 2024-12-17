import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
// Nie mam pojecia co tu dac pewnie jakies prawne rzeczy na przetwarzanie danych moze iubenda?
// Pewnie jeszcze idk do naszej polibudy link czy cos

export function Footer() {
  const t = useTranslations("Components.Footer");
  return (
    <footer className="bg-gray-900 text-white text-center p-4 w-full">
      <div className="flex flex-row w-3/5 mx-auto">
        <div className="flex flex-col text-left w-full">
          <ul>
            <li>
              <Link href="/">{t("home")}</Link>
            </li>
            <li>
              <Link href="/projects">{t("projects")}</Link>
            </li>
            <li>
              <Link href="/contact">{t("contact")}</Link>
            </li>
            <li>
              <Link href="/join-us">{t("join")}</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col text-left w-full">
          <ul>
            <li>
              <Link href="/">{t("home")}</Link>
            </li>
            <li>
              <Link href="/projects">{t("projects")}</Link>
            </li>
            <li>
              <Link href="/contact">{t("contact")}</Link>
            </li>
            <li>
              <Link href="/join-us">{t("join")}</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
