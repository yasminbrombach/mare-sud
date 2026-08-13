"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ProfilPage() {
  const [role, setRole] = useState("owner");

  useEffect(() => {
    const saved = localStorage.getItem("mareSudRole");
    if (saved) setRole(saved);
  }, []);

  const selectRole = (r) => {
    setRole(r);
    localStorage.setItem("mareSudRole", r);
  };

  return (
    <main className="min-h-screen" style={{ background: "#EDE7DC" }}>
      <div className="max-w-md mx-auto min-h-screen" style={{ background: "#FCFAF6" }}>
        <div className="px-5 pt-6 pb-10">
          <h1 className="text-xl font-light mb-1" style={{ color: "#16283F" }}>Profil</h1>
          <p className="text-xs mb-5" style={{ color: "#6b7280" }}>Ihre Mare Sud Übersicht</p>

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

          <div className="rounded-xl px-4 py-3 mb-6" style={{ background: "#E4D6BE" }}>
            <p className="text-[11px]" style={{ color: "#16283F" }}>
              Anfragen, Favoriten und gespeicherte Suchen erscheinen hier, sobald das Login-System fertig ist – das ist der nächste große Baustein.
            </p>
          </div>

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
    </main>
  );
}
