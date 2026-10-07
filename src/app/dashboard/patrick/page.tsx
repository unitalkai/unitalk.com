import type { Metadata } from "next";
import { OwnerDashboard } from "@/components/owner-dashboard";
import "../../owner.css";

export const metadata: Metadata = { title: "Espace Patrick — Démo", robots: { index: false, follow: false } };

export default function PatrickDashboard() {
  return <OwnerDashboard />;
}
