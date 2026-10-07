import type { Metadata } from "next";
import Link from "next/link";
import { Brand, SiteFooter } from "@/components/site-shell";
import { Icon } from "@/components/icons";
import "./login.css";

export const metadata: Metadata = {
  title: "Log in — Unitalk customers",
  description: "Sign in to your existing Unitalk account.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return <div lang="en" className="customer-login-page">
    <header className="customer-login-header content-container"><Brand language="en" /><Link href="/" className="text-link">Back to Unitalk <Icon name="arrow" /></Link></header>
    <main id="main-content" className="customer-login-main content-container">
      <div className="customer-login-content"><h1>Welcome back.</h1><p>Log in to your existing Unitalk account.</p><div className="customer-login-status"><Icon name="lock" /><h2>Customer sign-in is not available yet.</h2><p>We’re preparing account access. Please return when sign-in is available.</p></div><Link href="/" className="button button-outline">Back to the homepage <Icon name="arrow" /></Link></div>
    </main>
    <SiteFooter language="en" />
  </div>;
}
