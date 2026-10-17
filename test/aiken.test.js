import test from "node:test";
import assert from "node:assert/strict";
import {
  calculateAikenV,
  evaluateAikenDiscrepancy,
  verifyAikenSignificance
} from "../src/scholar-lint.js";

test("Aiken's V: Calculation from discrete Likert ratings", () => {
  // 7 raters on 5-point scale (lo = 1, hi = 5), range = 4, max sum = 7 * 4 = 28
  // Ratings: [4, 5, 4, 5, 4, 4, 5] -> (r - 1) sum = 3 + 4 + 3 + 4 + 3 + 3 + 4 = 24
  // V = 24 / 28 = 0.8571
  const ratings = [4, 5, 4, 5, 4, 4, 5];
  const v = calculateAikenV(ratings, 5, 1);
  assert.equal(v, 0.8571);
});

test("Aiken's V: Integer constraint verification (Authentic Discrete Data)", () => {
  // V = 0.8571 with n = 7, c = 5 (max sum = 28)
  // Implied sum = 0.8571 * 28 = 23.9988 ≈ 24 (discrepancy <= 0.005)
  const result = evaluateAikenDiscrepancy(0.8571, 7, 5);
  assert.equal(result.isMathematicallyValid, true);
  assert.equal(result.isFabricatedArtifact, false);
  assert.equal(result.nearestIntegerSum, 24);
});

test("Aiken's V: Synthetically fabricated continuous artifact detection", () => {
  // Fabricated score: V = 0.8350 with n = 7, c = 5
  // Implied sum = 0.8350 * 28 = 23.38 (non-integer, discrepancy = 0.38 >> 0.005)
  // Impossible for 7 discrete Likert raters!
  const result = evaluateAikenDiscrepancy(0.8350, 7, 5);
  assert.equal(result.isMathematicallyValid, false);
  assert.equal(result.isFabricatedArtifact, true);
  assert.ok(result.explanation.includes("ANOMALI METASAIN"));
});

test("Aiken's V: Exact binomial significance testing", () => {
  // High validity score V = 0.88 with 7 raters
  const sig = verifyAikenSignificance(0.88, 7, 5, 0.05);
  assert.equal(sig.isStatisticallySignificant, true);
  assert.equal(sig.verdict, "SIGNIFICANT_CONTENT_VALIDITY");
});
