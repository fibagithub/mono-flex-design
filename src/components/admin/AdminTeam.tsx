import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLang } from "@/lib/language-context";
import { useTeamMembers, TeamMember } from "@/hooks/useTeamMembers";
import { Plus, Pencil, Trash2, Eye, EyeOff, X, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import RichTextEditor from "./RichTextEditor";

interface FormData {
  name: string;
  name_mn: string;
  name_en: string;
  position_mn: string;
  position_en: string;
  description_mn: string;
  description_en: string;
  sort_order: number;
  is_active: boolean;
}

const emptyForm: FormData = { name: "", name_mn: "", name_en: "", position_mn: "", position_en: "", description_mn: "", description_en: "", sort_order: 0, is_active: true };

export default function AdminTeam() {
  const { lang } = useLang();
  const { members, refetch } = useTeamMembers();
  const { toast } = useToast();
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);

  const openNew = () => { setEditing(null); setForm(emptyForm); setShowForm(true); };

  const openEdit = (m: TeamMember) => {
    setEditing(m.id);
    setForm({ name: m.name, name_mn: (m as any).name_mn || m.name, name_en: (m as any).name_en || m.name, position_mn: m.position_mn, position_en: m.position_en, description_mn: m.description_mn, description_en: m.description_en, sort_order: m.sort_order, is_active: m.is_active });
    setShowForm(true);
  };

  const handleSave = async () => {
    const payload = { ...form, name: form.name_mn || form.name_en || form.name };
    if (editing) {
      await supabase.from("team_members").update(payload).eq("id", editing);
    } else {
      await supabase.from("team_members").insert(payload);
    }
    setShowForm(false);
    toast({ title: lang === "mn" ? "Амжилттай" : "Saved" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm(lang === "mn" ? "Устгах уу?" : "Delete?")) return;
    await supabase.from("team_members").delete().eq("id", id);
  };

  const toggleActive = async (id: string, current: boolean) => {
    await supabase.from("team_members").update({ is_active: !current }).eq("id", id);
  };

  const handleImageUpload = async (id: string, file: File) => {
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${id}/photo-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("team").upload(path, file, { upsert: true });
    if (!error) {
      const { data: { publicUrl } } = supabase.storage.from("team").getPublicUrl(path);
      await supabase.from("team_members").update({ image_url: publicUrl }).eq("id", id);
    }
    setUploading(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">{lang === "mn" ? "Манай баг" : "Team"}</h2>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium uppercase tracking-wider hover:bg-accent transition-colors">
          <Plus className="w-4 h-4" /> {lang === "mn" ? "Нэмэх" : "Add"}
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 p-4">
          <div className="bg-background rounded-xl border border-border p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">{editing ? (lang === "mn" ? "Засах" : "Edit") : (lang === "mn" ? "Шинэ гишүүн" : "New Member")}</h3>
              <button onClick={() => setShowForm(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">{lang === "mn" ? "Нэр (MN)" : "Name (MN)"}</label>
                  <input value={form.name_mn} onChange={e => setForm(f => ({ ...f, name_mn: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">{lang === "mn" ? "Нэр (EN)" : "Name (EN)"}</label>
                  <input value={form.name_en} onChange={e => setForm(f => ({ ...f, name_en: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">{lang === "mn" ? "Албан тушаал (MN)" : "Position (MN)"}</label>
                  <input value={form.position_mn} onChange={e => setForm(f => ({ ...f, position_mn: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">{lang === "mn" ? "Албан тушаал (EN)" : "Position (EN)"}</label>
                  <input value={form.position_en} onChange={e => setForm(f => ({ ...f, position_en: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm" />
                </div>
              </div>
              <RichTextEditor
                label={lang === "mn" ? "Танилцуулга (MN)" : "Description (MN)"}
                value={form.description_mn}
                onChange={(html) => setForm(f => ({ ...f, description_mn: html }))}
              />
              <RichTextEditor
                label={lang === "mn" ? "Танилцуулга (EN)" : "Description (EN)"}
                value={form.description_en}
                onChange={(html) => setForm(f => ({ ...f, description_en: html }))}
              />
              <div>
                <label className="text-xs font-medium text-muted-foreground">{lang === "mn" ? "Эрэмбэ" : "Sort Order"}</label>
                <input type="number" value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: Number(e.target.value) }))} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm" />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.is_active} onChange={e => setForm(f => ({ ...f, is_active: e.target.checked }))} className="rounded" />
                {lang === "mn" ? "Идэвхтэй" : "Active"}
              </label>
              <button onClick={handleSave} className="w-full px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium uppercase tracking-wider hover:bg-accent transition-colors">
                {lang === "mn" ? "Хадгалах" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((m) => (
          <div key={m.id} className="bg-background rounded-xl border border-border p-4">
            <div className="flex items-start gap-3">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                {m.image_url ? (
                  <img src={m.image_url} className="w-full h-full object-cover" alt="" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-lg font-bold text-muted-foreground">
                    {m.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm truncate">{m.name}</h4>
                <p className="text-xs text-primary">{lang === "mn" ? m.position_mn : m.position_en}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
              <div className="flex items-center gap-2">
                <label className="cursor-pointer text-xs text-primary hover:underline">
                  <Upload className="w-3 h-3 inline mr-1" />
                  {uploading ? "..." : (lang === "mn" ? "Зураг" : "Photo")}
                  <input type="file" accept="image/*" className="hidden" onChange={e => { if (e.target.files?.[0]) handleImageUpload(m.id, e.target.files[0]); }} />
                </label>
                <button onClick={() => toggleActive(m.id, m.is_active)} className={`text-xs px-2 py-0.5 rounded-full ${m.is_active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                  {m.is_active ? (lang === "mn" ? "Идэвхтэй" : "Active") : (lang === "mn" ? "Идэвхгүй" : "Inactive")}
                </button>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => openEdit(m)} className="p-1 rounded hover:bg-muted"><Pencil className="w-3.5 h-3.5" /></button>
                <button onClick={() => handleDelete(m.id)} className="p-1 rounded hover:bg-destructive/10 text-destructive"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
