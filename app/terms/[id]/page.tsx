"use client";
import { useParams, useRouter } from "next/navigation";
import { Providers } from "@/components/Providers";
import { useStore } from "@/components/Store";
import { daysUntil, addCadence } from "@/lib/dates";
import { annualize, formatMoney } from "@/lib/money";
import type { Decision } from "@/lib/types";

function Detail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { ready, state, upsertTerm, removeTerm } = useStore();
  if (!ready) return <p>Loading…</p>;
  const term = state.terms.find((t) => t.id === id);
  if (!term) return <p>Term not found.</p>;
  const days = daysUntil(term.nextDate);
  function decide(decision: Decision) {
    if (!term) return;
    if (decision === "done") {
      upsertTerm({ id: term.id, decision: "done", nextDate: term.cadence === "once" ? term.nextDate : addCadence(term.nextDate, term.cadence) });
    } else {
      upsertTerm({ id: term.id, decision });
    }
  }
  return (
    <article className="space-y-5">
      <header>
        <p className="text-sm capitalize text-ink/60">{term.kind} · {term.vendor || "No vendor"}</p>
        <h2 className="font-serif text-3xl">{term.name}</h2>
        <p className="mt-1 text-ink/70">{formatMoney(term.amount, term.currency, state.locale)} / {term.cadence}{term.cadence !== "once" ? ` · ${formatMoney(annualize(term.amount, term.cadence), term.currency, state.locale)} / year` : ""}</p>
      </header>
      <dl className="grid grid-cols-2 gap-3 text-sm">
        <Info label="Next date" value={term.nextDate} />
        <Info label="Countdown" value={days < 0 ? `${Math.abs(days)} days overdue` : `${days} days`} />
        <Info label="Notice window" value={`${term.noticeDays} days`} />
        <Info label="Auto-renew" value={term.autoRenew ? "Yes" : "No"} />
        <Info label="Owner" value={term.ownerName} />
        <Info label="Decision" value={term.decision} />
      </dl>
      {term.notes ? <p className="rounded-2xl border border-line bg-white p-4 text-sm">{term.notes}</p> : null}
      {term.cancelUrl ? <a className="block text-sm text-accent underline" href={term.cancelUrl} target="_blank" rel="noreferrer">Open vendor page</a> : null}
      <section className="space-y-2">
        <h3 className="font-semibold">Decide</h3>
        <div className="grid grid-cols-2 gap-2">
          {(["keep","review","switch","cancel"] as Decision[]).map((d) => (
            <button key={d} className="rounded-xl border border-line bg-white px-3 py-2 capitalize" onClick={() => decide(d)}>{d}</button>
          ))}
        </div>
        <button className="w-full rounded-xl bg-accent px-4 py-3 text-white" onClick={() => decide("done")}>Mark handled and roll date</button>
      </section>
      {term.decision === "cancel" ? (
        <section className="rounded-2xl border border-line bg-white p-4">
          <h3 className="font-semibold">Cancel playbook</h3>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-ink/80">
            <li>Find the original receipt or confirmation email.</li>
            <li>Open the vendor cancel page before the notice deadline.</li>
            <li>Screenshot the confirmation and keep it for one billing cycle.</li>
            <li>Watch the next statement for a last charge or refund.</li>
            <li>If charged after cancel, dispute with the payment method.</li>
          </ol>
        </section>
      ) : null}
      <button className="w-full rounded-xl border border-danger/40 px-4 py-3 text-danger" onClick={() => { if (confirm("Delete this term?")) { removeTerm(term.id); router.push("/"); } }}>Delete</button>
    </article>
  );
}
function Info({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-line bg-white p-3"><dt className="text-ink/50">{label}</dt><dd className="capitalize">{value}</dd></div>;
}
export default function Page() { return <Providers><Detail /></Providers>; }
