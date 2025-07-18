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
    role: "",
  };

  return (
    <div className="container mx-auto px-4 py-12 space-y-16">
      <div className="text-center space-y-6">
        <h1 className="text-3xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          {t("contactHeader")}
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {t("contactDescription")}
        </p>
      </div>

      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">{t("leaders")}</h2>
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

      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">{t("sectLeads")}</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
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
        <Card className="max-w-xl mx-auto border-2 border-primary/20 shadow-xl">
          <CardHeader className="space-y-4">
            <CardTitle className="text-2xl md:text-3xl">
              {t("interestedInJoining")}
            </CardTitle>
            <CardDescription className="text-lg text-justify">
              {t("joinDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-8">
            <Button size="lg" className="text-lg px-8 py-3" asChild>
              <a
                href={process.env.NEXT_PUBLIC_DISCORD_INVITE_URL}
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
