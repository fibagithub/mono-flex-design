import { motion } from "framer-motion";
import { useLang } from "@/lib/language-context";
import { translations, t } from "@/lib/translations";
import { useTeamMembers } from "@/hooks/useTeamMembers";

export default function TeamSection() {
  const { lang } = useLang();
  const { members, loading } = useTeamMembers(true);

  if (loading) return null;

  return (
    <section id="team" className="py-16 lg:py-20 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-3">
            {t(translations.team.title, lang)}
          </h2>
          <div className="h-1 w-16 gradient-line rounded-full mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">
            {t(translations.team.subtitle, lang)}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group text-center"
            >
              <div className="relative w-28 h-28 mx-auto mb-4 rounded-2xl overflow-hidden">
                {member.image_url ? (
                  <img src={member.image_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt={member.name} />
                ) : (
                  <div className="w-full h-full bg-secondary flex items-center justify-center text-2xl font-bold text-primary group-hover:scale-105 transition-transform duration-300">
                    {member.name.charAt(0)}
                  </div>
                )}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/30 transition-colors duration-300" />
              </div>
              <h3 className="font-bold text-base mb-1">{member.name}</h3>
              <p className="text-xs font-medium text-primary mb-1.5">
                {lang === "mn" ? member.position_mn : member.position_en}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed text-justify">
                {lang === "mn" ? member.description_mn : member.description_en}
              </p>
              <div className="h-0.5 w-0 group-hover:w-12 gradient-line mx-auto mt-2 transition-all duration-300 rounded-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
