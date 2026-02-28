import { useLang } from "@/lib/language-context";
import { useServices } from "@/hooks/useServices";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import { usePartners } from "@/hooks/usePartners";
import { Briefcase, Users, Handshake, Eye } from "lucide-react";

export default function AdminDashboard() {
  const { lang } = useLang();
  const { services } = useServices();
  const { members } = useTeamMembers();
  const { partners } = usePartners();

  const stats = [
    { label: lang === "mn" ? "Үйлчилгээ" : "Services", value: services.length, active: services.filter(s => s.is_active).length, icon: Briefcase },
    { label: lang === "mn" ? "Багийн гишүүд" : "Team Members", value: members.length, active: members.filter(m => m.is_active).length, icon: Users },
    { label: lang === "mn" ? "Хамтрагчид" : "Partners", value: partners.length, active: partners.filter(p => p.is_active).length, icon: Handshake },
  ];

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-background rounded-xl border border-border p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
            </div>
            <div className="text-3xl font-bold">{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {stat.active} {lang === "mn" ? "идэвхтэй" : "active"}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-background rounded-xl border border-border p-5">
        <div className="flex items-center gap-2 mb-4">
          <Eye className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">{lang === "mn" ? "Хандалтын мэдээлэл" : "Site Analytics"}</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          {lang === "mn"
            ? "Хандалтын дэлгэрэнгүй мэдээлэл удахгүй нэмэгдэнэ. Одоогоор мэдээллийн сангийн бүртгэл, үйлчилгээ, баг, хамтрагчдын тоон мэдээллийг хянаж байна."
            : "Detailed site analytics coming soon. Currently monitoring database records for services, team, and partners."}
        </p>
      </div>
    </div>
  );
}
