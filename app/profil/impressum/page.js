import Link from "next/link";

export default function ImpressumPage() {
  return (
    <main className="min-h-screen" style={{ background: "#EDE7DC" }}>
      <div className="max-w-md mx-auto min-h-screen" style={{ background: "#FCFAF6" }}>
        <div className="px-5 pt-6 pb-10">
          <Link href="/profil" className="text-xs mb-4 inline-block" style={{ color: "#B8924A" }}>
            ← Zurück
          </Link>
          <h1 className="text-xl font-light mb-4" style={{ color: "#16283F" }}>Impressum</h1>
          <div className="rounded-xl px-4 py-3 mb-4" style={{ background: "#E4D6BE" }}>
            <p className="text-[11px]" style={{ color: "#16283F" }}>
              Dies ist eine Platzhalter-Vorlage – kein rechtsgültiger Text. Vor dem Livegang von einem Anwalt prüfen und ausfüllen lassen.
            </p>
          </div>
          <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "#4b5563" }}>
{`Mare Sud
[Firmenname / Rechtsform]
[Straße, Hausnummer]
[PLZ, Ort], Spanien

Vertreten durch: [Name]
Handelsregister: [Nummer, Registergericht]
USt-IdNr. / NIF: [Nummer]

Kontakt:
E-Mail: [E-Mail-Adresse]
Telefon: [Telefonnummer]`}
          </p>
        </div>
      </div>
    </main>
  );
}
