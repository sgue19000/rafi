import type { Term } from "./types.ts";
import { daysUntil } from "./dates.ts";
import { annualize } from "./money.ts";

export function urgencyScore(term: Term, from = new Date()): number {
  const days = daysUntil(term.nextDate, from);
  const money = annualize(term.amount, term.cadence);
  const moneyWeight = Math.min(40, money / 50);
  const timeWeight = days < 0 ? 50 : Math.max(0, 40 - days);
  const decisionWeight = term.decision === "review" ? 15 : term.decision === "cancel" ? 10 : 0;
  const autoWeight = term.autoRenew ? 10 : 0;
  return Math.round(moneyWeight + timeWeight + decisionWeight + autoWeight);
}

export function needsAttention(term: Term, from = new Date()): boolean {
  if (term.decision === "done") return false;
  const days = daysUntil(term.nextDate, from);
  return days <= term.noticeDays || term.decision === "review" || term.decision === "cancel";
}
