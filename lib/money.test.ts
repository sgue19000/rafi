import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { annualize, monthlyEquivalent } from "./money.ts";

describe("annualize", () => {
  it("scales cadences", () => {
    assert.equal(annualize(10, "monthly"), 120);
    assert.equal(annualize(10, "weekly"), 520);
    assert.equal(annualize(10, "quarterly"), 40);
    assert.equal(annualize(10, "yearly"), 10);
    assert.equal(annualize(10, "once"), 0);
  });
  it("rejects bad amounts", () => {
    assert.equal(annualize(-5, "monthly"), 0);
    assert.equal(annualize(Number.NaN, "monthly"), 0);
  });
});

describe("monthlyEquivalent", () => {
  it("divides annual by 12", () => {
    assert.equal(monthlyEquivalent(120, "yearly"), 10);
  });
});
