import React from 'react';
import { useTranslations } from "next-intl";

const Navbar = () => {
    const t = useTranslations("Components.Navbar");
  return (
    <nav>
      <ul>
        <li><a href="/">{t("home")}</a></li>
        <li><a href="main-site/app/[locale]/projects"></a>{t("projects")}</li>
        <li><a href="main-site/app/[locale]/contact">{t("contact")}</a></li>
        <li><a href="main-site/app/[locale]/join-us">{t("join")}</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;