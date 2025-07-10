import { useTranslations } from "next-intl";
import { PersonalCard } from "@/components/PersonalCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Contact() {
  const t = useTranslations("ContactPage");
  const personalCardT = useTranslations("Components.PersonalCard");
  const personalCardTranslations = {
    name: personalCardT("imageAlt"), // Using imageAlt for now
    email: personalCardT("email"),
    role: "", // Not used in the component currently
  };

  return (
    <div className="container mx-auto px-4 py-12 space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          {t("joinHeader")}
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Poznaj ludzi, którzy napędzają nasze projekty i sprawiają, że vFly
          leci do przodu.
        </p>
      </div>

      {/* Leaders Section */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">{t("leaders")}</h2>
          <p className="text-lg text-muted-foreground">
            Liderzy naszej organizacji
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          <div className="aspect-[3/4] group">
            <PersonalCard
              name="mgr inż. Piotr Bartosz"
              email="piotbar578@student.polsl.pl"
              imageSrc="/placeholder.jpg"
              role={t("chairman")}
              translations={personalCardTranslations}
            />
          </div>
          <div className="aspect-[3/4] group">
            <PersonalCard
              name="dr inż. Dariusz Myszor"
              email="dariusz.myszor@polsl.pl"
              imageSrc="/placeholder.jpg"
              role={t("supervisor")}
              translations={personalCardTranslations}
            />
          </div>
        </div>
      </section>

      <Separator className="max-w-4xl mx-auto" />

      {/* Section Leaders */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">{t("sectLeads")}</h2>
          <p className="text-lg text-muted-foreground">
            Koordynatorzy naszych sekcji
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 max-w-7xl mx-auto">
          <div className="aspect-[3/4] group">
            <PersonalCard
              name="Jakub Wieczorek"
              email="jw306100@student.polsl.pl"
              imageSrc="/placeholder.jpg"
              role={t("infraCoordinator")}
              translations={personalCardTranslations}
            />
          </div>
          <div className="aspect-[3/4] group">
            <PersonalCard
              name="Natalia Koim"
              email="natakoi272@student.polsl.pl"
              imageSrc="/placeholder.jpg"
              role={t("cooperationCoordinator")}
              translations={personalCardTranslations}
            />
          </div>
          <div className="aspect-[3/4] group">
            <PersonalCard
              name="Michał Czyż"
              email="mc305963@student.polsl.pl"
              imageSrc="/placeholder.jpg"
              role={t("organizationCoordinator")}
              translations={personalCardTranslations}
            />
          </div>
          <div className="aspect-[3/4] group">
            <PersonalCard
              name="Maria Ochman"
              email="mo306378@student.polsl.pl"
              imageSrc="/placeholder.jpg"
              role={t("projectsCoordinator")}
              translations={personalCardTranslations}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-8">
        <Card className="max-w-3xl mx-auto border-2 border-primary/20 shadow-xl">
          <CardHeader className="space-y-4">
            <CardTitle className="text-2xl md:text-3xl">
              Gotowy na dołączenie?
            </CardTitle>
            <CardDescription className="text-lg">
              Jesteś pasjonatem lotnictwa i technologii? Dołącz do naszego
              zespołu i twórz przyszłość razem z nami!
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-8">
            <Button size="lg" className="text-lg px-8 py-3" asChild>
              <a
                href="https://discord.gg/57huavgd"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("join")}
              </a>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

// export function generateStaticParams() {
//   // Generate static paths for all locales
//   const locales = localeArray;
//   const paths = locales.map((locale) => ({
//     params: { locale },
//   }));
//   return paths;
// }
