"use client";
import { useEffect, useState, useContext } from "react";
import { Link } from "@/i18n/routing";
import { ProjectClickedContext } from "./ProjectDisplayWrapper";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ProjectComponent(props: {
  title: string;
  description: string;
  imgSrc: string;
  link: string;
  learnMore: string;
}) {
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);
  const { title, description, link, learnMore } = props;
  const { allowInteraction, setAllowInteraction } = useContext(
    ProjectClickedContext
  );

  useEffect(() => {
    setAllowInteraction(!open);
  }, [open, setAllowInteraction]);

  const handleOpenChange = (isOpen: boolean) => {
    if (allowInteraction || !isOpen) {
      setOpen(isOpen);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Card
          className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
            hover ? "scale-105" : ""
          } ${!allowInteraction ? "opacity-50 cursor-not-allowed" : ""}`}
          onMouseEnter={() => allowInteraction && setHover(true)}
          onMouseLeave={() => allowInteraction && setHover(false)}
        >
          <CardContent className="p-0">
            <div className="relative aspect-square">
              <Skeleton className="w-full h-full rounded-t-lg" />
            </div>
            <div className="p-4">
              <CardTitle className="text-center">{title}</CardTitle>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative aspect-video">
            <Skeleton className="w-full h-full rounded-lg" />
          </div>
          <DialogDescription className="text-base">
            {description}
          </DialogDescription>
          <div className="flex justify-end">
            <Button asChild>
              <Link href={link}>{learnMore}</Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
