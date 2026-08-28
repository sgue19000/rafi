"use client";
import Link from "next/link";
import { Providers } from "@/components/Providers";
import { useStore } from "@/components/Store";
import { annualize, formatMoney, monthlyEquivalent } from "@/lib/money";
import { daysUntil } from "@/lib/dates";
import { needsAttention } from "@/lib/review";

function Board() {
  const { ready, state } = useStore();
  if (!ready) return <p>Loading board…</p>;
  const active = state.terms.filter((t) => t.decision !== "done");
  const monthly = active.reduce((sum, t) => sum + monthlyEquivalent(t.amount, t.cadence), 0);
  const yearly = active.reduce((sum, t) => sum + annualize(t.amount, t.cadence), 0);
  const due = active.filter((t) => needsAttention(t)).sort((a, b) => daysUntil(a.nextDate) - daysUntil(b.nextDate));
  const rest = active.filter((t) => !needsAttention(t)).sort((a, b) => daysUntil(a.nextDate) - daysUntil(b.nextDate));
  return (
    <div className="space-y-6">
      <section className="grid grid-cols-2 gap-3">
        <Stat label="This month" value={formatMoney(monthly, state.baseCurrency, state.locale)} />
        <Stat label="Annualized" value={formatMoney(yearly, state.baseCurrency, state.locale)} />
      </section>
      <section>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Needs a decision</h2>
          <Link className="text-sm text-accent" href="/review">Open review</Link>
        </div>
        {due.length === 0 ? <Empty text="Nothing in a notice window. Add a term or load the demo household from Settings." /> : (
          <ul className="space-y-2">{due.map((t) => <TermRow key={t.id} id={t.id} name={t.name} vendor={t.vendor} amount={formatMoney(t.amount, t.currency, state.locale)} days={daysUntil(t.nextDate)} decision={t.decision} />)}</ul>
        )}
      </section>
      <section>
        <h2 className="mb-2 text-lg font-semibold">Later</h2>
        {rest.length === 0 ? <Empty text="No later terms yet." /> : (
          <ul className="space-y-2">{rest.map((t) => <TermRow key={t.id} id={t.id} name={t.name} vendor={t.vendor} amount={formatMoney(t.amount, t.currency, state.locale)} days={daysUntil(t.nextDate)} decision={t.decision} />)}</ul>
        )}
      </section>
    </div>
  );
}
function Stat({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-line bg-white p-4"><p className="text-xs uppercase tracking-wide text-ink/60">{label}</p><p className="mt-1 text-xl font-semibold">{value}</p></div>;
}
function Empty({ text }: { text: string }) {
  return <p className="rounded-2xl border border-dashed border-line p-4 text-sm text-ink/70">{text}</p>;
}
function TermRow(props: { id: string; name: string; vendor: string; amount: string; days: number; decision: string }) {
  const label = props.days < 0 ? `${Math.abs(props.days)}d overdue` : props.days === 0 ? "today" : `${props.days}d`;
  return (
    <li>
      <Link href={`/terms/${props.id}`} className="block rounded-2xl border border-line bg-white p-4">
        <div className="flex items-start justify-between gap-3">
          <div><p className="font-medium">{props.name}</p><p className="text-sm text-ink/60">{props.vendor} · {props.amount}</p></div>
          <div className="text-right text-sm"><p className={props.days <= 7 ? "font-semibold text-warn" : "text-ink/70"}>{label}</p><p className="capitalize text-ink/50">{props.decision}</p></div>
        </div>
      </Link>
    </li>
  );
}
export default function Page() { return <Providers><Board /></Providers>; }
