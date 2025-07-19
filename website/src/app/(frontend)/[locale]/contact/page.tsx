import { useTranslations } from 'next-intl'
import { PersonalCard } from '@/components/PersonalCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { MailIcon, MapPinIcon, Github, Facebook } from 'lucide-react'
import Image from 'next/image'

export default function Contact() {
  const t = useTranslations('ContactPage')
  const personalCardT = useTranslations('Components.PersonalCard')
  const personalCardTranslations = {
    name: personalCardT('imageAlt'), // Using imageAlt for now
    email: personalCardT('email'),
    role: '',
  }

  const leaders = [
    {
      name: 'mgr inż. Piotr Bartosz',
      email: 'piotbar578@student.polsl.pl',
      imageSrc: '/placeholder.jpg',
      role: t('chairman'),
    },
    {
      name: 'dr inż. Dariusz Myszor',
      email: 'dariusz.myszor@polsl.pl',
      imageSrc: '/placeholder.jpg',
      role: t('supervisor'),
    },
  ]

  const sectionLeads = [
    {
      name: 'Jakub Wieczorek',
      email: 'jw306100@student.polsl.pl',
      imageSrc: '/placeholder.jpg',
      role: t('infraCoordinator'),
    },
    {
      name: 'Natalia Koim',
      email: 'natakoi272@student.polsl.pl',
      imageSrc: '/placeholder.jpg',
      role: t('cooperationCoordinator'),
    },
    {
      name: 'Michał Czyż',
      email: 'mc305963@student.polsl.pl',
      imageSrc: '/placeholder.jpg',
      role: t('organizationCoordinator'),
    },
    {
      name: 'Maria Ochman',
      email: 'mo306378@student.polsl.pl',
      imageSrc: '/placeholder.jpg',
      role: t('projectsCoordinator'),
    },
    {
      name: 'Szymon Molenda',
      email: 'sm311405@student.polsl.pl',
      imageSrc: '/placeholder.jpg',
      role: t('katowiceCoordinator'),
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12 space-y-16">
      <div className="text-center space-y-6">
        <h1 className="text-3xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          {t('contactHeader')}
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {t('contactDescription')}
        </p>
      </div>

      <section className="space-y-6">
        <div className="grid gap-6 max-w-xl mx-auto">
          {/* Email Card */}
          <Card className="hover:shadow-lg  transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MailIcon className="w-5 h-5 text-primary" />
                {t('Meta.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Email Section */}
                <div className="text-center space-y-2">
                  <a
                    href="mailto:skn.vfly@polsl.pl"
                    className="inline-flex items-center gap-2 text-lg font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    <MailIcon className="w-5 h-5" />
                    skn.vfly@polsl.pl
                  </a>
                </div>

                {/* Social Media Section */}
                <div className="space-y-3">
                  <div className="flex justify-center gap-6">
                    <a
                      href={process.env.NEXT_PUBLIC_FACEBOOK_URL}
                      className="flex items-center gap-2 text-base text-muted-foreground hover:text-primary transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Facebook className="w-5 h-5" />
                      Facebook
                    </a>
                    <a
                      href={process.env.NEXT_PUBLIC_GITHUB_URL}
                      className="flex items-center gap-2 text-base text-muted-foreground hover:text-primary transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-5 h-5" />
                      GitHub
                    </a>
                    <a
                      href={process.env.NEXT_PUBLIC_DISCORD_INVITE_URL}
                      className="flex items-center gap-2 text-base text-muted-foreground hover:text-primary transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.174.372.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                      </svg>
                      Discord
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPinIcon className="w-5 h-5 text-primary" />
                {t('ourLocation')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Image
                  src="/aei.jpg"
                  alt="AEI Building"
                  width={400}
                  height={300}
                  className="w-full h-48 bg-muted rounded-lg object-cover"
                />

                <div className="text-center space-y-1">
                  <p className="font-medium">{t('faculty')}</p>
                  <p className="text-muted-foreground">{t('university')}</p>
                  <p className="text-muted-foreground">{t('location')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">{t('leaders')}</h2>
        </div>

        <p className=" text-center text-muted-foreground italic">{t('hoverNote')}</p>

        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {leaders.map((leader, index) => (
            <div key={index} className="aspect-[3/4] group">
              <PersonalCard
                name={leader.name}
                email={leader.email}
                imageSrc={leader.imageSrc}
                role={leader.role}
                translations={personalCardTranslations}
              />
            </div>
          ))}
        </div>
      </section>

      <Separator className="max-w-4xl mx-auto" />

      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">{t('sectLeads')}</h2>

          <p className=" text-center text-muted-foreground italic">{t('hoverNote')}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {sectionLeads.map((lead, index) => (
            <div
              key={index}
              className="last:md:col-span-2 md:h-117 lg:h-165 last:md:w-full last:md:flex last:md:justify-center"
            >
              <div className="aspect-[3/4] group">
                <PersonalCard
                  name={lead.name}
                  email={lead.email}
                  imageSrc={lead.imageSrc}
                  role={lead.role}
                  translations={personalCardTranslations}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-8">
        <Card className="max-w-xl mx-auto border-2 border-primary/20 shadow-xl">
          <CardHeader className="space-y-4">
            <CardTitle className="text-2xl md:text-3xl">{t('interestedInJoining')}</CardTitle>
            <CardDescription className="text-lg text-justify">
              {t('joinDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent>
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
