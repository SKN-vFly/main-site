"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useState } from "react";

const Navbar = () => {
  const t = useTranslations("Components.Navbar");
  return (
    <>
      <nav className="p-4 bg-black border-b border-white whitespace-nowrap fixed w-full">
        <ul className="flex justify-end space-x-4 ">
          <li className={"p-2"}>
            <Link href="/">logo</Link>
          </li>
          <li>
            <LangSwitcher />
          </li>
          <li className={" w-full"}></li>
          <li className={"border border-white p-2 text-center rounded-lg"}>
            <Link href="/">{t("home")}</Link>
          </li>
          <li className={"border border-white p-2 text-center rounded-lg"}>
            <Link href="/projects">{t("projects")}</Link>
          </li>
          <li className={"border border-white p-2 text-center rounded-lg"}>
            <Link href="/contact">{t("contact")}</Link>
          </li>
          <li className={"border border-white p-2 text-center rounded-lg"}>
            <Link href="/join-us">{t("join")}</Link>
          </li>
        </ul>
      </nav>
      <div className="p-6">hidden text</div>
    </>
  );
};

function LangSwitcher() {
  const t = useTranslations("Components.Navbar");
  // On hover, show the other languages
  const [showLangsClicked, setShowLangsClicked] = useState(false);
  const [showLangsHovered, setShowLangsHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowLangsHovered(true)}
      onMouseLeave={() => setShowLangsHovered(false)}
    >
      <button
        className={`border border-white p-2 text-center ${
          showLangsClicked || showLangsHovered
            ? "rounded-t-lg rounded-b-0"
            : "rounded-lg"
        }`}
        onClick={() => setShowLangsClicked(!showLangsClicked)}
      >
        {t("lang")}
      </button>
      <div
        className={`absolute top-10 -translate-x-1/3 bg-black border border-white rounded-md p-2 flex flex-col  ${
          showLangsClicked || showLangsHovered ? "" : "hidden"
        }`}
      >
        <Link
          href="/"
          locale="en"
          className="p-1 m-1 border border-white rounded-sm"
        >
          English
        </Link>
        <Link
          href="/"
          locale="pl"
          className="p-1 m-1 border border-white rounded-sm"
        >
          Polski
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
