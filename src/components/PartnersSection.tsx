import { motion } from "framer-motion";
import { useLang } from "@/lib/language-context";
import { translations, t } from "@/lib/translations";
import { usePartners } from "@/hooks/usePartners";

export default function PartnersSection() {
  const { lang } = useLang();
  const { partners, loading } = usePartners(true);

  if (loading || partners.length === 0) return null;

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
          <h2 className="text-3xl lg:text-4xl font-bold mb-3">{t(translations.partners.title, lang)}</h2>
          <div className="h-1 w-16 gradient-line rounded-full mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">{t(translations.partners.subtitle, lang)}</p>
        </motion.div>
      </div>

      {/* Seamless marquee - no borders, standardized sizes */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex animate-marquee items-center">
          {doubled.map((partner, i) => (
            <div key={`${partner.id}-${i}`} className="flex-shrink-0 mx-8 w-48 h-24 flex items-center justify-center">
              {partner.logo_url ? (
                <img
                  src={partner.logo_url}
                  className="max-w-full max-h-full object-contain"
                  alt={lang === "mn" ? partner.name_mn : partner.name_en}
                />
              ) : (
                <span className="text-xs font-semibold text-muted-foreground text-center">
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
