import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useLang } from "@/lib/language-context";
import { translations, t } from "@/lib/translations";
import { LayoutDashboard, Briefcase, Users, Handshake, LogOut, Menu, X } from "lucide-react";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminServices from "@/components/admin/AdminServices";
import AdminTeam from "@/components/admin/AdminTeam";
import AdminPartners from "@/components/admin/AdminPartners";

type Tab = "dashboard" | "services" | "team" | "partners";

const tabs: { key: Tab; icon: typeof LayoutDashboard; label: keyof typeof translations.admin.sidebar }[] = [
  { key: "dashboard", icon: LayoutDashboard, label: "dashboard" },
  { key: "services", icon: Briefcase, label: "services" },
  { key: "team", icon: Users, label: "team" },
  { key: "partners", icon: Handshake, label: "partners" },
];

export default function Admin() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { lang, setLang } = useLang();
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  const handleLogout = async () => {
    await signOut();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-secondary/30 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-background border-r border-border transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-14 px-4 border-b border-border">
          <span className="font-bold text-lg gradient-text">NEGDi Admin</span>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-3 space-y-1">
          {tabs.map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => { setActiveTab(key); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === key
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              {t(translations.admin.sidebar[label], lang)}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-border space-y-2">
          <div className="flex items-center rounded-lg border border-border overflow-hidden text-xs font-semibold">
            <button
              onClick={() => setLang("mn")}
              className={`flex-1 px-3 py-1.5 transition-colors ${lang === "mn" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            >
              MN
            </button>
            <button
              onClick={() => setLang("en")}
              className={`flex-1 px-3 py-1.5 transition-colors ${lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            >
              EN
            </button>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            {t(translations.admin.sidebar.logout, lang)}
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        <header className="sticky top-0 z-30 h-14 bg-background/80 backdrop-blur-xl border-b border-border flex items-center px-4 gap-3">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="font-semibold text-sm capitalize">
            {t(translations.admin.sidebar[tabs.find(t => t.key === activeTab)!.label], lang)}
          </h1>
        </header>

        <main className="p-4 lg:p-6">
          {activeTab === "dashboard" && <AdminDashboard />}
          {activeTab === "services" && <AdminServices />}
          {activeTab === "team" && <AdminTeam />}
          {activeTab === "partners" && <AdminPartners />}
        </main>
      </div>
    </div>
  );
}
