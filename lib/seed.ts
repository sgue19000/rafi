import type { AppState } from "./types";

export function emptyState(): AppState {
  return {
    version: 1,
    householdName: "My household",
    baseCurrency: "USD",
    locale: "en",
    members: [{ id: "m1", name: "You", role: "owner" }],
    terms: [],
  };
}

export function demoState(): AppState {
  const today = new Date();
  const iso = (offset: number) => {
    const d = new Date(today);
    d.setDate(d.getDate() + offset);
    return d.toISOString().slice(0, 10);
  };
  return {
    version: 1,
    householdName: "River House",
    baseCurrency: "USD",
    locale: "en",
    members: [
      { id: "m1", name: "Alex", role: "owner" },
      { id: "m2", name: "Sam", role: "editor" },
    ],
    terms: [
      { id: "t1", name: "Family streaming", vendor: "StreamCo", kind: "subscription", cadence: "monthly", amount: 17.99, currency: "USD", nextDate: iso(6), noticeDays: 7, autoRenew: true, decision: "review", ownerName: "Alex", notes: "Only used on weekends.", cancelUrl: "https://example.com/cancel", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: "t2", name: "Apartment lease", vendor: "Harbor Realty", kind: "contract", cadence: "yearly", amount: 18600, currency: "USD", nextDate: iso(42), noticeDays: 60, autoRenew: true, decision: "keep", ownerName: "Sam", notes: "Give 60-day written notice to avoid rollover.", cancelUrl: "", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: "t3", name: "Passports", vendor: "Government", kind: "document", cadence: "once", amount: 0, currency: "USD", nextDate: iso(18), noticeDays: 90, autoRenew: false, decision: "review", ownerName: "Alex", notes: "Renew before travel in October.", cancelUrl: "", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: "t4", name: "Laptop warranty", vendor: "Northfield", kind: "warranty", cadence: "once", amount: 0, currency: "USD", nextDate: iso(3), noticeDays: 14, autoRenew: false, decision: "keep", ownerName: "Sam", notes: "Check battery replacement coverage.", cancelUrl: "", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: "t5", name: "Domain + email", vendor: "Registrar", kind: "subscription", cadence: "yearly", amount: 48, currency: "USD", nextDate: iso(21), noticeDays: 14, autoRenew: true, decision: "keep", ownerName: "Alex", notes: "", cancelUrl: "", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
    ],
  };
}
