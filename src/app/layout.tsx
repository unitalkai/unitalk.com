import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";

/* Display: a serif that carries identity. Body: a neutral sans that stays
   out of the way. Two families, one job each — see DESIGN.md. */

const display = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Patrick Chassany — AI Collaborator",
  description:
    "Meet Patrick Chassany's AI Collaborator. Ask it about his work, his companies, or Unitalk. Or give it something to do.",
  metadataBase: new URL("https://unitalk.com"),
  alternates: { canonical: "/@patrick-chassany" },
  openGraph: {
    type: "profile",
    title: "Patrick Chassany — AI Collaborator",
    description:
      "Meet Patrick Chassany's AI Collaborator. Ask it anything, or give it something to do.",
    url: "https://unitalk.com/@patrick-chassany",
    siteName: "Unitalk",
  },
  twitter: {
    card: "summary_large_image",
    title: "Patrick Chassany — AI Collaborator",
    description: "Meet Patrick's AI Collaborator. Or get your own.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}