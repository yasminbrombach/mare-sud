import { supabase } from "@/lib/supabaseClient";

export default async function Home() {
  const { count } = await supabase
    .from("properties")
    .select("*", { count: "exact", head: true });

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <p
          className="text-[10px] tracking-[0.25em] uppercase mb-3"
          style={{ color: "#B8924A" }}
        >
          Mallorca · Luxury Real Estate
        </p>
        <h1
          className="text-3xl font-light mb-6"
          style={{ color: "#16283F" }}
        >
          Mare Sud
        </h1>
        <div
          className="rounded-2xl px-6 py-5 mb-4"
          style={{ background: "#16283F" }}
        >
          <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#D6B876" }}>
            Verbindung zur Datenbank
          </p>
          <p className="text-lg font-light" style={{ color: "#FCFAF6" }}>
            {count === null ? "Noch keine Verbindung" : `${count} Objekte in der Datenbank`}
          </p>
        </div>
        <p className="text-xs" style={{ color: "#6b7280" }}>
          Wenn hier eine Zahl steht (auch 0), funktioniert die Verbindung zu
          Supabase. Als Nächstes ziehen wir die restlichen Screens aus dem
          Prototyp nach.
        </p>
      </div>
    </main>
  );
}
