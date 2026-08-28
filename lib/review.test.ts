import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { needsAttention, urgencyScore } from "./review.ts";
import type { Term } from "./types.ts";

const base: Term = {
  id: "t", name: "X", vendor: "Y", kind: "subscription", cadence: "monthly", amount: 20, currency: "USD",
  nextDate: "2026-01-05", noticeDays: 7, autoRenew: true, decision: "keep", ownerName: "A", notes: "", cancelUrl: "", createdAt: "", updatedAt: "",
};

describe("needsAttention", () => {
  it("flags notice window", () => {
    assert.equal(needsAttention(base, new Date("2026-01-01")), true);
  });
  it("ignores completed terms", () => {
    assert.equal(needsAttention({ ...base, decision: "done" }, new Date("2026-01-01")), false);
  });
});

describe("urgencyScore", () => {
  it("scores nearer higher", () => {
    const from = new Date("2026-01-01");
    assert.ok(urgencyScore(base, from) > urgencyScore({ ...base, nextDate: "2026-06-01" }, from));
  });
});
