import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Store, ShieldCheck, Heart, Cpu, ChevronDown, ChevronUp } from "lucide-react";
import { useLang } from "@/lib/language-context";
import { translations, t } from "@/lib/translations";
import { useServices } from "@/hooks/useServices";

const defaultIcons = [CreditCard, Cpu, Store, ShieldCheck, Heart];

const SERVICE_IMAGES = [
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=340&fit=crop&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=340&fit=crop&q=80",
  "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=340&fit=crop&q=80",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=340&fit=crop&q=80",
  "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=600&h=340&fit=crop&q=80",
];

function ServiceCard({ service, index }: { service: any; index: number }) {
  const { lang } = useLang();
  const [expanded, setExpanded] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const Icon = defaultIcons[index % defaultIcons.length];
  const desc = lang === "mn" ? service.description_mn : service.description_en;
  const imgSrc = service.image_url || SERVICE_IMAGES[index % SERVICE_IMAGES.length];

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    setParallax({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setParallax({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group rounded-[20px] bg-card overflow-hidden border border-border/50 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_60px_-12px_hsl(var(--primary)/0.15)]"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {/* Image container */}
      <div className="relative aspect-video overflow-hidden">
        <motion.img
          src={imgSrc}
          alt=""
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          style={{
            transform: `translate(${parallax.x}px, ${parallax.y}px) scale(1)`,
          }}
          animate={{
            x: parallax.x,
            y: parallax.y,
          }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
        />
        {/* Bottom gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className="p-5 lg:p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            {service.icon_url ? (
              <img src={service.icon_url} className="w-5 h-5 object-contain" alt="" />
            ) : (
              <Icon className="w-5 h-5 text-primary" />
            )}
          </div>
          <h3 className="font-bold text-base text-foreground leading-tight">
            {lang === "mn" ? service.name_mn : service.name_en}
          </h3>
        </div>

        <div className="text-sm text-muted-foreground leading-relaxed mb-4 text-justify">
          <AnimatePresence mode="wait">
            {expanded ? (
              <motion.p key="full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {desc}
              </motion.p>
            ) : (
              <motion.p key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="line-clamp-3">
                {desc}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent transition-colors"
        >
          {expanded ? t(translations.services.collapse, lang) : t(translations.services.learnMore, lang)}
          {expanded ? <ChevronUp className="w-4 h-4" /> : <span className="text-xs">→</span>}
        </button>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const { lang } = useLang();
  const { services, loading } = useServices(true);

  if (loading) return null;

  return (
    <section id="services" className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-3 text-foreground">
            {t(translations.services.title, lang)}
          </h2>
          <div className="h-1 w-16 gradient-line rounded-full mx-auto mb-3" />
          <p className="text-muted-foreground max-w-md mx-auto text-sm">
            {t(translations.services.subtitle, lang)}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
