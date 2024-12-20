import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { PersonalCard } from "@/components/PersonalCard";
// import { localeArray } from "@/i18n/routing";

export default function Contact() {
  const t = useTranslations("ContactPage");
  return (
    <div>
      <h1 className="my-5 text-5xl">{t("joinHeader")}</h1>
      <h2 className="text-3xl text-center">{t("leaders")}</h2>
      <div className="grid gap-5 grid-cols-2 w-2/3 mx-auto my-10">
        <div className="w-full aspect-[3/4] border border-black dark:border-white rounded-3xl text-center">
          <PersonalCard
            name="mgr inż. Piotr Bartosz"
            email="piotbar578@student.polsl.pl"
            imageSrc="/placeholder.jpg"
            role={t("chairman")}
          />
        </div>
        <div className="w-full aspect-[3/4]  border border-black dark:border-white rounded-3xl text-center">
          <PersonalCard
            name="dr inż. Dariusz Myszor"
            email="dariusz.myszor@polsl.pl"
            imageSrc="/placeholder.jpg"
            role={t("supervisor")}
          />
        </div>
      </div>
      <h2 className="text-3xl text-center">{t("sectLeads")}</h2>

      <div className="grid gap-5 grid-cols-4 w-full my-10">
        <div className="w-full aspect-[3/4] border border-black dark:border-white rounded-3xl text-center">
          <PersonalCard
            name="Jakub Wieczorek"
            email="jw306100@student.polsl.pl"
            imageSrc="/placeholder.jpg"
            role={t("infraLead")}
          />
        </div>
        <div className="w-full aspect-[3/4]  border border-black dark:border-white rounded-3xl text-center">
          <PersonalCard
            name="Natalia Koim"
            email="natakoi272@student.polsl.pl"
            imageSrc="/placeholder.jpg"
            role={t("promoLead")}
          />
        </div>
        <div className="w-full aspect-[3/4]  border border-black dark:border-white rounded-3xl text-center">
          <PersonalCard
            name="Michał Czyż"
            email="mc305963@student.polsl.pl"
            imageSrc="/placeholder.jpg"
            role={t("adminLead")}
          />
        </div>
        <div className="w-full aspect-[3/4]  border border-black dark:border-white rounded-3xl text-center">
          <PersonalCard
            name="Maria Ochman"
            email="mo306378@student.polsl.pl"
            imageSrc="/placeholder.jpg"
            role={t("projeLead")}
          />
        </div>
      </div>

      <div className="my-10 flex">
        <Link
          className="px-5 py-2 border border-black dark:border-white text-xl mx-auto rounded-xl"
          href="https://discord.gg/57huavgd"
          target="_blank"
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
