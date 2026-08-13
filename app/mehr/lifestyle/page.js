export const dynamic = "force-dynamic";

import { supabase } from "@/lib/supabaseClient";

export default async function LifestylePage() {
  const { data: businesses } = await supabase
    .from("lifestyle_businesses")
    .select("*")
    .eq("status", "live");

  const categories = [...new Set((businesses || []).map((b) => b.category))];

  return (
    <main className="min-h-screen" style={{ background: "#EDE7DC" }}>
      <div className="max-w-md mx-auto min-h-screen" style={{ background: "#FCFAF6" }}>
        <div className="px-5 pt-6 pb-10">
          <h1 className="text-xl font-light mb-1" style={{ color: "#16283F" }}>Lifestyle</h1>
          <p className="text-xs mb-5" style={{ color: "#6b7280" }}>
            Die besten Adressen auf Mallorca – von Eigentümern für Eigentümer.
          </p>

          {categories.length === 0 && (
            <p className="text-xs" style={{ color: "#9ca3af" }}>Noch keine Einträge – kommt gleich.</p>
          )}

          {categories.map((cat) => (
            <div key={cat} className="mb-6">
              <h2 className="text-sm tracking-widest uppercase mb-3" style={{ color: "#16283F" }}>{cat}</h2>
              <div className="flex flex-col gap-3">
                {businesses.filter((b) => b.category === cat).map((b) => (
                  <div
                    key={b.id}
                    className="rounded-2xl overflow-hidden"
                    style={{ background: "#FCFAF6", border: `1px solid ${b.featured ? "#B8924A" : "rgba(184,146,74,0.2)"}` }}
                  >
                    <div className="h-16 flex items-center px-4" style={{ background: "linear-gradient(135deg, #16283F, #1F3D2E)" }}>
                      {b.featured && (
                        <span className="text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full ml-auto" style={{ background: "#B8924A", color: "#16283F" }}>
                          Empfohlen
                        </span>
                      )}
                    </div>
                    <div className="px-4 py-3">
                      <p className="text-sm font-medium" style={{ color: "#16283F" }}>{b.name}</p>
                      <p className="text-xs mt-1" style={{ color: "#6b7280" }}>{b.tagline}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
