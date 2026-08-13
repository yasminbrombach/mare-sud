export const dynamic = "force-dynamic";

import { supabase } from "@/lib/supabaseClient";

export default async function ConciergePage() {
  const { data: providers } = await supabase
    .from("providers")
    .select("*")
    .eq("status", "live");

  const categories = [...new Set((providers || []).map((p) => p.category))];

  return (
    <main className="min-h-screen" style={{ background: "#EDE7DC" }}>
      <div className="max-w-md mx-auto min-h-screen" style={{ background: "#FCFAF6" }}>
        <div className="px-5 pt-6 pb-10">
          <h1 className="text-xl font-light mb-1" style={{ color: "#16283F" }}>Concierge</h1>
          <p className="text-xs mb-5" style={{ color: "#6b7280" }}>
            Für Eigentümer: geprüfte Anbieter direkt finden und kontaktieren.
          </p>

          {categories.length === 0 && (
            <p className="text-xs" style={{ color: "#9ca3af" }}>Noch keine Einträge – kommt gleich.</p>
          )}

          {categories.map((cat) => (
            <div key={cat} className="mb-6">
              <h2 className="text-sm tracking-widest uppercase mb-3" style={{ color: "#16283F" }}>{cat}</h2>
              <div className="flex flex-col gap-3">
                {providers.filter((p) => p.category === cat).map((p) => (
                  <div
                    key={p.id}
                    className="rounded-2xl px-4 py-4 relative"
                    style={{ background: "#FCFAF6", border: `1px solid ${p.featured ? "#B8924A" : "rgba(184,146,74,0.2)"}` }}
                  >
                    {p.featured && (
                      <span className="absolute top-3 right-4 text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full" style={{ background: "#B8924A", color: "#16283F" }}>
                        Empfohlen
                      </span>
                    )}
                    <p className="text-sm font-medium pr-20" style={{ color: "#16283F" }}>{p.name}</p>
                    <p className="text-xs mt-1 mb-2" style={{ color: "#6b7280" }}>{p.tagline}</p>
                    {p.phone ? (
                      <div className="flex flex-col gap-1">
                        {p.address && <p className="text-[11px]" style={{ color: "#9ca3af" }}>{p.address}</p>}
                        
                          href={`tel:${p.phone.replace(/\s+/g, "")}`}
                          className="text-xs px-3 py-1.5 rounded-full font-medium w-fit mt-1"
                          style={{ background: "#16283F", color: "#FCFAF6" }}
                        >
                          Anrufen · {p.phone}
                        </a>
                      </div>
                    ) : (
                      <span className="text-xs px-3 py-1.5 rounded-full font-medium inline-block" style={{ background: "#E4D6BE", color: "#16283F" }}>
                        Kontakt anfragen
                      </span>
                    )}
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
