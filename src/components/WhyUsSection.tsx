import { motion } from "framer-motion";
import { TrendingUp, Clock, Shield, Headphones } from "lucide-react";
import { useLang } from "@/lib/language-context";
import { translations, t } from "@/lib/translations";

const stats = [
  {
    icon: TrendingUp,
    value: "99.9%",
    label: { mn: "Системийн найдвартай ажиллагаа", en: "System reliability" },
  },
  {
    icon: Clock,
    value: "24/7",
    label: { mn: "Тасралтгүй мониторинг & дэмжлэг", en: "Continuous monitoring & support" },
  },
  {
    icon: Shield,
    value: "PCI DSS",
    label: { mn: "Олон улсын аюулгүй байдлын стандарт", en: "International security standard" },
  },
  {
    icon: Headphones,
    value: "10+",
    label: { mn: "Жилийн мэргэжлийн туршлага", en: "Years of professional experience" },
  },
];

export default function WhyUsSection() {
  const { lang } = useLang();

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(347,30%,12%)] via-[hsl(0,0%,8%)] to-[hsl(347,20%,10%)]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 text-primary text-xs font-semibold tracking-[0.15em] uppercase mb-5">
            {t({ mn: "ЯАГААД БИД?", en: "WHY US?" }, lang)}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {t({ mn: "Итгэлтэй", en: "Trusted" }, lang)}{" "}
            <span className="gradient-text">{t({ mn: "түнш", en: "partner" }, lang)}</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm leading-relaxed">
            {t(
              {
                mn: "Банк, санхүүгийн байгууллага, аж ахуйн нэгжүүдэд итгэлтэй, мэргэжлийн түвшний процессингийн үйлчилгээг санал болгож байна.",
                en: "We offer trusted, professional-level processing services to banks, financial institutions, and businesses.",
              },
              lang
            )}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 text-center hover:border-primary/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-white mb-2">{stat.value}</div>
                <p className="text-xs text-white/50 leading-relaxed">{t(stat.label, lang)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
