import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { useLang } from "@/lib/language-context";
import { translations, t } from "@/lib/translations";

export default function PaymentSection() {
  const { lang } = useLang();

  return (
    <section id="payment" className="py-16 lg:py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 to-background" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="h-1 w-12 gradient-line rounded-full mb-5" />
            
            <h2 className="text-3xl lg:text-4xl font-bold mb-5">
              {t(translations.paymentGateway.title, lang)}
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
              {t(translations.paymentGateway.description, lang)}
            </p>

            <ul className="space-y-2.5 mb-6">
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
                  <span className="text-sm font-medium">
                    {t(feat, lang)}
                  </span>
                </motion.li>
              ))}
            </ul>

            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm uppercase tracking-wider hover:bg-accent transition-colors shadow-lg shadow-primary/20"
            >
              {t(translations.paymentGateway.cta, lang)}
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-md">
              <div className="glass-card rounded-2xl p-8 border border-border">
                
                {/* CARD */}
                <div className="w-full aspect-[1.6/1] rounded-xl bg-gradient-to-br from-primary to-accent p-5 text-primary-foreground mb-6 shadow-xl shadow-primary/20">
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-10 h-7 rounded bg-primary-foreground/30" />
                    <svg
                      className="w-8 h-8 opacity-80"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10S2 17.52 2 12z" />
                      <path d="M8 12c0-5.52 1.79-10 4-10s4 4.48 4 10-1.79 10-4 10-4-4.48-4-10z" />
                      <path d="M2 12h20" />
                    </svg>
                  </div>

                  <div className="text-sm tracking-[0.25em] font-mono mb-4 opacity-90">
                    •••• •••• •••• 4289
                  </div>

                  <div className="flex justify-between items-end text-xs opacity-70">
                    <span>NEGDI PAYMENT</span>
                    <span>12/28</span>
                  </div>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: lang === "mn" ? "Гүйлгээ" : "Transactions", value: "12.5K" },
                    { label: lang === "mn" ? "Амжилт" : "Success", value: "99.8%" },
                    { label: lang === "mn" ? "Хурд" : "Speed", value: "<1s" },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="text-center p-3 rounded-lg bg-secondary"
                    >
                      <div className="text-lg font-bold text-primary">
                        {stat.value}
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
