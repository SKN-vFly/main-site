import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export function Footer() {
  const t = useTranslations("Components.Footer");
  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">vFly</h3>
            <p className="text-sm text-muted-foreground">
              SKN vFly - Studenckie Koło Naukowe zajmujące się projektami
              lotniczymi i symulacjami.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Nawigacja</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("projects")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Społeczność</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://discord.gg/57huavgd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Discord
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Dołącz do nas</h4>
            <p className="text-sm text-muted-foreground">
              Zainteresowany naszymi projektami? Dołącz do naszej społeczności!
            </p>
            <Button size="sm" asChild>
              <a
                href="https://discord.gg/57huavgd"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("join")}
              </a>
            </Button>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2024 SKN vFly. Wszelkie prawa zastrzeżone.
          </p>
          <div className="flex space-x-4 text-sm text-muted-foreground">
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors"
            >
              Polityka prywatności
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors"
            >
              Regulamin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
