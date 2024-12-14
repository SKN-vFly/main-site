import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing, redirect } from "@/i18n/routing";
import type { localeType } from "@/i18n/routing";
import Navbar from "@/components/Navbar";
import { ScrollToTop } from "@/components/ScrollToTop";

const robotoSans = Roboto({
  weight: ["400", "700"],
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
      </body>
    </html>
  );
}
