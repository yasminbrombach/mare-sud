"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function RegistrierenPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setLoading(false);
      setError(error.message);
      return;
    }

    if (data.user) {
      await supabase.from("profiles").insert({ id: data.user.id, role: "owner" });
    }

    setLoading(false);
    setDone(true);
    setTimeout(() => {
      router.push("/profil");
      router.refresh();
    }, 1200);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6" style={{ background: "#EDE7DC" }}>
      <div className="max-w-md w-full mx-auto rounded-2xl p-6" style={{ background: "#FCFAF6" }}>
        <h1 className="text-xl font-light mb-1" style={{ color: "#16283F" }}>Konto erstellen</h1>
        <p className="text-xs mb-5" style={{ color: "#6b7280" }}>Willkommen bei Mare Sud</p>

        {done ? (
          <p className="text-sm" style={{ color: "#16283F" }}>Konto erstellt, du wirst weitergeleitet...</p>
        ) : (
          <form onSubmit={handleSignup} className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="E-Mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-sm px-4 py-2.5 rounded-xl outline-none"
              style={{ background: "#fff", border: "1px solid #E4D6BE", color: "#16283F" }}
            />
            <input
              type="password"
              placeholder="Passwort (mind. 6 Zeichen)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="text-sm px-4 py-2.5 rounded-xl outline-none"
              style={{ background: "#fff", border: "1px solid #E4D6BE", color: "#16283F" }}
            />

            {error && <p className="text-xs" style={{ color: "#b91c1c" }}>{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full text-sm px-4 py-3 rounded-full font-medium mt-2"
              style={{ background: "#B8924A", color: "#16283F", opacity: loading ? 0.6 : 1 }}
            >
              {loading ? "Einen Moment..." : "Konto erstellen"}
            </button>
          </form>
        )}

        <p className="text-xs mt-4 text-center" style={{ color: "#6b7280" }}>
          Schon ein Konto?{" "}
          <Link href="/login" style={{ color: "#B8924A" }}>
            Jetzt anmelden
          </Link>
        </p>
      </div>
    </main>
  );
}
