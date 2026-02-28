import { motion } from "framer-motion";
import { Eye, Target, Gem } from "lucide-react";
import { useLang } from "@/lib/language-context";
import { translations, t } from "@/lib/translations";

const icons = [Eye, Target, Gem];

export default function AboutSection() {
  const { lang } = useLang();

  return (
    <section id="about" className="py-16 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-3">
            {t(translations.about.title, lang)}
          </h2>
          <div className="h-1 w-16 gradient-line rounded-full mx-auto mb-3" />
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            {t(translations.about.subtitle, lang)}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {translations.about.blocks.map((block, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass-card rounded-xl p-6 text-center card-hover"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">{t(block.title, lang)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(block.description, lang)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
