import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Partner {
  id: string;
  name_mn: string;
  name_en: string;
  logo_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export function usePartners(activeOnly = false) {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPartners = async () => {
    let query = supabase.from("partners").select("*").order("sort_order");
    if (activeOnly) query = query.eq("is_active", true);
    const { data } = await query;
    setPartners((data as Partner[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPartners();

    const channel = supabase
      .channel("partners-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "partners" }, () => {
        fetchPartners();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [activeOnly]);

  return { partners, loading, refetch: fetchPartners };
}
