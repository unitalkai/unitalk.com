import type { Metadata } from "next";
import { OwnerDashboard } from "@/components/owner-dashboard";
import { SiteHeader, DemoNotice } from "@/components/site-shell";

export const metadata: Metadata = { title: "Espace Patrick — Démo", robots: { index: false, follow: false } };

export default function PatrickDashboard() {
  return <><SiteHeader role="patrick" /><DemoNotice role="patrick" /><OwnerDashboard /></>;
}
