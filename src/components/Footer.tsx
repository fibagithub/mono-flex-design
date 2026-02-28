import { useLang } from "@/lib/language-context";
import { translations, t } from "@/lib/translations";

export default function Footer() {
  const { lang } = useLang();

  return (
    <footer className="border-t border-border py-8">
      <div className="container mx-auto px-4 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-bold text-lg gradient-text">NEGDi</span>
        <p className="text-xs text-muted-foreground">
          {t(translations.footer.rights, lang)}
        </p>
      </div>
    </footer>
  );
}
