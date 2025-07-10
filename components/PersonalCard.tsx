"use client";
import Image from "next/image";
import { useState } from "react";

export function PersonalCard(params: {
  name: string;
  email: string;
  role: string;
  imageSrc: string;
  translations: {
    name: string;
    email: string;
    role: string;
  };
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { name, email, role, imageSrc, translations } = params;

  return (
    <div
      className="w-full h-full relative transition-all overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`z-[999] absolute bottom-3 left-1/2 -translate-x-1/2 ${
          isHovered ? "opacity-100 " : "opacity-0"
        }`}
        aria-hidden={isHovered}
      >
        <h2 className="text-2xl">{name}</h2>
        <h3 className=" text-lg">{role}</h3>
        <h3 className="text-xl">
          {translations.email}
          <a href={`mailto:${email}`}>{email} </a>
        </h3>
      </div>
      <Image
        src={imageSrc}
        alt={`${translations.name}${name}`}
        fill={true}
        className={`rounded-t-2xl object-contain z-10 ${
          isHovered ? "blur-md" : ""
        }`}
      />
      {isHovered && (
        <div className="w-full h-full bg-white dark:bg-black !bg-opacity-50  absolute z-[200] border-0 rounded-3xl"></div>
      )}
    </div>
  );
}
