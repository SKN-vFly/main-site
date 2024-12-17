import type { Metadata } from "next";
import { routing, redirect } from "@/i18n/routing";
import type { localeType } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { locale: localeType };
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "MainPage.Meta" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      type: "website",
      locale: locale,
      url: `${locale}/`,
    },
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
    params: { locale: string };
  }>
) {
  const params = await props.params;

  const { locale } = params;

  const { children } = props;

  // Ensure that the incoming `locale` is valid

  if (!routing.locales.includes(locale as localeType)) {
    redirect({ href: "/projects", locale: routing.defaultLocale });
  }
  return children;
}
