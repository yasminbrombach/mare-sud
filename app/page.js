export const dynamic = "force-dynamic";

import { supabase } from "@/lib/supabaseClient";

export default async function Home() {
  const result = await supabase
    .from("properties")
    .select("id, title");

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <h1 className="text-3xl font-light mb-6" style={{ color: "#16283F" }}>
          Mare Sud – Debug 3
        </h1>
        <div className="rounded-xl px-4 py-3 mb-4 text-left" style={{ background: "#E4D6BE" }}>
          <p className="text-[10px] uppercase tracking-widest mb-2" style={{ color: "#16283F" }}>
            Komplette Antwort der Datenbank
          </p>
          <pre className="text-xs whitespace-pre-wrap" style={{ color: "#16283F" }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      </div>
    </main>
  );
}
