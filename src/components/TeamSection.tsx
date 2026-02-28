import { motion } from "framer-motion";
import { useLang } from "@/lib/language-context";
import { translations, t } from "@/lib/translations";

export default function TeamSection() {
  const { lang } = useLang();

  const getInitials = (name: string) =>
    name.split(" ").map((w) => w[0]).join("").slice(0, 2);

  return (
    <section id="team" className="py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {t(translations.team.title, lang)}
          </h2>
          <div className="h-1 w-16 gradient-line rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">
            {t(translations.team.subtitle, lang)}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {translations.team.members.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group text-center"
            >
              <div className="relative w-28 h-28 mx-auto mb-5">
                <div className="w-full h-full rounded-2xl bg-secondary flex items-center justify-center text-2xl font-bold text-primary group-hover:scale-105 transition-transform duration-300">
                  {getInitials(lang === "mn" ? member.name : member.nameEn)}
                </div>
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/30 transition-colors duration-300" />
              </div>
              <h3 className="font-bold text-lg mb-1">
                {lang === "mn" ? member.name : member.nameEn}
              </h3>
              <p className="text-sm font-medium text-primary mb-2">
                {t(member.position, lang)}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t(member.description, lang)}
              </p>
              {/* Hover underline */}
              <div className="h-0.5 w-0 group-hover:w-12 gradient-line mx-auto mt-3 transition-all duration-300 rounded-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
