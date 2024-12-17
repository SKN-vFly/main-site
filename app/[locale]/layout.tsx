import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing, redirect } from "@/i18n/routing";
import type { localeType } from "@/i18n/routing";
import Navbar from "@/components/Navbar";
import { ScrollToTop } from "@/components/ScrollToTop";
import { getTranslations } from "next-intl/server";
import { Footer } from "@/components/Footer";

const robotoSans = Roboto({
  weight: ["400", "700"],
  subsets: ["latin-ext"],
});

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  colorScheme: "light dark",
  userScalable: true,
  viewportFit: "cover",
  interactiveWidget: "resizes-visual",
};

export default async function RootLayout(
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
    redirect({ href: "/", locale: routing.defaultLocale });
  }

  const messages = await getMessages();
  return (
    <html lang={locale} className={`${robotoSans.className}`}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <ScrollToTop />
          <main className="px-4 lg:w-[66%] lg:px-0 mx-auto">{children}</main>
        </NextIntlClientProvider>
        <Footer />
      </body>
    </html>
  );
}
