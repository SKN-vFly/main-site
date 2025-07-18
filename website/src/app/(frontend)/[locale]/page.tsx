'use client'

import { useTranslations } from 'next-intl'
import { MediaHeader } from '@/components/MediaHeader'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MicroscopeIcon, PartyPopperIcon, RocketIcon } from 'lucide-react'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function Landing() {
  const t = useTranslations('MainPage')
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDarkMode = mounted ? resolvedTheme === 'dark' : false

  return (
    <div className="w-full">
      <section className="min-h-[90vh] flex flex-col items-center justify-center text-center space-y-8 px-4 mb-10">
        <MediaHeader text={t('title')} />
        <div className="max-w-4xl mx-auto space-y-6 mt-10">
          <h2 className="text-2xl md:text-3xl text-muted-foreground font-light italic">
            {t('subtitle')}
          </h2>
          <Button size="lg" asChild>
            <a
              href={process.env.NEXT_PUBLIC_DISCORD_INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('join')}
            </a>
          </Button>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 space-y-12">
        <div className="text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">{t('whoWeAre')}</h2>
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-muted-foreground leading-relaxed text-justify">
            <p>{t('aboutDescription1')}</p>
            <p>{t('aboutDescription2')}</p>
            <p>{t('aboutDescription3')}</p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 space-y-12">
        <div className="text-center space-y-4">
          <h3 className="text-3xl md:text-4xl font-bold">{t('ourFoundation')}</h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('pillarsDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-justify break-words hyphens-auto">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MicroscopeIcon />
                <span>{t('research')}</span>
              </CardTitle>
              <CardDescription>{t('researchSubtitle')}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t('researchDescription')}</p>
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <RocketIcon />
                <span>{t('development')}</span>
              </CardTitle>
              <CardDescription>{t('developmentSubtitle')}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t('developmentDescription')}</p>
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PartyPopperIcon />
                <span>{t('entertainment')}</span>
              </CardTitle>
              <CardDescription>{t('entertainmentSubtitle')}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t('entertainmentDescription')}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <Card className="max-w-3xl mx-auto border-2 border-primary/20 shadow-xl">
          <CardHeader className="text-center space-y-4">
            <CardTitle className="text-2xl md:text-3xl">{t('startProject')}</CardTitle>
            <CardDescription className="text-lg">{t('contactUs')}</CardDescription>
          </CardHeader>
          <CardContent className="text-center pb-8">
            <Image
              src={
                mounted
                  ? isDarkMode
                    ? '/invite_vfly.png'
                    : '/invite_vfly_black.png'
                  : '/invite_vfly_black.png'
              }
              alt="Discord QR Code"
              width={350}
              height={350}
              className="mx-auto mb-6"
            />

            <Button size="lg" className="text-lg px-8 py-3" asChild>
              <a
                href={process.env.NEXT_PUBLIC_DISCORD_INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('join')}
              </a>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
