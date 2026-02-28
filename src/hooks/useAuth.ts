import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAdmin = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();
      if (error) {
        console.error("Error checking admin role:", error);
        return false;
      }
      return !!data;
    } catch (e) {
      console.error("Exception checking admin role:", e);
      return false;
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    // Set up auth state listener - only update user, don't make DB calls here
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!mounted) return;
        const u = session?.user ?? null;
        setUser(u);
        if (!u) {
          setIsAdmin(false);
          setLoading(false);
        }
        // Don't query DB here - defer to separate effect
      }
    );

    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      const u = session?.user ?? null;
      setUser(u);
      if (!u) {
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Separate effect to check admin role when user changes
  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      return;
    }

    let cancelled = false;

    checkAdmin(user.id).then((admin) => {
      if (!cancelled) {
        setIsAdmin(admin);
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [user, checkAdmin]);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return { user, isAdmin, loading, signIn, signOut };
}
