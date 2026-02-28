import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { useLang } from "@/lib/language-context";
import { translations, t } from "@/lib/translations";

export default function PaymentGatewaySection() {
  const { lang } = useLang();

  return (
    <section id="payment" className="py-24 lg:py-32 relative">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 to-background" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="h-1 w-12 gradient-line rounded-full mb-6" />
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              {t(translations.paymentGateway.title, lang)}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {t(translations.paymentGateway.description, lang)}
            </p>

            <ul className="space-y-3 mb-8">
              {translations.paymentGateway.features.map((feat, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{t(feat, lang)}</span>
                </motion.li>
              ))}
            </ul>

            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-accent transition-colors shadow-lg shadow-primary/20">
              {t(translations.paymentGateway.cta, lang)}
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Mock UI */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="glass-card rounded-2xl p-8 border border-border">
              {/* Mock dashboard */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-destructive/50" />
                <div className="w-3 h-3 rounded-full bg-accent/40" />
                <div className="w-3 h-3 rounded-full bg-primary/30" />
              </div>
              <div className="space-y-4">
                <div className="h-8 w-48 bg-secondary rounded-md" />
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="bg-secondary rounded-lg p-4">
                      <div className="h-3 w-12 bg-primary/20 rounded mb-2" />
                      <div className="h-6 w-16 bg-primary/10 rounded" />
                    </div>
                  ))}
                </div>
                <div className="h-32 bg-secondary rounded-lg relative overflow-hidden">
                  {/* Chart bars */}
                  <div className="absolute bottom-0 left-0 right-0 flex items-end justify-around h-24 px-4">
                    {[40, 65, 50, 80, 60, 75, 90].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                        className="w-4 rounded-t gradient-line"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative glow */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
