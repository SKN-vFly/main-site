import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function Join() {
  const t = useTranslations("JoinPage");
  return (
    <div>
      <h1 className="my-5 text-5xl">{t("joinHeader")}</h1>
      <h2 className="text-3xl text-center">{t("leaders")}</h2>
      <div className="grid gap-5 grid-cols-2 w-2/3 mx-auto my-10">
        <div className="w-full aspect-[3/4] border border-black dark:border-white rounded-3xl text-center">
          huh
        </div>
        <div className="w-full aspect-[3/4]  border border-black dark:border-white rounded-3xl text-center">
          huh2
        </div>
      </div>
      <h2 className="text-3xl text-center">{t("sectLeads")}</h2>

      <div className="grid gap-5 grid-cols-4 w-full my-10">
        <div className="w-full aspect-[3/4] border border-black dark:border-white rounded-3xl text-center">
          huh
        </div>
        <div className="w-full aspect-[3/4]  border border-black dark:border-white rounded-3xl text-center">
          huh2
        </div>
        <div className="w-full aspect-[3/4]  border border-black dark:border-white rounded-3xl text-center">
          huh3
        </div>
        <div className="w-full aspect-[3/4]  border border-black dark:border-white rounded-3xl text-center">
          huh4
        </div>
      </div>

      <div className="my-10 flex">
        <Link
          className="px-5 py-2 border border-black dark:border-white text-xl mx-auto rounded-xl"
          href="/"
        >
          {t("join")}
        </Link>
      </div>
    </div>
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
