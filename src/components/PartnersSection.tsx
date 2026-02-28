import { motion } from "framer-motion";
import { useLang } from "@/lib/language-context";
import { translations, t } from "@/lib/translations";
import { usePartners } from "@/hooks/usePartners";

export default function PartnersSection() {
  const { lang } = useLang();
  const { partners, loading } = usePartners(true);

  if (loading || partners.length === 0) return null;

  // Duplicate for seamless marquee
  const doubled = [...partners, ...partners];

  return (
    <section id="partners" className="py-16 lg:py-20 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-3">
            {t(translations.partners.title, lang)}
          </h2>
          <div className="h-1 w-16 gradient-line rounded-full mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">
            {t(translations.partners.subtitle, lang)}
          </p>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative">
        <div className="flex animate-marquee">
          {doubled.map((partner, i) => (
            <div
              key={`${partner.id}-${i}`}
              className="flex-shrink-0 mx-6 w-32 h-20 rounded-xl bg-background border border-border flex items-center justify-center p-3 hover:shadow-lg transition-shadow"
            >
              {partner.logo_url ? (
                <img src={partner.logo_url} className="max-w-full max-h-full object-contain" alt={lang === "mn" ? partner.name_mn : partner.name_en} />
              ) : (
                <span className="text-xs font-medium text-muted-foreground text-center">
                  {lang === "mn" ? partner.name_mn : partner.name_en}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
