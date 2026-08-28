"use client";
import { FormEvent } from "react";
import { Providers } from "@/components/Providers";
import { useStore } from "@/components/Store";
import { uid } from "@/lib/id";
import type { Role } from "@/lib/types";

function Household() {
  const { ready, state, setState } = useStore();
  if (!ready) return <p>Loading…</p>;
  function addMember(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim().slice(0, 40);
    if (!name) return;
    setState({ ...state, members: [...state.members, { id: uid("m"), name, role: String(data.get("role")) as Role }] });
    e.currentTarget.reset();
  }
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Household</h2>
      <label className="mt-3 block text-sm"><span className="mb-1 block text-ink/70">Name</span>
        <input className="w-full rounded-xl border border-line bg-white p-3" value={state.householdName} onChange={(e) => setState({ ...state, householdName: e.target.value.slice(0, 60) })} />
      </label>
      <ul className="space-y-2">
        {state.members.map((m) => (
          <li key={m.id} className="flex items-center justify-between rounded-2xl border border-line bg-white p-4">
            <div><p className="font-medium">{m.name}</p><p className="text-sm capitalize text-ink/60">{m.role}</p></div>
            {m.role !== "owner" ? <button className="text-sm text-danger" onClick={() => setState({ ...state, members: state.members.filter((x) => x.id !== m.id) })}>Remove</button> : null}
          </li>
        ))}
      </ul>
      <form onSubmit={addMember} className="space-y-3 rounded-2xl border border-line bg-white p-4">
        <h3 className="font-medium">Add member</h3>
        <p className="text-sm text-ink/60">Local demo stores members on this device. Server invites need DATABASE_URL.</p>
        <input name="name" required placeholder="Name" className="w-full rounded-xl border border-line p-3" />
        <select name="role" className="w-full rounded-xl border border-line p-3"><option value="editor">editor</option><option value="viewer">viewer</option></select>
        <button className="w-full rounded-xl bg-accent py-3 text-white">Add member</button>
      </form>
    </div>
  );
}
export default function Page() { return <Providers><Household /></Providers>; }
