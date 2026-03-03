import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/language-context";
import { translations, t } from "@/lib/translations";

const content = {
  title: { mn: "Төлбөрийн гарц", en: "Payment Gateway" },
  intro: {
    mn: "Манай аюулгүй, уян хатан төлбөрийн гарц нь бизнесүүдэд онлайн төлбөрийг карт, QPay болон бусад орчин үеийн төлбөрийн аргуудаар хүлээн авах боломжийг хялбар, найдвартайгаар олгодог. Платформ нь:",
    en: "A secure and flexible payment gateway enabling businesses to accept online payments via cards, QPay, and local methods. The platform supports seamless API integration, dynamic tokenization, 3D Secure v2.2, and real-time transaction monitoring.",
  },
  platformFeatures: [
    { mn: "API интеграцын уян хатан холболт", en: "Seamless API integration" },
    { mn: "Динамик токенжуулалт (tokenization) – картын мэдээллийг аюулгүй хадгалах", en: "Dynamic tokenization" },
    { mn: "3D Secure v2.2 – өндөр түвшний баталгаажуулалт", en: "3D Secure v2.2" },
    { mn: "Бодит цагийн гүйлгээний хяналт ба мониторинг", en: "Real-time transaction monitoring" },
  ],
  platformOutro: {
    mn: "гэх мэт дэвшилтэт технологиудыг дэмждэг тул бизнес тань хурдан, аюулгүй, хэрэглэгчдэд ээлтэй туршлага бий болгоно.",
    en: "",
  },
  modesTitle: {
    mn: "Дэмжигдэх гол 3 төрлийн төлбөрийн горим:",
    en: "Supports three core payment modes:",
  },
  modes: [
    {
      title: { mn: "Худалдан авалтын төлбөрүүд", en: "Purchase payments" },
      desc: { mn: "цахим худалдаа, мобайл апп, онлайн дэлгүүр", en: "all types of e-commerce, mobile app, and online payments" },
    },
    {
      title: { mn: "Шаардлагатай төлбөрүүд", en: "Requiring payments" },
      desc: {
        mn: "төрийн үйлчилгээ, цахилгаан, ус, дулаан, орон сууцны СӨХ, харилцаа холбоо, интернет, зээлийн төлбөр, гишүүнчлэлийн төлбөр гэх мэт",
        en: "government services, utility bills (electricity, water, heat, HOA), telecom and internet subscriptions, loan repayments, membership fees",
      },
    },
    {
      title: { mn: "Давтамжтай / хуваарьт төлбөрүүд", en: "Recurring / scheduled payments" },
      desc: {
        mn: "захиалгын автомат төлбөр, хуваарьт төлбөр, санхүүгийн үйлчилгээний \"subscription\"",
        en: "automatic billing for subscriptions, installments, and financial services",
      },
    },
  ],
  tokenNote: {
    mn: "Карт эзэмшигч нэг удаа картын мэдээллээ токенжуулсны дараа дараагийн бүх төлбөрүүд карт дахин оруулахгүйгээр бүрэн автомат хийгдэх боломжийг олгодог (one-click, recurring billing).",
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

export default function PaymentSection() {
  const { lang } = useLang();

  return (
    <section id="payment" className="py-16 lg:py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 to-background" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="h-1 w-12 gradient-line rounded-full mb-5" />

          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            {t(content.title, lang)}
          </h2>

          <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
            {t(content.intro, lang)}
          </p>

          {/* Platform features - only show as list for MN */}
          {lang === "mn" && (
            <>
              <ul className="space-y-1.5 mb-3 ml-4">
                {content.platformFeatures.map((feat, i) => (
                  <li key={i} className="text-sm text-muted-foreground list-disc">
                    {t(feat, lang)}
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                {t(content.platformOutro, lang)}
              </p>
            </>
          )}

          {/* Payment modes */}
          <h3 className="text-lg font-semibold mb-3 mt-6">
            {t(content.modesTitle, lang)}
          </h3>

          <ul className="space-y-3 mb-6 ml-4">
            {content.modes.map((mode, i) => (
              <li key={i} className="text-sm list-disc">
                <span className="font-semibold">{t(mode.title, lang)}</span>
                {" — "}
                <span className="text-muted-foreground">{t(mode.desc, lang)}</span>
              </li>
            ))}
          </ul>

          <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
            {t(content.tokenNote, lang)}
          </p>

          {lang === "en" && (
            <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
              {t(content.localMethods, lang)}
            </p>
          )}

          <p className="text-muted-foreground leading-relaxed mb-8 text-sm">
            {t(content.paylink, lang)}
          </p>

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
