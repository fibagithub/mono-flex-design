import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Service {
  id: string;
  name_mn: string;
  name_en: string;
  description_mn: string;
  description_en: string;
  icon_url: string | null;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export function useServices(activeOnly = false) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    let query = supabase.from("services").select("*").order("sort_order");
    if (activeOnly) query = query.eq("is_active", true);
    const { data } = await query;
    setServices((data as Service[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();

    const channel = supabase
      .channel("services-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "services" }, () => {
        fetchServices();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [activeOnly]);

  return { services, loading, refetch: fetchServices };
}
