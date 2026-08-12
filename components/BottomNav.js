"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "Home" },
  { href: "/objekte", label: "Objekte" },
  { href: "/rechner", label: "Rechner" },
  { href: "/mehr", label: "Mehr" },
  { href: "/profil", label: "Profil" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 flex border-t z-50"
      style={{ borderColor: "rgba(184,146,74,0.2)", background: "#FCFAF6" }}
    >
      {TABS.map((tab) => {
        const active = pathname === tab.href || (tab.href !== "/" && pathname.startsWith(tab.href));
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="flex-1 flex flex-col items-center py-3 relative"
          >
            {active && (
              <span
                className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5"
                style={{ background: "#B8924A" }}
              />
            )}
            <span
              className="text-[11px] tracking-wide"
              style={{ color: active ? "#16283F" : "#9ca3af" }}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
