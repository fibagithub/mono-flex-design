import { motion } from "framer-motion";
import { useLang } from "@/lib/language-context";
import { translations, t } from "@/lib/translations";
import logoFull from "@/assets/logo-full.png";

export default function PaymentGatewaySection() {
  const { lang } = useLang();

  return (
    <section id="payment" className="py-20 lg:py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 to-background" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-8"
          >
            <img src={logoFull} alt="NEGDi Processing Center" className="max-w-md lg:max-w-lg w-full mx-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-lg lg:text-xl font-semibold text-foreground mb-2">
              {t({ mn: "Бизнесийн өсөлтийн боломжийг бүтээгч", en: "The enabler of business growth" }, lang)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-8"
          >
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm uppercase tracking-wider hover:bg-accent transition-colors shadow-lg shadow-primary/20"
            >
              {t(translations.nav.contact, lang)}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
