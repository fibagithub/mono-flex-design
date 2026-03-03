import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useLang } from "@/lib/language-context";
import { translations, t } from "@/lib/translations";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function ContactSection() {
  const { lang } = useLang();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: form,
      });
      if (error) throw error;
      toast({ title: t(translations.contact.form.success, lang) });
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("Contact form error:", err);
      toast({
        title: lang === "mn" ? "Алдаа гарлаа" : "Error occurred",
        description: lang === "mn" ? "Мессеж илгээхэд алдаа гарлаа. Дахин оролдоно уу." : "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const info = translations.contact.info;

  return (
    <section id="contact" className="py-16 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-3">
            {t(translations.contact.title, lang)}
          </h2>
          <div className="h-1 w-16 gradient-line rounded-full mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">
            {t(translations.contact.subtitle, lang)}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-xl p-6 space-y-4"
          >
            {(["name", "email", "phone"] as const).map((field) => (
              <div key={field}>
                <label className="block text-xs font-medium mb-1">
                  {t(translations.contact.form[field], lang)}
                </label>
                <input
                  type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                  required={field !== "phone"}
                  value={form[field]}
                  onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                />
              </div>
            ))}
            <div>
              <label className="block text-xs font-medium mb-1">
                {t(translations.contact.form.message, lang)}
              </label>
              <textarea
                required
                rows={3}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm uppercase tracking-wider hover:bg-accent transition-colors disabled:opacity-60 shadow-lg shadow-primary/20"
            >
              <Send className="w-4 h-4" />
              {t(translations.contact.form.submit, lang)}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="font-bold text-base">{info.company}</h3>
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                {t(info.address, lang)}
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a href={`tel:${info.phone}`} className="hover:text-foreground transition-colors">{info.phone}</a>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a href={`mailto:${info.email}`} className="hover:text-foreground transition-colors">{info.email}</a>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-border h-56 lg:h-72">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1337.5!2d106.8856!3d47.8864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d96ecb2e3cfe4f1%3A0x3d2c3b1e4f5a6b7c!2z0KXQsNC9LdCj0YPQuyDQtNKv0q_RgNGN0LMsIDE1LdGAINGF0L7RgNC-0L4sINKu0LnQu9C00LLRjdGALCDQkdC-0LPQtCDQttCw0LLQt9Cw0L0g0LTQsNC80LHQsCDQs9GD0LTQsNC80LYgMTIg0LHQsNC50YAsIDEg0YLQvtC-0YI!5e0!3m2!1smn!2smn!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="NEGDi Office Location"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
