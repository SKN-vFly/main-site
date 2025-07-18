import type { Viewport } from "next";
import { Roboto } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing, redirect } from "@/i18n/routing";
import type { localeType } from "@/i18n/routing";
import Navbar from "@/components/Navbar";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";

const robotoSans = Roboto({
  weight: ["400", "700"],
  subsets: ["latin-ext"],
});

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
    params: Promise<{ locale: string }>;
  }>
) {
  const params = await props.params;

  const { locale } = params;
  const { children } = props;

  if (!routing.locales.includes(locale as localeType)) {
    redirect({ href: "/", locale: routing.defaultLocale });
  }

  const messages = await getMessages();
  return (
    <html
      lang={locale}
      className={`${robotoSans.className}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <Navbar />
            <ScrollToTop />
            <main className="flex-1">{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
