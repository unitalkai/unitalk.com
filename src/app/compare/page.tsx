import type { Metadata } from "next";
import { ComparePage } from "@/components/compare-page";
import { marketingMetadata } from "@/lib/marketing-language";

export const metadata: Metadata = marketingMetadata("/compare", "en", "Compare — What’s the difference?", "Compare AI work tools by delegated work, context, contact interaction and control. Explore where Unitalk’s AI Collaborator fits.");

export default function EnglishComparePage() {
  return <ComparePage language="en" />;
}
