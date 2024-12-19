import type { Metadata } from "next";
import { routing, redirect } from "@/i18n/routing";
import type { localeType } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: localeType }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactPage.Meta" });

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
    // Dopisac sie do autorow
    authors: [{ name: "Libi Rajzer", url: "https://rajzer.dev" }],
    keywords: t("keywords"),
    category: t("category"),
    twitter: {
      title: t("twitterTitle"),
      description: t("twitterDescription"),
      card: "summary",
    },
  };
}

export default async function Layout(
  props: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: localeType }>;
  }>
) {
  const params = await props.params;

  const { locale } = params;

  const { children } = props;

  // Ensure that the incoming `locale` is valid

  if (!routing.locales.includes(locale as localeType)) {
    redirect({ href: "/contact", locale: routing.defaultLocale });
  }
  return children;
}
