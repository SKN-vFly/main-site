import { useTranslations } from "next-intl";
import { MediaHeader } from "@/components/MediaHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MicroscopeIcon, PartyPopperIcon, RocketIcon } from "lucide-react";

export default function Landing() {
  const t = useTranslations("MainPage");
  return (
    <div className="w-full">
      <section className="min-h-[90vh] flex flex-col items-center justify-center text-center space-y-8 px-4">
        <MediaHeader text={t("title")} />
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl md:text-3xl text-muted-foreground font-light">
            {t("subtitle")}
          </h2>
          <Button size="lg" asChild>
            <a
              href="https://discord.gg/57huavgd"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("join")}
            </a>
          </Button>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 space-y-12">
        <div className="text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">{t("whoWeAre")}</h2>
          <div className="max-w-4xl mx-auto space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>{t("aboutDescription1")}</p>
            <p>{t("aboutDescription2")}</p>
            <p>{t("aboutDescription3")}</p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 space-y-12">
        <div className="text-center space-y-4">
          <Badge variant="outline" className="text-lg px-6 py-2">
            {t("threePillars")}
          </Badge>
          <h3 className="text-3xl md:text-4xl font-bold">
            {t("ourFoundation")}
          </h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t("pillarsDescription")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-justify break-words hyphens-auto">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MicroscopeIcon />
                <span>{t("research")}</span>
              </CardTitle>
              <CardDescription>{t("researchSubtitle")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("researchDescription")}
              </p>
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <RocketIcon />
                <span>{t("development")}</span>
              </CardTitle>
              <CardDescription>{t("developmentSubtitle")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("developmentDescription")}
              </p>
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PartyPopperIcon />
                <span>{t("entertainment")}</span>
              </CardTitle>
              <CardDescription>{t("entertainmentSubtitle")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("entertainmentDescription")}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <Card className="max-w-3xl mx-auto border-2 border-primary/20 shadow-xl">
          <CardHeader className="text-center space-y-4">
            <CardTitle className="text-2xl md:text-3xl">
              {t("startProject")}
            </CardTitle>
            <CardDescription className="text-lg">
              {t("contactUs")}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center pb-8">
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
