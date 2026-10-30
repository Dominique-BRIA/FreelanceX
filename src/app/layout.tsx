import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Freelance X — Trouvez le bon prestataire",
    template: "%s · Freelance X",
  },
  description:
    "Maquette de Freelance X : plateforme de mise en relation entre clients et prestataires indépendants, avec paiement sécurisé par séquestre.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full bg-canvas font-sans text-ink">{children}</body>
    </html>
  );
}
