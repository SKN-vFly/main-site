"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useState } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const t = useTranslations("Components.Navbar");
  return (
    <>
      <nav className="p-1 bg-white dark:bg-black border-b border-black dark:border-white whitespace-nowrap fixed w-full z-[200]">
        <ul className="flex">
          <li className={"p-1 mx-1"}>
            <Link href="/">logo</Link>
          </li>
          <li className="mx-1">
            <LangSwitcher />
          </li>
          <li className={"w-full"}></li>
          <li
            className={
              "border border-black dark:border-white p-1 mx-1 text-center rounded-lg my-auto hover:bg-slate-400 hover:dark:bg-slate-600 transition-colors duration-300"
            }
          >
            <Link href="/">{t("home")}</Link>
          </li>
          <li
            className={
              "border border-black dark:border-white p-1 mx-1 text-center rounded-lg my-auto hover:bg-slate-400 hover:dark:bg-slate-600 transition-colors duration-300"
            }
          >
            <Link href="/projects">{t("projects")}</Link>
          </li>
          <li
            className={
              "border border-black dark:border-white p-1 mx-1 text-center rounded-lg my-auto hover:bg-slate-400 hover:dark:bg-slate-600 transition-colors duration-300"
            }
          >
            <Link href="/contact">{t("contact")}</Link>
          </li>
          <li
            className={
              "border border-black dark:border-white p-1 mx-1 text-center rounded-lg my-auto hover:bg-slate-400 hover:dark:bg-slate-600 transition-colors duration-300"
            }
          >
            <Link href="/join-us">{t("join")}</Link>
          </li>
        </ul>
      </nav>
      <div className="p-2">.</div>
      {/* Hidden text to make floating navbar align nicely */}
    </>
  );
};

function LangSwitcher() {
  const t = useTranslations("Components.Navbar");
  // On hover, show the other languages
  const [showLangsClicked, setShowLangsClicked] = useState(false);
  const [showLangsHovered, setShowLangsHovered] = useState(false);
  const url = usePathname();
  console.log(`/${url.split("/").slice(2).join("/")}`);
  return (
    <div
      className="relative"
      onMouseEnter={() => setShowLangsHovered(true)}
      onMouseLeave={() => setShowLangsHovered(false)}
    >
      <button
        className={`border border-black dark:border-white p-1 text-center ${
          showLangsClicked || showLangsHovered
            ? "rounded-t-lg rounded-b-0"
            : "rounded-lg"
        }`}
        onClick={() => setShowLangsClicked(!showLangsClicked)}
      >
        {t("lang")}
      </button>
      <div
        className={`absolute top-8 -translate-x-1/3 bg-white dark:bg-black border border-black dark:border-white rounded-md p-2 flex flex-col  ${
          showLangsClicked || showLangsHovered ? "" : "hidden"
        }`}
      >
        <Link
          href={`/${url.split("/").slice(2).join("/")}`}
          locale="en"
          className="p-1 m-1 border  border-black dark:border-white rounded-sm"
        >
          English
        </Link>
        <Link
          href={`/${url.split("/").slice(2).join("/")}`}
          locale="pl"
          className="p-1 m-1 border  border-black dark:border-white rounded-sm"
        >
          Polski
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
