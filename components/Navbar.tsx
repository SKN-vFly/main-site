"use client";
import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Globe, Menu } from "lucide-react";
import { ThemeSwitcher } from "./theme-switcher";

const Navbar = () => {
  const t = useTranslations("Components.Navbar");
  const pathname = usePathname();

  // Helper function to check if a path is active
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/" || pathname === "/en" || pathname === "/pl";
    }
    return pathname.includes(path);
  };

  return (
    <>
      <nav className="p-4 border-b border-border backdrop-blur-sm bg-background/80 fixed w-full z-50 top-0">
        <div className="flex items-center mx-auto">
          {/* Logo - Left side */}
          <div className="flex items-center flex-1">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 relative">
                <Image
                  src="/logo.svg"
                  alt="Logo vFly"
                  fill={true}
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-lg">vFly</span>
            </Link>
          </div>

          {/* Navigation - Center */}
          <div className="flex justify-center flex-1">
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/"
                      className={`group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                        isActive("/")
                          ? "bg-accent text-accent-foreground"
                          : "bg-background"
                      }`}
                    >
                      {t("home")}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/projects"
                      className={`group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                        isActive("/projects")
                          ? "bg-accent text-accent-foreground"
                          : "bg-background"
                      }`}
                    >
                      {t("projects")}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/contact"
                      className={`group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                        isActive("/contact")
                          ? "bg-accent text-accent-foreground"
                          : "bg-background"
                      }`}
                    >
                      {t("contact")}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Actions - Right side */}
          <div className="flex items-center justify-end space-x-2 flex-1">
            <div className="hidden sm:block">
              <ThemeSwitcher />
            </div>
            <div className="hidden sm:block">
              <LangSwitcher />
            </div>
            <Button asChild className="hidden sm:flex">
              <a
                href={process.env.NEXT_PUBLIC_DISCORD_INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("join")}
              </a>
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-4 mt-8">
                  <Link
                    href="/"
                    className={`flex items-center space-x-2 text-lg font-medium transition-colors ${
                      isActive("/")
                        ? "text-primary font-semibold"
                        : "hover:text-primary"
                    }`}
                  >
                    {t("home")}
                  </Link>
                  <Link
                    href="/projects"
                    className={`flex items-center space-x-2 text-lg font-medium transition-colors ${
                      isActive("/projects")
                        ? "text-primary font-semibold"
                        : "hover:text-primary"
                    }`}
                  >
                    {t("projects")}
                  </Link>
                  <Link
                    href="/contact"
                    className={`flex items-center space-x-2 text-lg font-medium transition-colors ${
                      isActive("/contact")
                        ? "text-primary font-semibold"
                        : "hover:text-primary"
                    }`}
                  >
                    {t("contact")}
                  </Link>
                  <div className="border-t pt-4 mt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Theme</span>
                      <ThemeSwitcher />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Language</span>
                      <LangSwitcher />
                    </div>
                    <Button asChild className="w-full">
                      <a
                        href={process.env.NEXT_PUBLIC_DISCORD_INVITE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t("join")}
                      </a>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
      <div className="h-16" /> {/* Spacer for fixed navbar */}
    </>
  );
};

function LangSwitcher() {
  const url = usePathname();
  const currentLocale = useLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link
            href={`/${url.split("/").slice(2).join("/")}`}
            locale="en"
            className={`flex items-center space-x-2 ${
              currentLocale === "en" ? "bg-accent text-accent-foreground" : ""
            }`}
          >
            <span className="text-lg">🇺🇸</span>
            <span>English</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={`/${url.split("/").slice(2).join("/")}`}
            locale="pl"
            className={`flex items-center space-x-2 ${
              currentLocale === "pl" ? "bg-accent text-accent-foreground" : ""
            }`}
          >
            <span className="text-lg">🇵🇱</span>
            <span>Polski</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Navbar;
