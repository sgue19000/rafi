import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-lg px-4 py-16">
      <p className="text-xs uppercase tracking-[0.18em] text-accent">Termline</p>
      <h1 className="mt-2 font-serif text-3xl">Page not found</h1>
      <p className="mt-2 text-ink/70">That route does not exist. The board is still here.</p>
      <Link href="/" className="mt-6 inline-block rounded-xl bg-accent px-4 py-3 text-white">Back to board</Link>
    </main>
  );
}
