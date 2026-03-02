import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLang } from "@/lib/language-context";
import { useServices, Service } from "@/hooks/useServices";
import { Plus, Pencil, Trash2, Eye, EyeOff, X, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import RichTextEditor from "./RichTextEditor";

interface FormData {
  name_mn: string;
  name_en: string;
  description_mn: string;
  description_en: string;
  sort_order: number;
  is_active: boolean;
}

const emptyForm: FormData = { name_mn: "", name_en: "", description_mn: "", description_en: "", sort_order: 0, is_active: true };

export default function AdminServices() {
  const { lang } = useLang();
  const { services, refetch } = useServices();
  const { toast } = useToast();
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);

  const openNew = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (s: Service) => {
    setEditing(s.id);
    setForm({
      name_mn: s.name_mn,
      name_en: s.name_en,
      description_mn: s.description_mn,
      description_en: s.description_en,
      sort_order: s.sort_order,
      is_active: s.is_active,
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (editing) {
      await supabase.from("services").update(form).eq("id", editing);
    } else {
      await supabase.from("services").insert(form);
    }
    setShowForm(false);
    toast({ title: lang === "mn" ? "Амжилттай хадгалагдлаа" : "Saved successfully" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm(lang === "mn" ? "Устгах уу?" : "Delete?")) return;
    await supabase.from("services").delete().eq("id", id);
    toast({ title: lang === "mn" ? "Устгагдлаа" : "Deleted" });
  };

  const toggleActive = async (id: string, current: boolean) => {
    await supabase.from("services").update({ is_active: !current }).eq("id", id);
  };

  const handleImageUpload = async (id: string, file: File, field: "icon_url" | "image_url") => {
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${id}/${field}-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("services").upload(path, file, { upsert: true });
    if (!error) {
      const { data: { publicUrl } } = supabase.storage.from("services").getPublicUrl(path);
      await supabase.from("services").update({ [field]: publicUrl }).eq("id", id);
    }
    setUploading(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">{lang === "mn" ? "Үйлчилгээнүүд" : "Services"}</h2>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium uppercase tracking-wider hover:bg-accent transition-colors">
          <Plus className="w-4 h-4" /> {lang === "mn" ? "Нэмэх" : "Add"}
        </button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 p-4">
          <div className="bg-background rounded-xl border border-border p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">{editing ? (lang === "mn" ? "Засах" : "Edit") : (lang === "mn" ? "Шинэ үйлчилгээ" : "New Service")}</h3>
              <button onClick={() => setShowForm(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground">{lang === "mn" ? "Нэр (Монгол)" : "Name (Mongolian)"}</label>
                <input value={form.name_mn} onChange={e => setForm(f => ({ ...f, name_mn: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">{lang === "mn" ? "Нэр (Англи)" : "Name (English)"}</label>
                <input value={form.name_en} onChange={e => setForm(f => ({ ...f, name_en: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm" />
              </div>
              <RichTextEditor
                label={lang === "mn" ? "Тайлбар (Монгол)" : "Description (Mongolian)"}
                value={form.description_mn}
                onChange={(html) => setForm(f => ({ ...f, description_mn: html }))}
              />
              <RichTextEditor
                label={lang === "mn" ? "Тайлбар (Англи)" : "Description (English)"}
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

      {/* Table */}
      <div className="bg-background rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-medium">#</th>
                <th className="text-left px-4 py-3 font-medium">{lang === "mn" ? "Нэр" : "Name"}</th>
                <th className="text-left px-4 py-3 font-medium">{lang === "mn" ? "Зураг" : "Image"}</th>
                <th className="text-left px-4 py-3 font-medium">{lang === "mn" ? "Төлөв" : "Status"}</th>
                <th className="text-right px-4 py-3 font-medium">{lang === "mn" ? "Үйлдэл" : "Actions"}</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3">{s.sort_order}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{lang === "mn" ? s.name_mn : s.name_en}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {s.image_url ? (
                        <img src={s.image_url} className="w-12 h-8 rounded object-cover" alt="" />
                      ) : (
                        <div className="w-12 h-8 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground">—</div>
                      )}
                      <label className="cursor-pointer text-xs text-primary hover:underline">
                        <Upload className="w-3 h-3 inline mr-1" />
                        {uploading ? "..." : "Upload"}
                        <input type="file" accept="image/*" className="hidden" onChange={e => { if (e.target.files?.[0]) handleImageUpload(s.id, e.target.files[0], "image_url"); }} />
                      </label>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleActive(s.id, s.is_active)} className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${s.is_active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                      {s.is_active ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {s.is_active ? (lang === "mn" ? "Идэвхтэй" : "Active") : (lang === "mn" ? "Идэвхгүй" : "Inactive")}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(s)} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(s.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-destructive transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
