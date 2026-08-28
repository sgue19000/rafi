import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { daysUntil, addCadence, isInNoticeWindow } from "./dates.ts";

describe("daysUntil", () => {
  it("counts whole days", () => {
    const from = new Date("2026-01-01T12:00:00");
    assert.equal(daysUntil("2026-01-03", from), 2);
  });
});

describe("addCadence", () => {
  it("advances dates", () => {
    assert.equal(addCadence("2026-01-15", "monthly"), "2026-02-15");
    assert.equal(addCadence("2026-01-15", "yearly"), "2027-01-15");
  });
});

describe("isInNoticeWindow", () => {
  it("includes today and notice horizon", () => {
    const from = new Date("2026-01-01T00:00:00");
    assert.equal(isInNoticeWindow("2026-01-07", 7, from), true);
    assert.equal(isInNoticeWindow("2026-01-20", 7, from), false);
  });
});
