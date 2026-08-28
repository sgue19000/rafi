"use client";
import Link from "next/link";
import { Providers } from "@/components/Providers";
import { useStore } from "@/components/Store";
import { needsAttention, urgencyScore } from "@/lib/review";
import { formatMoney, annualize } from "@/lib/money";
import { daysUntil } from "@/lib/dates";

function Review() {
  const { ready, state, upsertTerm } = useStore();
  if (!ready) return <p>Loading…</p>;
  const queue = state.terms.filter((t) => needsAttention(t)).sort((a, b) => urgencyScore(b) - urgencyScore(a));
  const yearlyAtRisk = queue.reduce((s, t) => s + annualize(t.amount, t.cadence), 0);
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Review queue</h2>
      <p className="text-sm text-ink/70">{queue.length} items in a notice window. Annualized value in play: {formatMoney(yearlyAtRisk, state.baseCurrency, state.locale)}.</p>
      {queue.length === 0 ? <p className="rounded-2xl border border-dashed border-line p-4 text-sm">Queue is clear.</p> : null}
      <ul className="space-y-3">
        {queue.map((t) => (
          <li key={t.id} className="rounded-2xl border border-line bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <Link href={`/terms/${t.id}`} className="font-medium hover:underline">{t.name}</Link>
                <p className="text-sm text-ink/60">{t.vendor} · {daysUntil(t.nextDate)}d · {formatMoney(t.amount, t.currency, state.locale)}</p>
              </div>
              <span className="text-xs text-ink/50">score {urgencyScore(t)}</span>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2 text-sm">
              {(["keep","review","switch","cancel"] as const).map((d) => (
                <button key={d} className="rounded-lg border border-line py-2 capitalize" onClick={() => upsertTerm({ id: t.id, decision: d })}>{d}</button>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default function Page() { return <Providers><Review /></Providers>; }
