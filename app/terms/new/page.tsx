"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Providers } from "@/components/Providers";
import { useStore } from "@/components/Store";
import type { Cadence, Kind } from "@/lib/types";

function Form() {
  const { state, upsertTerm } = useStore();
  const router = useRouter();
  const [error, setError] = useState("");
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const nextDate = String(data.get("nextDate") || "");
    const amount = Number(data.get("amount") || 0);
    if (!name || name.length > 80) { setError("Name is required and must be under 80 characters."); return; }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(nextDate)) { setError("Pick a valid next date."); return; }
    if (!Number.isFinite(amount) || amount < 0 || amount > 1000000) { setError("Amount must be between 0 and 1,000,000."); return; }
    const id = upsertTerm({
      name,
      vendor: String(data.get("vendor") || "").trim().slice(0, 80),
      kind: String(data.get("kind")) as Kind,
      cadence: String(data.get("cadence")) as Cadence,
      amount,
      currency: String(data.get("currency") || state.baseCurrency),
      nextDate,
      noticeDays: Math.min(365, Math.max(0, Number(data.get("noticeDays") || 7))),
      autoRenew: data.get("autoRenew") === "on",
      ownerName: String(data.get("ownerName") || state.members[0]?.name || "You"),
      notes: String(data.get("notes") || "").slice(0, 500),
      cancelUrl: String(data.get("cancelUrl") || "").slice(0, 300),
      decision: "review",
    });
    router.push(`/terms/${id}`);
  }
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold">Add a term</h2>
      {error ? <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-danger">{error}</p> : null}
      <Field label="Name" name="name" required placeholder="Rent, gym, passport" />
      <Field label="Vendor" name="vendor" placeholder="Who bills or issues it" />
      <div className="grid grid-cols-2 gap-3">
        <Select label="Kind" name="kind" options={["subscription","contract","document","warranty","membership","utility","other"]} />
        <Select label="Cadence" name="cadence" options={["monthly","yearly","quarterly","weekly","once"]} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Amount" name="amount" type="number" step="0.01" min="0" defaultValue="0" />
        <Field label="Currency" name="currency" defaultValue={state.baseCurrency} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Next date" name="nextDate" type="date" required />
        <Field label="Notice days" name="noticeDays" type="number" min="0" max="365" defaultValue="7" />
      </div>
      <Select label="Owner" name="ownerName" options={state.members.map((m) => m.name)} />
      <Field label="Cancel or renew URL" name="cancelUrl" placeholder="https://" />
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="autoRenew" defaultChecked className="h-4 w-4" /> Auto-renews</label>
      <label className="block text-sm"><span className="mb-1 block text-ink/70">Notes</span><textarea name="notes" rows={3} className="w-full rounded-xl border border-line bg-white p-3" /></label>
      <button type="submit" className="w-full rounded-xl bg-accent px-4 py-3 text-white">Save term</button>
    </form>
  );
}
function Field(props: { label: string; name: string; type?: string; required?: boolean; placeholder?: string; defaultValue?: string; step?: string; min?: string; max?: string }) {
  return <label className="block text-sm"><span className="mb-1 block text-ink/70">{props.label}</span><input {...props} className="w-full rounded-xl border border-line bg-white p-3" /></label>;
}
function Select({ label, name, options }: { label: string; name: string; options: string[] }) {
  return <label className="block text-sm"><span className="mb-1 block text-ink/70">{label}</span><select name={name} className="w-full rounded-xl border border-line bg-white p-3">{options.map((o) => <option key={o} value={o}>{o}</option>)}</select></label>;
}
export default function Page() { return <Providers><Form /></Providers>; }
