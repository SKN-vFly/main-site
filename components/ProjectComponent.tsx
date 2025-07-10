"use client";
import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProjectClickedContext } from "./ProjectDisplayWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export function ProjectComponent(props: {
  title: string;
  description: string;
  imgSrc: string;
  link: string;
}) {
  const [hover, setHover] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { title, description, imgSrc, link } = props;
  const { allowInteraction, setAllowInteraction } = useContext(
    ProjectClickedContext
  );

  useEffect(() => {
    setAllowInteraction(!clicked);
  }, [clicked, setAllowInteraction]);

  return (
    <>
      {!clicked ? (
        <Card
          className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
            hover ? "scale-105" : ""
          }`}
          onMouseEnter={() => allowInteraction && setHover(true)}
          onMouseLeave={() => allowInteraction && setHover(false)}
          onClick={() => allowInteraction && setClicked(true)}
        >
          <CardContent className="p-0">
            <div className="relative aspect-square">
              {!imageLoaded && !imageError && (
                <Skeleton className="absolute inset-0 w-full h-full rounded-t-lg" />
              )}
              <Image
                src={imgSrc}
                alt={title}
                fill={true}
                className={`rounded-t-lg object-cover transition-opacity duration-300 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
              {imageError && (
                <div className="absolute inset-0 bg-muted flex items-center justify-center rounded-t-lg">
                  <div className="text-center text-muted-foreground">
                    <div className="text-4xl mb-2">🖼️</div>
                    <p className="text-sm">Image not available</p>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4">
              <CardTitle className="text-center">{title}</CardTitle>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="opacity-0 pointer-events-none">
            <CardContent className="p-0">
              <div className="relative aspect-square">
                <Skeleton className="w-full h-full rounded-t-lg" />
              </div>
              <div className="p-4">
                <CardTitle className="text-center">{title}</CardTitle>
              </div>
            </CardContent>
          </Card>

          <Card
            className="fixed inset-0 z-50 max-w-2xl max-h-[80vh] overflow-y-auto mx-auto my-auto shadow-2xl"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => setClicked(false)}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {title}
                <Badge variant="secondary" className="cursor-pointer">
                  ✕
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative aspect-video">
                {!imageLoaded && !imageError && (
                  <Skeleton className="absolute inset-0 w-full h-full rounded-lg" />
                )}
                <Image
                  src={imgSrc}
                  alt={title}
                  fill={true}
                  className={`rounded-lg object-cover transition-opacity duration-300 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
                {imageError && (
                  <div className="absolute inset-0 bg-muted flex items-center justify-center rounded-lg">
                    <div className="text-center text-muted-foreground">
                      <div className="text-4xl mb-2">🖼️</div>
                      <p className="text-sm">Image not available</p>
                    </div>
                  </div>
                )}
              </div>
              <CardDescription className="text-base">
                {description}
              </CardDescription>
              <div className="flex justify-end">
                <Button asChild>
                  <Link href={link}>Learn More</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setClicked(false)}
          />
        </>
      )}
    </>
  );
}
