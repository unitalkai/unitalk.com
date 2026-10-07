import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { CollaboratorOfferProvider } from "@/components/collaborator-offer-context";
import "./globals.css";

const body = Archivo({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Unitalk — Votre Collaborateur IA", template: "%s | Unitalk" },
  description:
    "Rencontrez votre Collaborateur IA. Il est conçu pour comprendre vos relations professionnelles et travailler pour vous.",
  metadataBase: new URL("https://unitalk.com"),
  openGraph: {
    type: "website",
    title: "Unitalk — Votre Collaborateur IA",
    description:
      "Votre Collaborateur IA. Il travaille pour vous. Il vous appartient.",
    url: "https://unitalk.com",
    siteName: "Unitalk",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unitalk — Votre Collaborateur IA",
    description: "Rencontrez votre Collaborateur IA. Découvrez aussi celui de Patrick Chassany.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={body.variable}>
      <body><a className="skip-link" href="#main-content">Aller au contenu / Skip to content</a><CollaboratorOfferProvider>{children}</CollaboratorOfferProvider></body>
    </html>
  );
}
