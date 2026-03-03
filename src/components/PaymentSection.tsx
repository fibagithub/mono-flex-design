import { motion } from "framer-motion";
import { ArrowRight, CreditCard, Receipt, RefreshCw, Shield, Zap, Globe, Link as LinkIcon } from "lucide-react";
import { useLang } from "@/lib/language-context";
import { translations, t } from "@/lib/translations";

const content = {
  title: { mn: "Төлбөрийн гарц", en: "Payment Gateway" },
  intro: {
    mn: "Манай аюулгүй, уян хатан төлбөрийн гарц нь бизнесүүдэд онлайн төлбөрийг карт, QPay болон бусад орчин үеийн төлбөрийн аргуудаар хүлээн авах боломжийг хялбар, найдвартайгаар олгодог. Платформ нь:
•	API интеграцын уян хатан холболт
•	Динамик токенжуулалт (tokenization) – картын мэдээллийг аюулгүй хадгалах
•	3D Secure v2.2 – өндөр түвшний баталгаажуулалт
•	Бодит цагийн гүйлгээний хяналт ба мониторинг
гэх мэт дэвшилтэт технологиудыг дэмждэг тул бизнес тань хурдан, аюулгүй, хэрэглэгчдэд ээлтэй туршлага бий болгоно.
Карт эзэмшигч нэг удаа картын мэдээллээ токенжуулсны дараа дараагийн бүх төлбөрүүд карт дахин оруулахгүйгээр бүрэн автомат хийгдэх боломжийг олгодог (one-click, recurring billing).
Мөн PayLink (www.paylink.mn) үйлчилгээгээр дамжуулан бизнесүүдэд URL линк, SMS, эсвэл имэйл-ээр аюулгүй төлбөрийн нэхэмжлэх илгээж хялбар аргаар төлбөр цуглуулахад төгс шийдэл юм.
",
    en: "A secure and flexible payment gateway enabling businesses to accept online payments via cards, QPay, and local methods. The platform supports seamless API integration, dynamic tokenization, 3D Secure v2.2, and real-time transaction monitoring. Once a cardholder tokenizes their card, subsequent payments are fully automated without re-entering card details. Supports single API connection for multiple payment instruments. Local methods include SocialPay, MonPay, and others. International methods: Visa, Mastercard, UnionPay, WeChat Pay, Alipay. NEGDi also powers PayLink (www.paylink.mn) — a payment link and collection service for businesses to send secure payment requests via URL, SMS, or email.",
  },
  platformFeatures: [
    { mn: "API интеграцын уян хатан холболт", en: "Seamless API integration", icon: "Zap" },
    { mn: "Динамик токенжуулалт – картын мэдээллийг аюулгүй хадгалах", en: "Dynamic tokenization", icon: "Shield" },
    { mn: "3D Secure v2.2 – өндөр түвшний баталгаажуулалт", en: "3D Secure v2.2 authentication", icon: "Globe" },
    { mn: "Бодит цагийн гүйлгээний хяналт ба мониторинг", en: "Real-time transaction monitoring", icon: "Zap" },
  ],
  platformOutro: {
    mn: "гэх мэт дэвшилтэт технологиудыг дэмждэг тул бизнес тань хурдан, аюулгүй, хэрэглэгчдэд ээлтэй туршлага бий болгоно.",
    en: "",
  },
  modesTitle: {
    mn: "Дэмжигдэх гол 3 төрлийн төлбөрийн горим:",
    en: "Three core payment modes:",
  },
  modes: [
    {
      title: { mn: "Худалдан авалтын төлбөрүүд", en: "Purchase payments" },
      desc: { mn: "цахим худалдаа, мобайл апп, онлайн дэлгүүр", en: "all types of e-commerce, mobile app, and online payments" },
      icon: CreditCard,
    },
    {
      title: { mn: "Шаардлагатай төлбөрүүд", en: "Requiring payments" },
      desc: {
        mn: "төрийн үйлчилгээ, цахилгаан, ус, дулаан, СӨХ, харилцаа холбоо, интернет, зээл, гишүүнчлэлийн төлбөр",
        en: "government services, utility bills, telecom, internet, loan repayments, membership fees",
      },
      icon: Receipt,
    },
    {
      title: { mn: "Давтамжтай / хуваарьт төлбөрүүд", en: "Recurring / scheduled payments" },
      desc: {
        mn: "захиалгын автомат төлбөр, хуваарьт төлбөр, санхүүгийн \"subscription\"",
        en: "automatic billing for subscriptions, installments, and financial services",
      },
      icon: RefreshCw,
    },
  ],
  tokenNote: {
    mn: "Карт эзэмшигч нэг удаа картын мэдээллээ токенжуулсны дараа дараагийн бүх төлбөрүүд карт дахин оруулахгүйгээр бүрэн автомат хийгдэнэ (one-click, recurring billing).",
    en: "Once a cardholder tokenizes their card, subsequent payments are fully automated without re-entering card details. Supports single API connection for multiple payment instruments.",
  },
  localMethods: {
    mn: "",
    en: "Local methods include SocialPay, MonPay, and others. International methods: Visa, Mastercard, UnionPay, WeChat Pay, Alipay.",
  },
  paylink: {
    mn: "Мөн PayLink (www.paylink.mn) үйлчилгээгээр дамжуулан бизнесүүдэд URL линк, SMS, эсвэл имэйл-ээр аюулгүй төлбөрийн нэхэмжлэх илгээж хялбар аргаар төлбөр цуглуулахад төгс шийдэл юм.",
    en: "NEGDi also powers PayLink (www.paylink.mn) — a payment link and collection service for businesses to send secure payment requests via URL, SMS, or email.",
  },
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap, Shield, Globe,
};

