"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function FavoriteButton({ propertyId }) {
  const [user, setUser] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkStatus();
  }, []);

  async function checkStatus() {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);

    if (user) {
      const { data } = await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", user.id)
        .eq("property_id", propertyId)
        .maybeSingle();
      setIsFavorite(Boolean(data));
    }
    setLoading(false);
  }

  const toggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      window.location.href = "/login";
      return;
    }

    if (isFavorite) {
      await supabase.from("favorites").delete().eq("user_id", user.id).eq("property_id", propertyId);
      setIsFavorite(false);
    } else {
      await supabase.from("favorites").insert({ user_id: user.id, property_id: propertyId });
      setIsFavorite(true);
    }
  };

  if (loading) return null;

  return (
    <button
      onClick={toggle}
      className="w-9 h-9 rounded-full flex items-center justify-center text-lg"
      style={{ background: "rgba(252,250,246,0.9)" }}
    >
      {isFavorite ? "♥" : "♡"}
    </button>
  );
}
