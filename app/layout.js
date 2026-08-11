import "./globals.css";

export const metadata = {
  title: "Mare Sud – Luxury Real Estate Mallorca",
  description: "KI-gestützter Property Companion für Mallorca",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
