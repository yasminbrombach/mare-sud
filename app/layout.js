import "./globals.css";
import BottomNav from "@/components/BottomNav";

export const metadata = {
  title: "Mare Sud – Luxury Real Estate Mallorca",
  description: "KI-gestützter Property Companion für Mallorca",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>
        <div className="pb-16">{children}</div>
        <BottomNav />
      </body>
    </html>
  );
}
