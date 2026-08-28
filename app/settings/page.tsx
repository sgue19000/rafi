"use client";
import { Providers } from "@/components/Providers";
import { useStore } from "@/components/Store";
import { demoState, emptyState } from "@/lib/seed";
import { exportState, importState } from "@/lib/storage";

function Settings() {
  const { ready, state, setState } = useStore();
  if (!ready) return <p>Loading…</p>;
  function download() {
    const blob = new Blob([exportState(state)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "termline-export.json";
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Settings</h2>
      <label className="block text-sm"><span className="mb-1 block text-ink/70">Base currency</span>
        <input className="w-full rounded-xl border border-line bg-white p-3" value={state.baseCurrency} maxLength={3} onChange={(e) => setState({ ...state, baseCurrency: e.target.value.toUpperCase().slice(0, 3) })} />
      </label>
      <label className="block text-sm"><span className="mb-1 block text-ink/70">Locale</span>
        <input className="w-full rounded-xl border border-line bg-white p-3" value={state.locale} onChange={(e) => setState({ ...state, locale: e.target.value.slice(0, 12) })} />
      </label>
      <div className="grid gap-2">
        <button className="rounded-xl bg-accent py-3 text-white" onClick={() => setState(demoState())}>Load demo household</button>
        <button className="rounded-xl border border-line bg-white py-3" onClick={download}>Export JSON</button>
        <label className="rounded-xl border border-line bg-white py-3 text-center">Import JSON
          <input type="file" accept="application/json" className="hidden" onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            setState(importState(await file.text()));
          }} />
        </label>
        <button className="rounded-xl border border-danger/40 py-3 text-danger" onClick={() => setState(emptyState())}>Reset this device</button>
      </div>
      <p className="text-sm text-ink/60">Data stays in this browser until you export it or connect Postgres. No bank login. No AI core.</p>
    </div>
  );
}
export default function Page() { return <Providers><Settings /></Providers>; }
