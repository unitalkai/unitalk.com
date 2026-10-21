import { marketingPath, type MarketingLanguage } from "./marketing-language";

export function productNavigation(language: MarketingLanguage) {
  return [
    { href: marketingPath("/for-you", language), label: "For you" },
    { href: marketingPath("/team", language), label: "Your team" },
    { href: marketingPath("/community", language), label: "Your community" },
  ];
}
