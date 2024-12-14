"use client";
import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProjectClickedContext } from "./ProjectDisplayWrapper";

export function ProjectComponent(props: {
  title: string;
  description: string;
  imgSrc: string;
  link: string;
}) {
  const [hover, setHover] = useState(false);
  const [clicked, setClicked] = useState(false);
  const { title, description, imgSrc, link } = props;
  const { allowInteraction, setAllowInteraction } = useContext(
    ProjectClickedContext
  );

  useEffect(() => {
    setAllowInteraction(!clicked);
  }, [clicked, setAllowInteraction]);
  console.log("allowInteraction", allowInteraction);
  return (
    <>
      {!clicked ? (
        <div
          className={`border  border-black dark:border-white rounded-2xl p-2 transition-all ${
            hover ? "m-2" : "m-5"
          }`}
          onMouseEnter={() => allowInteraction && setHover(true)}
          onMouseLeave={() => allowInteraction && setHover(false)}
          onClick={() => allowInteraction && setClicked(true)}
        >
          <div className="relative aspect-square">
            <Image
              src={imgSrc}
              alt={title}
              fill={true}
              className="rounded-t-2xl"
            />
          </div>
          <h3 className="font-bold text-center">{title}</h3>
        </div>
      ) : (
        <>
          <div
            className="border  border-black dark:border-white rounded-2xl p-2 opacity-0"
            onClick={() => setClicked(true)}
          >
            <div className="relative aspect-square">
              <Image
                src={imgSrc}
                alt={title}
                fill={true}
                className="rounded-t-2xl"
              />
            </div>
            <h3>{title}</h3>
          </div>
          <div
            className="bg-gray-200 dark:bg-gray-900 border  border-black dark:border-white rounded-2xl p-2 absolute z-[100] translate-x-1/4 w-[66%]"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => setClicked(false)}
          >
            <h3 className="">{title}</h3>
            <div className="relative aspect-square ">
              <Image
                src={imgSrc}
                alt={title}
                fill={true}
                className="rounded-t-2xl "
              />
            </div>
            <p className="">{description}</p>
            <Link href={link}>Learn more</Link>
          </div>
        </>
      )}
    </>
  );
}
