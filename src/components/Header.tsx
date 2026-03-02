import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLang } from "@/lib/language-context";
import { translations, t } from "@/lib/translations";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo-white.png";

const navItems = ["services", "partners", "about", "team", "contact"] as const;

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[hsl(0,0%,5%)] ${
        scrolled ? "shadow-sm border-b border-border/20" : ""
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-14 px-4 lg:px-8">
        <a href="#" className="flex items-center gap-2">
          <img src={logo} alt="NEGDi logo" className="h-10 md:h-12 w-auto" />
        </a>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((key) => (
            <button
              key={key}
              onClick={() => scrollTo(key)}
              className="text-xs font-medium uppercase tracking-wider text-white/60 hover:text-primary transition-colors"
            >
              {t(translations.nav[key], lang)}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-full border border-white/20 overflow-hidden text-xs font-semibold">
            <button
              onClick={() => setLang("mn")}
              className={`px-3 py-1.5 transition-colors ${
                lang === "mn" ? "bg-primary text-primary-foreground" : "text-white/60 hover:text-white"
              }`}
            >
              MN
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1.5 transition-colors ${
                lang === "en" ? "bg-primary text-primary-foreground" : "text-white/60 hover:text-white"
              }`}
            >
              EN
            </button>
          </div>

          <button className="md:hidden p-2 text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[hsl(0,0%,5%)]/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <nav className="flex flex-col items-center gap-3 py-4">
              {navItems.map((key) => (
                <button
                  key={key}
                  onClick={() => scrollTo(key)}
                  className="text-sm font-medium uppercase tracking-wider text-white/80 hover:text-primary transition-colors"
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
