import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface TeamMember {
  id: string;
  name: string;
  position_mn: string;
  position_en: string;
  description_mn: string;
  description_en: string;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export function useTeamMembers(activeOnly = false) {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
    let query = supabase.from("team_members").select("*").order("sort_order");
    if (activeOnly) query = query.eq("is_active", true);
    const { data } = await query;
    setMembers((data as TeamMember[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchMembers();

    const channel = supabase
      .channel("team-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "team_members" }, () => {
        fetchMembers();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [activeOnly]);

  return { members, loading, refetch: fetchMembers };
}
