import type { Metadata } from "next";
import { routing, redirect } from "@/i18n/routing";
import type { localeType } from "@/i18n/routing";
import { getPost } from "@/components/Projects";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: localeType; project: string }>;
}): Promise<Metadata> {
  const { locale, project } = await params;
  const { title, description, keywords, category } = getPost(
    locale,
    project
  ).data;
  return {
    title: title,
    description: description,
    robots: {
      follow: true,
      index: true,
    },
    openGraph: {
      title: title,
      description: description,
      type: "website",
      locale: locale,
      url: `${locale}/`,
    },
    // Dopisac sie do autorow
    authors: [{ name: "Libi Rajzer", url: "https://rajzer.dev" }],
    keywords: keywords,
    category: category,
    twitter: {
      title: title,
      description: description,
      card: "summary",
    },
  };
}

export default async function Layout(
  props: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
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
