export const dynamic = "force-dynamic";

import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import RequestViewingButton from "@/components/RequestViewingButton";

const fmtPrice = (n) => Number(n).toLocaleString("de-DE") + " €";

export default async function ObjektDetailPage({ params }) {
  const { data: p } = await supabase
    .from("properties")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!p) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <p style={{ color: "#16283F" }}>Objekt nicht gefunden.</p>
      </main>
    );
  }

  const features = [
    p.sea_view && "Meerblick",
    p.pool && "Pool",
    p.garden && "Garten",
    p.new_build && "Neubau",
    p.luxury && "Luxus-Ausstattung",
    p.investment && "Investment-geeignet",
    p.rental_license && "Vermietlizenz (ETV)",
  ].filter(Boolean);

  const hasSourceUrl = Boolean(p.source_url);
  const subtitle = p.title + " - " + p.location + " - " + fmtPrice(p.price);

  return (
    <main className="min-h-screen" style={{ background: "#EDE7DC" }}>
      <div className="max-w-md mx-auto min-h-screen" style={{ background: "#FCFAF6" }}>
        <div
          className="h-56 relative flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #16283F, #1F3D2E)" }}
        >
          <Link
            href="/objekte"
            className="absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center text-sm"
            style={{ background: "rgba(252,250,246,0.9)", color: "#16283F" }}
          >
            ←
          </Link>
        </div>

        <div className="px-5 pt-5 pb-10">
          <p className="text-[10px] tracking-widest uppercase mb-1" style={{ color: "#B8924A" }}>{p.location}</p>
          <h1 className="text-xl font-light mb-2" style={{ color: "#16283F" }}>{p.title}</h1>
          <p className="text-2xl font-light mb-3" style={{ color: "#16283F" }}>{fmtPrice(p.price)}</p>
          <div className="flex items-center gap-4 text-sm mb-4" style={{ color: "#4b5563" }}>
            <span>{p.beds} Zimmer</span>
            <span>{p.baths} Bäder</span>
            <span>{p.sqm} m²</span>
          </div>

          <div className="w-full h-px mb-4" style={{ background: "linear-gradient(90deg, transparent, #B8924A, transparent)" }} />

          <h2 className="text-xs tracking-widest uppercase mb-2" style={{ color: "#16283F" }}>Ausstattung</h2>
          <div className="flex flex-wrap gap-2 mb-5">
            {features.map((f) => (
              <span key={f} className="text-xs px-3 py-1.5 rounded-full" style={{ background: "#E4D6BE", color: "#16283F" }}>
                {f}
              </span>
            ))}
          </div>

          {hasSourceUrl && (
            <a href={p.source_url} target="_blank" rel="noopener noreferrer" className="block text-center text-xs mb-4" style={{ color: "#B8924A" }}>
              Original-Inserat ansehen
            </a>
          )}

          <RequestViewingButton propertyId={p.id} subtitle={subtitle} />
        </div>
      </div>
    </main>
  );
}
