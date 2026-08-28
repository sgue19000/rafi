"use client";

import type { AppState } from "./types";
import { emptyState } from "./seed";

const KEY = "termline.state.v1";

export function loadState(): AppState {
  if (typeof window === "undefined") return emptyState();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw) as AppState;
    if (parsed.version !== 1 || !Array.isArray(parsed.terms)) return emptyState();
    return parsed;
  } catch {
    return emptyState();
  }
}

export function saveState(state: AppState): void {
  window.localStorage.setItem(KEY, JSON.stringify(state));
}

export function exportState(state: AppState): string {
  return JSON.stringify(state, null, 2);
}

export function importState(raw: string): AppState {
  const parsed = JSON.parse(raw) as AppState;
  if (parsed.version !== 1 || !Array.isArray(parsed.terms)) {
    throw new Error("Invalid Termline export");
  }
  return parsed;
}
