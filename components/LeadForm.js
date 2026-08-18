"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LeadForm({ open, onClose, type, subtitle, propertyId }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSending(true);

    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase.from("leads").insert({
      type: type,
      subtitle: subtitle || null,
      name: name,
      email: email,
      phone: phone || null,
      message: message || null,
      property_id: propertyId || null,
      submitted_by: user ? user.id : null,
    });

    setSending(false);

    if (error) {
      setError("Etwas ist schiefgelaufen. Bitte nochmal versuchen.");
      return;
    }
    setSent(true);
  };

  const closeAndReset = () => {
    setSent(false);
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: "rgba(22,40,63,0.55)" }}
      onClick={closeAndReset}
    >
      <div
        className="w-full max-w-md rounded-t-3xl p-6 pb-8"
        style={{ background: "#FCFAF6" }}
        onClick={(e) => e.stopPropagation()}
      >
        {sent ? (
          <div className="py-6 text-center">
            <p className="text-base font-medium mb-1" style={{ color: "#16283F" }}>
              Danke{name ? ", " + name.split(" ")[0] : ""}!
            </p>
            <p className="text-xs mb-4" style={{ color: "#6b7280" }}>Wir melden uns in Kuerze bei Ihnen.</p>
            <button
              onClick={closeAndReset}
              className="text-xs px-5 py-2 rounded-full font-medium"
              style={{ background: "#16283F", color: "#FCFAF6" }}
            >
              Schliessen
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-medium" style={{ color: "#16283F" }}>Besichtigung anfragen</h3>
              <button onClick={closeAndReset} className="text-xs" style={{ color: "#9ca3af" }}>Abbrechen</button>
            </div>
            {subtitle && <p className="text-xs mb-4" style={{ color: "#B8924A" }}>{subtitle}</p>}

            <form onSubmit={submit} className="flex flex-col gap-2.5">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
                className="text-sm px-4 py-2.5 rounded-xl outline-none"
                style={{ background: "#fff", border: "1px solid #E4D6BE", color: "#16283F" }}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-Mail"
                required
                className="text-sm px-4 py-2.5 rounded-xl outline-none"
                style={{ background: "#fff", border: "1px solid #E4D6BE", color: "#16283F" }}
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Telefon (optional)"
                className="text-sm px-4 py-2.5 rounded-xl outline-none"
                style={{ background: "#fff", border: "1px solid #E4D6BE", color: "#16283F" }}
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Nachricht (optional)"
                rows={2}
                className="text-sm px-4 py-2.5 rounded-xl outline-none resize-none"
                style={{ background: "#fff", border: "1px solid #E4D6BE", color: "#16283F" }}
              />

              {error && <p className="text-xs" style={{ color: "#b91c1c" }}>{error}</p>}

              <button
                type="submit"
                disabled={sending}
                className="w-full mt-2 text-sm px-4 py-3 rounded-full font-medium"
                style={{ background: "#B8924A", color: "#16283F", opacity: sending ? 0.6 : 1 }}
              >
                {sending ? "Einen Moment..." : "Anfrage senden"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
