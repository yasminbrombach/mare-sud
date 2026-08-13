"use client";

import { useState } from "react";

const fmt = (n) => Math.round(n).toLocaleString("de-DE") + " €";

function calcITP(price) {
  const brackets = [
    { upTo: 400000, rate: 0.08 },
    { upTo: 600000, rate: 0.09 },
    { upTo: 1000000, rate: 0.10 },
    { upTo: 3000000, rate: 0.12 },
    { upTo: Infinity, rate: 0.13 },
  ];
  let tax = 0;
  let prevLimit = 0;
  for (const b of brackets) {
    if (price <= prevLimit) break;
    const taxableInBracket = Math.min(price, b.upTo) - prevLimit;
    tax += taxableInBracket * b.rate;
    prevLimit = b.upTo;
  }
  return tax;
}

export default function RechnerPage() {
  const [price, setPrice] = useState(1500000);
  const [downPct, setDownPct] = useState(30);
  const [rate, setRate] = useState(3.5);
  const [years, setYears] = useState(20);
  const [isNewBuild, setIsNewBuild] = useState(false);

  const down = price * (downPct / 100);
  const loan = price - down;
  const monthlyRate = rate / 100 / 12;
  const n = years * 12;
  const monthly = monthlyRate > 0 ? (loan * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n)) : loan / n;

  const purchaseTax = isNewBuild ? price * 0.10 + price * 0.015 : calcITP(price);
  const notaryRegistry = price * 0.012;
  const lawyer = price * 0.01;
  const totalCosts = purchaseTax + notaryRegistry + lawyer;
  const totalCash = down + totalCosts;

  const Field = ({ label, value, onChange, min, max, step, suffix }) => (
    <div className="mb-5">
      <div className="flex justify-between items-baseline mb-1.5">
        <label className="text-xs uppercase tracking-widest" style={{ color: "#B8924A" }}>{label}</label>
        <span className="text-sm font-medium" style={{ color: "#16283F" }}>
          {suffix === "€" ? fmt(value) : `${value}${suffix}`}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        style={{ accentColor: "#B8924A" }}
      />
    </div>
  );

  return (
    <main className="min-h-screen" style={{ background: "#EDE7DC" }}>
      <div className="max-w-md mx-auto min-h-screen" style={{ background: "#FCFAF6" }}>
        <div className="px-5 pt-6 pb-10">
          <h1 className="text-xl font-light mb-1" style={{ color: "#16283F" }}>Kostenrechner</h1>
          <p className="text-xs mb-5" style={{ color: "#6b7280" }}>Alle Nebenkosten auf einen Blick</p>

          <div className="flex rounded-full overflow-hidden border mb-5 w-fit" style={{ borderColor: "#B8924A" }}>
            {[{ v: false, l: "Bestandsimmobilie" }, { v: true, l: "Neubau" }].map((opt) => (
              <button
                key={opt.l}
                onClick={() => setIsNewBuild(opt.v)}
                className="text-xs px-3 py-1.5"
                style={{ background: isNewBuild === opt.v ? "#B8924A" : "transparent", color: "#16283F" }}
              >
                {opt.l}
              </button>
            ))}
          </div>

          <Field label="Kaufpreis" value={price} onChange={setPrice} min={200000} max={10000000} step={50000} suffix="€" />
          <Field label="Eigenkapital" value={downPct} onChange={setDownPct} min={10} max={100} step={5} suffix="%" />
          <Field label="Zinssatz" value={rate} onChange={setRate} min={1} max={7} step={0.1} suffix="%" />
          <Field label="Laufzeit" value={years} onChange={setYears} min={5} max={30} step={1} suffix=" Jahre" />

          <div className="w-full h-px my-5" style={{ background: "linear-gradient(90deg, transparent, #B8924A, transparent)" }} />

          <div className="rounded-2xl p-5" style={{ background: "#16283F" }}>
            <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "#D6B876" }}>Monatliche Rate</p>
            <p className="text-2xl font-light mb-4" style={{ color: "#FCFAF6" }}>{fmt(monthly)}</p>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span style={{ color: "#E4D6BE" }}>{isNewBuild ? "IVA (10%) + AJD (1,5%)" : "ITP gestaffelt"}</span>
                <span style={{ color: "#FCFAF6" }}>{fmt(purchaseTax)}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "#E4D6BE" }}>Notar & Registro</span>
                <span style={{ color: "#FCFAF6" }}>{fmt(notaryRegistry)}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "#E4D6BE" }}>Anwalt</span>
                <span style={{ color: "#FCFAF6" }}>{fmt(lawyer)}</span>
              </div>
            </div>
            <div className="w-full h-px my-3" style={{ background: "linear-gradient(90deg, transparent, #B8924A, transparent)" }} />
            <div className="flex justify-between">
              <span className="text-sm" style={{ color: "#D6B876" }}>Gesamt benötigtes Kapital</span>
              <span className="text-lg font-medium" style={{ color: "#FCFAF6" }}>{fmt(totalCash)}</span>
            </div>
          </div>

          <p className="text-[10px] mt-3" style={{ color: "#9ca3af" }}>
            Gestaffeltes ITP Balearen (8–13%) bzw. IVA+AJD bei Neubau. Vereinfachte Schätzung, ersetzt keine steuerliche Beratung.
          </p>
        </div>
      </div>
    </main>
  );
}
