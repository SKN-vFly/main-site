import { useTranslations } from "next-intl";
import { MediaHeader } from "@/components/MediaHeader";
import { Link } from "@/i18n/routing";

export default function Landing() {
  const t = useTranslations("MainPage");
  return (
    <div className="w-full">
      <div className="w-full h-[96vh]">
        {/* Niech ktos obliczy ile wysokosci zeby bylo do spodu strony a nie nizej */}
        <MediaHeader text={t("title")} />
        <div className="p-4 mx-auto w-[60%]">
          <h2>{t("subtitle")}</h2>
        </div>
        <div className="flex my-20">
          <Link
            href="https://discord.gg/57huavgd"
            target="_blank"
            className="p-2 border border-black dark:border-white rounded-2xl mx-auto hover:bg-slate-400 hover:dark:bg-slate-600 transition-colors duration-300"
          >
            {t("join")}
          </Link>
        </div>
      </div>
      <div className="w-full pb-10">
        <div className="text-black dark:text-white p-4 min-w-1/2 flex flex-col items-center justify-center mx-auto my-5 rounded-3xl">
          <h2 className="text-2xl border border-black dark:border-white px-10 py-2 rounded-2xl">
            {t("3rdtitle")}
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="w-full aspect-square border border-black dark:border-white rounded-3xl p-5">
            idkkk co tu ma bycccc
          </div>
          <div className="w-full aspect-square border border-black dark:border-white rounded-3xl p-5">
            ani tuuuuu
          </div>
        </div>
        <div className="flex my-5">
          <Link
            className="p-2 border border-black dark:border-white rounded-2xl mx-auto hover:bg-slate-400 hover:dark:bg-slate-600 transition-colors duration-300"
            href="https://discord.gg/57huavgd"
            target="_blank"
          >
            {t("join")}
          </Link>
        </div>
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
