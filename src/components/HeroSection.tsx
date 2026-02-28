import { motion } from "framer-motion";
import { useLang } from "@/lib/language-context";
import { translations, t } from "@/lib/translations";

export default function HeroSection() {
  const { lang } = useLang();

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(347 68% 44%) 1px, transparent 1px), linear-gradient(90deg, hsl(347 68% 44%) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4">
              {t(translations.hero.tagline, lang)}
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-5"
          >
            <span className="gradient-text">{t(translations.hero.headline, lang)}</span>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 w-24 gradient-line rounded-full mx-auto mb-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-base text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed"
          >
            {t(translations.hero.subtitle, lang)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <button
              onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm uppercase tracking-wider hover:bg-accent transition-colors shadow-lg shadow-primary/20"
            >
              {t(translations.hero.cta1, lang)}
            </button>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3 rounded-lg border border-primary text-primary font-medium text-sm uppercase tracking-wider hover:bg-secondary transition-colors"
            >
              {t(translations.hero.cta2, lang)}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
