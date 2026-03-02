import { useEffect } from "react";
import { useLang } from "@/lib/language-context";
import { translations, t } from "@/lib/translations";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PaymentGatewaySection from "@/components/PaymentGatewaySection";
import AboutSection from "@/components/AboutSection";
import WhyUsSection from "@/components/WhyUsSection";
import TeamSection from "@/components/TeamSection";
import PartnersSection from "@/components/PartnersSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const Index = () => {
  const { lang } = useLang();

  useEffect(() => {
    document.title = t(translations.meta.title, lang);
    const metaDesc = document.querySelector('meta[name="description"]');
    const desc = t(translations.meta.description, lang);
    if (metaDesc) {
      metaDesc.setAttribute("content", desc);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = desc;
      document.head.appendChild(meta);
    }

    const setOg = (prop: string, content: string) => {
      let el = document.querySelector(`meta[property="${prop}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", prop);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setOg("og:title", t(translations.meta.title, lang));
    setOg("og:description", desc);
    setOg("og:type", "website");
  }, [lang]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <PaymentGatewaySection />
      <ServicesSection />
      <PartnersSection />
      <AboutSection />
      <WhyUsSection />
      <TeamSection />
      <ContactSection />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
