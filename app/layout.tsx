import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Termline — notice before money and dates slip",
  description: "Track subscriptions, contracts, warranties, and document expiries without linking a bank.",
  applicationName: "Termline",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
