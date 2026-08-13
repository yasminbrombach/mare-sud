export const dynamic = "force-dynamic";

import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

const fmtPrice = (n) => Number(n).toLocaleString("de-DE") + " €";

export default async function ObjektePage() {
  const { data: properties } = await supabase
    .from("properties")
    .select("*")
    .eq("status", "live")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen" style={{ background: "#EDE7DC" }}>
      <div className="max-w-md mx-auto min-h-screen" style={{ background: "#FCFAF6" }}>
        <div className="px-5 pt-6 pb-4">
          <h1 className="text-xl font-light mb-1" style={{ color: "#16283F" }}>Objekte</h1>
          <p className="text-xs mb-5" style={{ color: "#6b7280" }}>
            {properties?.length || 0} Objekte in Mallorca
          </p>

          <div className="flex flex-col gap-4">
            {properties?.map((p) => (
              <Link
                key={p.id}
                href={`/objekte/${p.id}`}
                className="rounded-2xl overflow-hidden border block"
                style={{ borderColor: "rgba(184,146,74,0.25)" }}
              >
                <div
                  className="h-36 flex items-center justify-center relative"
                  style={{ background: "linear-gradient(135deg, #16283F, #1F3D2E)" }}
                >
                  <span
                    className="absolute top-3 left-3 text-[10px] tracking-widest uppercase px-2 py-1 rounded-full"
                    style={{ background: "rgba(252,250,246,0.9)", color: "#16283F" }}
                  >
                    {p.tag}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-base font-medium" style={{ color: "#16283F" }}>{p.title}</h3>
                  <p className="text-xs mt-1" style={{ color: "#B8924A" }}>{p.location}</p>
                  <div className="flex items-center gap-3 mt-3 text-xs" style={{ color: "#6b7280" }}>
                    <span>{p.beds} Zimmer</span>
                    <span>{p.baths} Bäder</span>
                    <span>{p.sqm} m²</span>
                  </div>
                  <div className="w-full h-px my-3" style={{ background: "linear-gradient(90deg, transparent, #B8924A, transparent)" }} />
                  <p className="text-lg font-light" style={{ color: "#16283F" }}>{fmtPrice(p.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
