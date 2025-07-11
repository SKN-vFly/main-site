"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  const { name, email, role } = params;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="cursor-pointer h-full w-full">
          <Card
            className="w-full h-full relative transition-all duration-300 hover:shadow-lg overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <CardContent className="p-0 h-full relative">
              <div className="w-full h-full relative">
                {/* Professional skeleton placeholder */}
                <Skeleton className="absolute inset-0 w-full h-full rounded-t-lg" />

                <div
                  className={`absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-4 text-white transition-opacity duration-300 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Avatar className="w-16 h-16 mb-3 border-2 border-white">
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">
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
            <AvatarFallback className="bg-primary text-primary-foreground">
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
