import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useLang } from "@/lib/language-context";
import { translations, t } from "@/lib/translations";
import { useToast } from "@/hooks/use-toast";

export default function ContactSection() {
  const { lang } = useLang();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate send
    setTimeout(() => {
      toast({ title: t(translations.contact.form.success, lang) });
      setForm({ name: "", email: "", phone: "", message: "" });
      setLoading(false);
    }, 1000);
  };

  const info = translations.contact.info;

  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {t(translations.contact.title, lang)}
          </h2>
          <div className="h-1 w-16 gradient-line rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">
            {t(translations.contact.subtitle, lang)}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-xl p-8 space-y-5"
          >
            {(["name", "email", "phone"] as const).map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium mb-1.5">
                  {t(translations.contact.form[field], lang)}
                </label>
                <input
                  type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                  required={field !== "phone"}
                  value={form[field]}
                  onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium mb-1.5">
                {t(translations.contact.form.message, lang)}
              </label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-accent transition-colors disabled:opacity-60 shadow-lg shadow-primary/20"
            >
              <Send className="w-4 h-4" />
              {t(translations.contact.form.submit, lang)}
            </button>
          </motion.form>

          {/* Info + Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-5">
              <h3 className="font-bold text-lg">{info.company}</h3>
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                {t(info.address, lang)}
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href={`tel:${info.phone}`} className="hover:text-foreground transition-colors">{info.phone}</a>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href={`mailto:${info.email}`} className="hover:text-foreground transition-colors">{info.email}</a>
              </div>
            </div>

            {/* Google Map */}
            <div className="rounded-xl overflow-hidden border border-border h-64 lg:h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2675.0!2d106.9177!3d47.9184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d9693f0d1fba6e5%3A0x0!2sUNESCO%20Street%2C%20Ulaanbaatar!5e0!3m2!1sen!2smn!4v1700000000000"
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
