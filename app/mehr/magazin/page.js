export const dynamic = "force-dynamic";

import { supabase } from "@/lib/supabaseClient";

export default async function MagazinPage() {
  const { data: articles } = await supabase
    .from("magazine_articles")
    .select("*")
    .order("created_at", { ascending: true });

  return (
    <main className="min-h-screen" style={{ background: "#EDE7DC" }}>
      <div className="max-w-md mx-auto min-h-screen" style={{ background: "#FCFAF6" }}>
        <div className="px-5 pt-6 pb-10">
          <h1 className="text-xl font-light mb-1" style={{ color: "#16283F" }}>Magazin</h1>
          <p className="text-xs mb-5" style={{ color: "#6b7280" }}>
            Wissen, Markt und Mallorca-Lebensgefühl
          </p>

          {(!articles || articles.length === 0) && (
            <p className="text-xs" style={{ color: "#9ca3af" }}>Noch keine Artikel – kommt gleich.</p>
          )}

          <div className="flex flex-col gap-3">
            {articles?.map((a) => (
              <div
                key={a.id}
                className="rounded-2xl overflow-hidden"
                style={{ border: "1px solid rgba(184,146,74,0.25)" }}
              >
                <div className="h-16 flex items-center px-4" style={{ background: "linear-gradient(135deg, #1F3D2E, #16283F)" }} />
                <div className="p-4">
                  <p className="text-[10px] tracking-widest uppercase mb-1" style={{ color: "#B8924A" }}>
                    {a.category} · {a.read_time}
                  </p>
                  <h3 className="text-sm font-medium leading-snug mb-2" style={{ color: "#16283F" }}>{a.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "#4b5563" }}>{a.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
