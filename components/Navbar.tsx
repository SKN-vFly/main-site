"use-client";
import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const Navbar = () => {
  const t = useTranslations("Components.Navbar");
  return (
    <nav className="p-4 bg-black border-b border-white">
      <ul className="flex justify-end space-x-4 ">
        <li className={"border border-white p-2 rounded-lg"}>
          <Link href="/">{t("home")}</Link>
        </li>
        <li className={"border border-white p-2 rounded-lg"}>
          <Link href="/projects">{t("projects")}</Link>
        </li>
        <li className={"border border-white p-2 rounded-lg"}>
          <Link href="/contact">{t("contact")}</Link>
        </li>
        <li className={"border border-white p-4 rounded-lg"}>
          <Link href="/join-us">{t("join")}</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
