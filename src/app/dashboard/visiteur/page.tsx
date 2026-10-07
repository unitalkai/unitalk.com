import type { Metadata } from "next";
import { VisitorDashboard } from "@/components/visitor-dashboard";
import { SiteHeader, DemoNotice } from "@/components/site-shell";

export const metadata: Metadata = { title: "Espace visiteur — Démo", robots: { index: false, follow: false } };

export default async function VisitorPage({ searchParams }: PageProps<"/dashboard/visiteur">) {
  const query = await searchParams;
  const initialUrl = typeof query.url === "string" ? query.url : undefined;
  return <><SiteHeader role="visiteur" /><DemoNotice role="visiteur" /><VisitorDashboard initialUrl={initialUrl} /></>;
}
