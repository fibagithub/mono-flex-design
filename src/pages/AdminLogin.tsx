import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLang } from "@/lib/language-context";
import { translations, t } from "@/lib/translations";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const { lang } = useLang();
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Navigate when user becomes admin
  useEffect(() => {
    if (!authLoading && user && isAdmin) {
      navigate("/admin", { replace: true });
    }
  }, [authLoading, user, isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const { error: err } = await signIn(email, password);
    if (err) {
      setError(t(translations.admin.login.error, lang));
      setSubmitting(false);
    }
    // Don't navigate here - let the useEffect handle it when isAdmin updates
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold gradient-text">NEGDi</h1>
          <p className="text-sm text-muted-foreground mt-2">
            {t(translations.admin.login.title, lang)}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card rounded-xl p-8 space-y-5">
          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">{error}</div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1.5">
              {t(translations.admin.login.email, lang)}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">
              {t(translations.admin.login.password, lang)}
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm uppercase tracking-wider hover:bg-accent transition-colors disabled:opacity-60"
          >
            {submitting ? "..." : t(translations.admin.login.submit, lang)}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
