"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "Board" },
  { href: "/review", label: "Review" },
  { href: "/terms/new", label: "Add" },
  { href: "/household", label: "Household" },
  { href: "/settings", label: "Settings" },
];

export function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-4 pb-24 pt-6 sm:pb-8">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-[0.18em] text-accent">Termline</p>
        <h1 className="font-serif text-3xl leading-tight">Notice before it renews.</h1>
      </header>
      <main className="flex-1">{children}</main>
      <nav aria-label="Primary" className="fixed inset-x-0 bottom-0 border-t border-line bg-paper/95 backdrop-blur sm:static sm:mt-10 sm:border-0 sm:bg-transparent">
        <ul className="mx-auto flex max-w-3xl justify-between px-4 py-3 text-sm sm:justify-start sm:gap-5">
          {NAV.map((item) => {
            const active = path === item.href;
            return (
              <li key={item.href}>
                <Link href={item.href} className={active ? "font-semibold text-accent" : "text-ink/70"}>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
