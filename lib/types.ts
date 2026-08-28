export type Cadence = "weekly" | "monthly" | "quarterly" | "yearly" | "once";
export type Kind = "subscription" | "contract" | "document" | "warranty" | "membership" | "utility" | "other";
export type Decision = "keep" | "review" | "switch" | "cancel" | "done";
export type Role = "owner" | "editor" | "viewer";

export interface Term {
  id: string;
  name: string;
  vendor: string;
  kind: Kind;
  cadence: Cadence;
  amount: number;
  currency: string;
  nextDate: string;
  noticeDays: number;
  autoRenew: boolean;
  decision: Decision;
  ownerName: string;
  notes: string;
  cancelUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface HouseholdMember {
  id: string;
  name: string;
  role: Role;
}

export interface AppState {
  version: 1;
  householdName: string;
  baseCurrency: string;
  locale: string;
  members: HouseholdMember[];
  terms: Term[];
}
