"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function ProfilPage() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("owner");
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEverything();
  }, []);

  async function loadEverything() {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);

    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();
      if (profile) setRole(profile.role);

      const { data: leadsData } = await supabase
        .from("leads")
        .select("*")
        .eq("submitted_by", user.id)
        .order("created_at", { ascending: false });
      setLeads(leadsData || []);
    }
    setLoading(false);
  }

  const selectRole = async (r) => {
    setRole(r);
    if (user) {
      await supabase.from("profiles").update({ role: r }).eq("id", user.id);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setLeads([]);
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ background: "#EDE7DC" }}>
        <p style={{ color: "#16283F" }}>Lädt...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen" style={{ background: "#EDE7DC" }}>
      <div className="max-w-md mx-auto min-h-screen" style={{ background: "#FCFAF6" }}>
        <div className="px-5 pt-6 pb-10">
          <h1 className="text-xl font-light mb-1" style={{ color: "#16283F" }}>Profil</h1>
          <p className="text-xs mb-5" style={{ color: "#6b7280" }}>Ihre Mare Sud Übersicht</p>

          {!user ? (
            <div className="rounded-2xl px-5 py-6 text-center mb-6" style={{ background: "#E4D6BE" }}>
              <p className="text-sm mb-3" style={{ color: "#16283F" }}>Melden Sie sich an, um Ihre Anfragen und Favoriten zu sehen.</p>
              <Link
                href="/login"
                className="inline-block text-sm px-5 py-2.5 rounded-full font-medium"
                style={{ background: "#16283F", color: "#FCFAF6" }}
              >
                Anmelden
              </Link>
            </div>
          ) : (
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs" style={{ color: "#6b7280" }}>Angemeldet als {user.email}</p>
              <button onClick={handleLogout} className="text-xs" style={{ color: "#B8924A" }}>
                Abmelden
              </button>
            </div>
          )}

          <div className="flex rounded-full overflow-hidden border mb-6" style={{ borderColor: "#B8924A" }}>
            {[{ id: "owner", label: "Eigentümer" }, { id: "provider", label: "Anbieter" }, { id: "agency", label: "Makler" }].map((r) => (
              <button
                key={r.id}
                onClick={() => selectRole(r.id)}
                className="flex-1 text-[11px] px-2 py-2"
                style={{ background: role === r.id ? "#B8924A" : "transparent", color: "#16283F" }}
              >
                {r.label}
              </button>
            ))}
          </div>

          {user && (
            <>
              <h2 className="text-sm tracking-widest uppercase mb-2" style={{ color: "#16283F" }}>
                Meine Anfragen ({leads.length})
              </h2>
              {leads.length === 0 ? (
                <p className="text-xs mb-6" style={{ color: "#9ca3af" }}>Noch keine Anfragen gestellt.</p>
              ) : (
                <div className="flex flex-col gap-2 mb-6">
                  {leads.map((l) => (
                    <div key={l.id} className="rounded-xl px-4 py-3" style={{ background: "#E4D6BE" }}>
                      <p className="text-xs font-medium" style={{ color: "#16283F" }}>{l.type}</p>
                      {l.subtitle && <p className="text-[11px] mt-1" style={{ color: "#4b5563" }}>{l.subtitle}</p>}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          <h2 className="text-sm tracking-widest uppercase mb-2" style={{ color: "#16283F" }}>Rechtliches</h2>
          {[
            { href: "/profil/impressum", label: "Impressum" },
            { href: "/profil/agb", label: "AGB" },
            { href: "/profil/datenschutz", label: "Datenschutz" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between py-3 border-b"
              style={{ borderColor: "rgba(184,146,74,0.15)" }}
            >
              <span className="text-sm" style={{ color: "#16283F" }}>{item.label}</span>
              <span style={{ color: "#B8924A" }}>→</span>
            </Link>
          ))}
        </div>
      </div>
