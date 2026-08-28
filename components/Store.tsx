"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { AppState, Term } from "@/lib/types";
import { emptyState } from "@/lib/seed";
import { loadState, saveState } from "@/lib/storage";
import { uid } from "@/lib/id";

interface Store {
  ready: boolean;
  state: AppState;
  setState: (next: AppState) => void;
  upsertTerm: (term: Partial<Term> & { id?: string }) => string;
  removeTerm: (id: string) => void;
}

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setStateRaw] = useState<AppState>(emptyState());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setStateRaw(loadState());
    setReady(true);
  }, []);

  const setState = (next: AppState) => {
    setStateRaw(next);
    saveState(next);
  };

  const value = useMemo<Store>(() => ({
    ready,
    state,
    setState,
    upsertTerm: (partial) => {
      const now = new Date().toISOString();
      const id = partial.id ?? uid("t");
      const existing = state.terms.find((t) => t.id === id);
      const term: Term = {
        id,
        name: partial.name ?? existing?.name ?? "Untitled",
        vendor: partial.vendor ?? existing?.vendor ?? "",
        kind: partial.kind ?? existing?.kind ?? "other",
        cadence: partial.cadence ?? existing?.cadence ?? "monthly",
        amount: partial.amount ?? existing?.amount ?? 0,
        currency: partial.currency ?? existing?.currency ?? state.baseCurrency,
        nextDate: partial.nextDate ?? existing?.nextDate ?? now.slice(0, 10),
        noticeDays: partial.noticeDays ?? existing?.noticeDays ?? 7,
        autoRenew: partial.autoRenew ?? existing?.autoRenew ?? true,
        decision: partial.decision ?? existing?.decision ?? "review",
        ownerName: partial.ownerName ?? existing?.ownerName ?? state.members[0]?.name ?? "You",
        notes: partial.notes ?? existing?.notes ?? "",
        cancelUrl: partial.cancelUrl ?? existing?.cancelUrl ?? "",
        createdAt: existing?.createdAt ?? now,
        updatedAt: now,
      };
      const terms = existing ? state.terms.map((t) => (t.id === id ? term : t)) : [...state.terms, term];
      setState({ ...state, terms });
      return id;
    },
    removeTerm: (id) => setState({ ...state, terms: state.terms.filter((t) => t.id !== id) }),
  }), [ready, state]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore outside provider");
  return ctx;
}
