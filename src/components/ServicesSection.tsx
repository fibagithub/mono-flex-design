import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Store, ShieldCheck, Heart, Cpu, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { useLang } from "@/lib/language-context";
import { translations, t } from "@/lib/translations";
import { useServices } from "@/hooks/useServices";

const iconMap: Record<string, typeof CreditCard> = {
  CreditCard, Store, ShieldCheck, Heart, Cpu,
};
const defaultIcons = [CreditCard, Cpu, Store, ShieldCheck, Heart];

export default function ServicesSection() {
  const { lang } = useLang();
  const { services, loading } = useServices(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  if (loading) return null;

  return (
    <section id="services" className="py-16 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-3">
            {t(translations.services.title, lang)}
          </h2>
          <div className="h-1 w-16 gradient-line rounded-full mx-auto mb-3" />
          <p className="text-muted-foreground max-w-md mx-auto text-sm">
            {t(translations.services.subtitle, lang)}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const Icon = defaultIcons[i % defaultIcons.length];
            const desc = lang === "mn" ? service.description_mn : service.description_en;
            const isExpanded = expanded === service.id;
            const lines = desc.split(/[.။]/).filter(Boolean);
            const preview = lines.slice(0, 2).join(". ") + (lines.length > 2 ? "." : "");

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group glass-card rounded-xl p-5 card-hover border border-transparent hover:border-primary/20"
              >
                <div className="w-11 h-11 rounded-lg bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                  {service.icon_url ? (
                    <img src={service.icon_url} className="w-5 h-5 object-contain" alt="" />
                  ) : (
                    <Icon className="w-5 h-5 text-primary" />
                  )}
                </div>
                <h3 className="font-bold text-base mb-2">{lang === "mn" ? service.name_mn : service.name_en}</h3>

                <div className="text-sm text-muted-foreground leading-relaxed mb-3">
                  <AnimatePresence mode="wait">
                    {isExpanded ? (
                      <motion.p key="full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        {desc}
                      </motion.p>
                    ) : (
                      <motion.p key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        {preview}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  onClick={() => setExpanded(isExpanded ? null : service.id)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent transition-colors"
                >
                  {isExpanded ? t(translations.services.collapse, lang) : t(translations.services.learnMore, lang)}
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
