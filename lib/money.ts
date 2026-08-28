import type { Cadence } from "./types";

export function annualize(amount: number, cadence: Cadence): number {
  if (!Number.isFinite(amount) || amount < 0) return 0;
  switch (cadence) {
    case "weekly": return amount * 52;
    case "monthly": return amount * 12;
    case "quarterly": return amount * 4;
    case "yearly": return amount;
    case "once": return 0;
    default: return 0;
  }
}

export function monthlyEquivalent(amount: number, cadence: Cadence): number {
  return annualize(amount, cadence) / 12;
}

export function formatMoney(amount: number, currency: string, locale = "en"): string {
  try {
    return new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 2 }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}
