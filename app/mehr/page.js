import Link from "next/link";

const ITEMS = [
  { href: "/mehr/lifestyle", title: "Lifestyle", desc: "Restaurants, Strände, Golf, Marinas & mehr entdecken" },
  { href: "/mehr/concierge", title: "Concierge", desc: "Geprüfte Dienstleister für Ihr Eigentum anfragen" },
  { href: "/mehr/magazin", title: "Magazin", desc: "Markt-Insights, Kaufwissen & Mallorca-Lebensgefühl" },
];

export default function MehrPage() {
  return (
    <main className="min-h-screen" style={{ background: "#EDE7DC" }}>
      <div className="max-w-md mx-auto min-h-screen" style={{ background: "#FCFAF6" }}>
        <div className="px-5 pt-6 pb-10">
          <h1 className="text-xl font-light mb-1" style={{ color: "#16283F" }}>Mehr</h1>
          <p className="text-xs mb-5" style={{ color: "#6b7280" }}>Alles rund um Ihr Eigentum und die Insel</p>

          <div className="flex flex-col gap-3">
            {ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between rounded-2xl px-4 py-4"
                style={{ background: "#FCFAF6", border: "1px solid rgba(184,146,74,0.25)" }}
              >
                <div>
                  <p className="text-sm font-medium" style={{ color: "#16283F" }}>{item.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#6b7280" }}>{item.desc}</p>
                </div>
                <span style={{ color: "#B8924A" }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
