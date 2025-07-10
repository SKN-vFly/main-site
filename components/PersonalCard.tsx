"use client";
import Image from "next/image";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Mail } from "lucide-react";

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
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { name, email, role, imageSrc, translations } = params;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="cursor-pointer">
          <Card
            className="w-full h-full relative transition-all duration-300 hover:shadow-lg overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <CardContent className="p-0 h-full relative">
              <div className="w-full h-full relative">
                {!imageLoaded && !imageError && (
                  <Skeleton className="absolute inset-0 w-full h-full rounded-t-lg" />
                )}
                <Image
                  src={imageSrc}
                  alt={`${translations.name} ${name}`}
                  fill={true}
                  className={`object-cover transition-all duration-300 ${
                    isHovered ? "blur-sm brightness-75" : ""
                  } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
                {imageError && (
                  <div className="absolute inset-0 bg-muted flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <div className="text-4xl mb-2">👤</div>
                      <p className="text-sm">Image not available</p>
                    </div>
                  </div>
                )}
                <div
                  className={`absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-4 text-white transition-opacity duration-300 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Avatar className="w-16 h-16 mb-3 border-2 border-white">
                    <AvatarImage
                      src={imageLoaded && !imageError ? imageSrc : undefined}
                      alt={name}
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold text-center mb-2">{name}</h3>
                  <Badge variant="secondary" className="mb-3">
                    {role}
                  </Badge>
                  <div className="text-sm text-center">
                    <span className="text-gray-300 flex items-center justify-center gap-1">
                      <Mail className="h-3 w-3" />
                      {email}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex space-x-4">
          <Avatar>
            <AvatarImage
              src={imageLoaded && !imageError ? imageSrc : undefined}
              alt={name}
            />
            <AvatarFallback>
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{name}</h4>
            <p className="text-sm text-muted-foreground">{role}</p>
            <div className="flex items-center pt-2">
              <button
                onClick={() => window.open(`mailto:${email}`, "_blank")}
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
              >
                <Mail className="h-3 w-3" />
                {email}
              </button>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
