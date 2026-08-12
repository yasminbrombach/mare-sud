export const dynamic = "force-dynamic";

import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

const fmtPrice = (n) => Number(n).toLocaleString("de-DE") + " €";

export default async function Home() {
  const { data: properties } = await supabase
    .from("properties")
    .select("*")
    .eq("status", "live")
    .order("created_at", { ascending: false })
    .limit(3);

  return (
    <main className="min-h-screen" style={{ background: "#EDE7DC" }}>
      <div className="max-w-md mx-auto" style={{ background: "#FCFAF6" }}>
        <div
          className="px-6 pt-10 pb-12"
          style={{ background: "linear-gradient(180deg, #16283F 0%, #16283F 55%, #1F3D2E 100%)" }}
        >
          <p className="text-[10px] tracking-[0.25em] uppercase mb-2" style={{ color: "#D6B876" }}>
            Mallorca · Luxury Real Estate
          </p>
          <h1 className="text-3xl font-light leading-tight mb-4" style={{ color: "#FCFAF6" }}>
            Finden Sie Ihr<br /><span className="font-medium">Zuhause im Süden.</span>
          </h1>
          <div
            className="w-full h-px mb-5 max-w-[120px]"
            style={{ background: "linear-gradient(90deg, transparent, #B8924A, transparent)" }}
          />
          <Link
            href="/objekte"
            className="inline-block text-sm px-5 py-2.5 rounded-full font-medium"
            style={{ background: "#B8924A", color: "#16283F" }}
          >
            Objekte entdecken
          </Link>
        </div>

        <div className="px-5 pt-6 pb-10">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm tracking-widest uppercase" style={{ color: "#16283F" }}>
              Neueste Objekte
            </h2>
            <Link href="/objekte" className="text-xs" style={{ color: "#B8924A" }}>
              Alle ansehen
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {properties?.map((p) => (
              <Link
                key={p.id}
                href={`/objekte/${p.id}`}
                className="rounded-2xl overflow-hidden border block"
                style={{ borderColor: "rgba(184,146,74,0.25)" }}
              >
                <div
                  className="h-32 flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #16283F, #1F3D2E)" }}
                >
                  <span className="text-[10px] tracking-widest uppercase px-2 py-1 rounded-full self-start ml-3 mt-3" style={{ background: "rgba(252,250,246,0.9)", color: "#16283F" }}>
                    {p.tag}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium mb-1" style={{ color: "#16283F" }}>{p.title}</h3>
                  <p className="text-xs mb-2" style={{ color: "#B8924A" }}>{p.location}</p>
                  <p className="text-base font-light" style={{ color: "#16283F" }}>{fmtPrice(p.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