export default function PaymentSection() {
  const { lang } = useLang();

  return (
    <section id="payment" className="py-16 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 to-background" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-3 text-foreground">
            {t(content.title, lang)}
          </h2>
          <div className="h-1 w-16 gradient-line rounded-full mx-auto mb-3" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm leading-relaxed">
            {t(content.intro, lang)}
          </p>
        </motion.div>

        {/* Platform features grid (MN: bullet list below intro, EN: included in intro) */}
        {lang === "mn" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto"
          >
            {content.platformFeatures.map((feat, i) => {
              const Icon = iconMap[feat.icon] || Zap;
              return (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-[20px] bg-card border border-border/50"
                  style={{ boxShadow: "var(--shadow-card)" }}
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm text-foreground font-medium leading-snug">
                    {t(feat, lang)}
                  </span>
                </div>
              );
            })}
          </motion.div>
        )}

        {lang === "mn" && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-sm text-center max-w-2xl mx-auto mb-12"
          >
            {t(content.platformOutro, lang)}
          </motion.p>
        )}

        {/* Payment modes */}
        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-lg font-bold text-center mb-8"
        >
          {t(content.modesTitle, lang)}
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
          {content.modes.map((mode, i) => {
            const Icon = mode.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-[20px] bg-card p-6 border border-border/50 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_60px_-12px_hsl(var(--primary)/0.15)]"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-bold text-base text-foreground mb-2">
                  {t(mode.title, lang)}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(mode.desc, lang)}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto space-y-4"
        >
          <div className="rounded-[20px] bg-card border border-border/50 p-6" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Shield className="w-4 h-4 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t(content.tokenNote, lang)}
              </p>
            </div>
          </div>

          {lang === "en" && (
            <p className="text-sm text-muted-foreground leading-relaxed text-center px-4">
              {t(content.localMethods, lang)}
            </p>
          )}

          <div className="rounded-[20px] bg-card border border-border/50 p-6" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <LinkIcon className="w-4 h-4 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t(content.paylink, lang)}
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <button
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm uppercase tracking-wider hover:bg-accent transition-colors shadow-lg shadow-primary/20"
          >
            {t(translations.paymentGateway.cta, lang)}
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
