"use client";
import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";

export function ProjectComponent(props: {
  title: string;
  description: string;
  imgSrc: string;
  link: string;
}) {
  const [hover, setHover] = useState(false);
  const { title, description, imgSrc, link } = props;

  return (
    <Link
      href={link}
      className={`border  border-black dark:border-white rounded-2xl p-2 pb-14 transition-all overflow-hidden ${
        hover ? "m-2" : "m-5"
      }`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative aspect-square">
        <Image
          src={imgSrc}
          alt={title}
          fill={true}
          className={`rounded-2xl mt-12 ${hover ? "blur-md" : ""}`}
        />
        <div
          className="z-[999] absolute top-1 left-1/2 -translate-x-1/2 text-center transition-all duration-300 w-full"
          aria-hidden={hover}
        >
          <h2 className="text-2xl w-full">{title}</h2>
          <p
            className={`text-lg ${hover ? "opacity-100" : "opacity-0"}`}
            aria-hidden={hover}
          >
            {description}
          </p>
        </div>
        {hover && (
          <div className="absolute -top-10 -left-10 w-[120%] h-[120%]  bg-white dark:bg-black !bg-opacity-50 z-[200] border-0 rounded-2xl"></div>
        )}
      </div>
    </Link>
  );
}
