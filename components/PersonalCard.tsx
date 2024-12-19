"use client";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";

export function PersonalCard(params: {
  name: string;
  email: string;
  role: string;
  imageSrc: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { name, email, role, imageSrc } = params;
  const t = useTranslations("Components.PersonalCard");

  return (
    <div
      className="w-full h-full relative transition-all"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`z-[999] absolute bottom-3 left-1/2 -translate-x-1/2 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <h2 className="text-2xl">{name}</h2>
        <h3>{role}</h3>
        <h3 className="text-xl">
          {t("email")} {email}
        </h3>
      </div>
      <Image
        src={imageSrc}
        alt={`${t("imageAlt")}${name}`}
        fill={true}
        className={`rounded-t-2xl object-contain z-10 ${
          isHovered ? "blur-md" : ""
        }`}
      />
    </div>
  );
}
