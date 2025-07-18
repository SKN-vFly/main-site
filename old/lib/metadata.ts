import { localeType } from "@/i18n/routing";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: localeType }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "MainPage.Meta" });

  return {
    title: t("title"),
    description: t("description"),
    robots: {
      follow: true,
      index: true,
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      type: "website",
      locale: locale,
      url: `${locale}/`,
    },
    authors: [
      { name: "Libi Rajzer", url: "https://rajzer.dev" },
      { name: "Michał Czyż", url: "https://c2yz.com" },
    ],
    keywords: t("keywords"),
    category: t("category"),
    twitter: {
      title: t("twitterTitle"),
      description: t("twitterDescription"),
      card: "summary",
    },
  };
}