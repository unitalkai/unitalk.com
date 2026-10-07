import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

const body = Archivo({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Unitalk — Votre Collaborateur IA", template: "%s | Unitalk" },
  description:
    "Rencontrez le Collaborateur IA de Patrick Chassany. Commencez le vôtre avec une URL publique.",
  metadataBase: new URL("https://unitalk.com"),
  openGraph: {
    type: "website",
    title: "Unitalk — Votre Collaborateur IA",
    description:
      "Votre présence. Même quand vous n’êtes pas là. Rencontrez votre Collaborateur IA.",
    url: "https://unitalk.com",
    siteName: "Unitalk",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unitalk — Votre Collaborateur IA",
    description: "Rencontrez le Collaborateur de Patrick. Créez le vôtre avec une URL.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={body.variable}>
      <body><a className="skip-link" href="#main-content">Aller au contenu</a>{children}</body>
    </html>
  );
}
