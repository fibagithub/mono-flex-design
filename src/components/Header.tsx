import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLang } from "@/lib/language-context";
import { translations, t } from "@/lib/translations";
import { motion, AnimatePresence } from "framer-motion";

const navItems = ["services", "payment", "about", "team", "contact"] as const;

export default function Header() {
  const { lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <span className="gradient-text">NEGDi</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((key) => (
            <button
              key={key}
              onClick={() => scrollTo(key)}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {t(translations.nav[key], lang)}
            </button>
          ))}
        </nav>

        {/* Language toggle + mobile menu */}
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-full border border-border overflow-hidden text-xs font-semibold">
            <button
              onClick={() => setLang("mn")}
              className={`px-3 py-1.5 transition-colors ${
                lang === "mn" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              MN
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1.5 transition-colors ${
                lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              EN
            </button>
          </div>

          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <nav className="flex flex-col items-center gap-4 py-6">
              {navItems.map((key) => (
                <button
                  key={key}
                  onClick={() => scrollTo(key)}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  {t(translations.nav[key], lang)}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
