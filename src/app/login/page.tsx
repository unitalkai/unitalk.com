import { CustomerLogin } from "@/components/customer-login";
import { marketingMetadata } from "@/lib/marketing-language";

export const metadata = { ...marketingMetadata("/login", "en", "Log in — Unitalk customers", "Sign in to your existing Unitalk account."), robots: { index: false, follow: false } };
export default function LoginPage() { return <CustomerLogin />; }
