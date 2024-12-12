import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const Navbar = () => {
  const t = useTranslations("Components.Navbar");
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">{t("home")}</Link>
        </li>
        <li>
          <Link href="/projects">{t("projects")}</Link>
        </li>
        <li>
          <Link href="/contact">{t("contact")}</Link>
        </li>
        <li>
          <Link href="/join-us">{t("join")}</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
