import { motion } from "framer-motion";
import { CreditCard, Store, ShieldCheck, Heart, ArrowRight } from "lucide-react";
import { useLang } from "@/lib/language-context";
import { translations, t } from "@/lib/translations";

const icons = [CreditCard, Store, ShieldCheck, Heart];

export default function ServicesSection() {
  const { lang } = useLang();

  return (
    <section id="services" className="py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {t(translations.services.title, lang)}
          </h2>
          <div className="h-1 w-16 gradient-line rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground max-w-md mx-auto">
            {t(translations.services.subtitle, lang)}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {translations.services.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group glass-card rounded-xl p-6 card-hover border border-transparent hover:border-primary/20"
              >
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-3">{t(item.title, lang)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {t(item.description, lang)}
                </p>
                <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent transition-colors">
                  {t(translations.services.learnMore, lang)}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
