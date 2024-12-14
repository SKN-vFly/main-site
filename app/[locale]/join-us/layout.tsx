import type { Metadata } from "next";
import { routing, redirect } from "@/i18n/routing";
import type { localeType } from "@/i18n/routing";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

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
    redirect({ href: "/join-us", locale: routing.defaultLocale });
  }
  return children;
}
