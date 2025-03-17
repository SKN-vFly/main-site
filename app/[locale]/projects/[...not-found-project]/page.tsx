"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function NotFound() {
  const t = useTranslations("Projects.NotFound");
  const [cat, setCat] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCat() {
      const catUrl = await getCat();
      setCat(catUrl);
    }
    fetchCat();
  }, []);

  return (
    <div className="pt-3">
      <h1 className="text-3xl">{t("title")}</h1>
      <h2 className="text-xl">{t("body")}</h2>
      <div className="relative w-full min-h-[calc(100vh-0.75rem-2.25rem-1.75rem-2rem)] flex justify-center items-center">
        {cat && (
          <Image
            src={cat}
            alt="Cat"
            fill={true}
            className="rounded-t-2xl object-contain z-10 "
          />
        )}
      </div>
    </div>
  );
}

async function getCat() {
  const response = await fetch("https://api.thecatapi.com/v1/images/search");
  const data = await response.json();
  return data[0]["url"];
}
