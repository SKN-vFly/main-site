'use client'
import React, { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/routing'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet'
import { ExternalLink, Globe, Menu, X } from 'lucide-react'
import { ThemeSwitcher } from './ThemeSwitcher'
import { Separator } from './ui/separator'

const Navbar = () => {
  const t = useTranslations('Components.Navbar')
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Helper function to check if a path is active
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/' || pathname === '/en' || pathname === '/pl'
    }
    return pathname.includes(path)
  }

  return (
    <>
      <nav className="p-4 border-b border-border backdrop-blur-sm bg-background/80 fixed w-full z-50 top-0">
        <div className="flex items-center mx-auto">
          {/* Logo - Left side */}
          <div className="flex items-center flex-1">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 relative">
                <Image src="/logo.svg" alt="Logo vFly" fill={true} className="object-contain" />
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
                        isActive('/') ? 'bg-accent text-accent-foreground' : 'bg-background'
                      }`}
                    >
                      {t('home')}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/projects"
                      className={`group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                        isActive('/projects') ? 'bg-accent text-accent-foreground' : 'bg-background'
                      }`}
                    >
                      {t('projects')}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/contact"
                      className={`group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                        isActive('/contact') ? 'bg-accent text-accent-foreground' : 'bg-background'
                      }`}
                    >
                      {t('contact')}
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
                {t('join')}
              </a>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden hover:bg-accent/50 transition-colors"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[340px] sm:w-[400px] p-0 border-l-2 border-border/20 [&>button]:hidden"
              >
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="px-6 py-4 border-b border-border/10 bg-muted/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 relative">
                          <Image
                            src="/logo.svg"
                            alt="Logo vFly"
                            fill={true}
                            className="object-contain"
                          />
                        </div>
                        <SheetTitle className="font-bold text-lg">vFly</SheetTitle>
                      </div>
                      <SheetClose asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 hover:bg-accent/50 transition-colors"
                        >
                          <X className="h-6 w-6" />
                        </Button>
                      </SheetClose>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <div className="flex-1 px-6 py-6">
                    <nav className="space-y-2">
                      <Link
                        href="/"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`group flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                          isActive('/')
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'hover:bg-accent hover:text-accent-foreground active:scale-95'
                        }`}
                      >
                        {t('home')}
                      </Link>
                      <Link
                        href="/projects"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`group flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                          isActive('/projects')
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'hover:bg-accent hover:text-accent-foreground active:scale-95'
                        }`}
                      >
                        {t('projects')}
                      </Link>
                      <Link
                        href="/contact"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`group flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                          isActive('/contact')
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'hover:bg-accent hover:text-accent-foreground active:scale-95'
                        }`}
                      >
                        {t('contact')}
                      </Link>
                      <a
                        href={process.env.NEXT_PUBLIC_DISCORD_INVITE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex justify-between items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200"
                      >
                        <span>{t('join')}</span>
                        <ExternalLink className="ml-2 w-4 h-4" />
                      </a>
                    </nav>

                    <Separator className="my-8" />

                    {/* Settings Section */}
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-muted/30">
                          <span className="text-sm font-medium">Theme</span>
                          <ThemeSwitcher />
                        </div>
                        <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-muted/30">
                          <span className="text-sm font-medium">Language</span>
                          <LangSwitcher />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
      <div className="h-16" /> {/* Spacer for fixed navbar */}
    </>
  )
}

function LangSwitcher() {
  const url = usePathname()
  const currentLocale = useLocale()

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
            href={`/${url.split('/').slice(2).join('/')}`}
            locale="en"
            className={`flex items-center space-x-2 ${
              currentLocale === 'en' ? 'bg-accent text-accent-foreground' : ''
            }`}
          >
            <span className="text-lg">🇺🇸</span>
            <span>English</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={`/${url.split('/').slice(2).join('/')}`}
            locale="pl"
            className={`flex items-center space-x-2 ${
              currentLocale === 'pl' ? 'bg-accent text-accent-foreground' : ''
            }`}
          >
            <span className="text-lg">🇵🇱</span>
            <span>Polski</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Navbar
