import test from "node:test";
import assert from "node:assert/strict";
import {
  extractStatisticalTests,
  analyzeStatisticalInferences,
  computeTTestPValue,
  computeFTestPValue,
  computeChiSquarePValue,
  computePearsonRPValue
} from "../src/scholar-lint.js";

test("Statcheck: Student-t distribution CDF inversion", () => {
  // t(28) = 2.20, two-tailed p ≈ 0.036
  const p = computeTTestPValue(2.20, 28);
  assert.ok(Math.abs(p - 0.036) < 0.005, `Expected p ≈ 0.036, got ${p}`);
});

test("Statcheck: Snedecor F distribution CDF inversion", () => {
  // F(2, 45) = 3.55, p ≈ 0.037
  const p = computeFTestPValue(3.55, 2, 45);
  assert.ok(Math.abs(p - 0.037) < 0.005, `Expected p ≈ 0.037, got ${p}`);
});

test("Statcheck: Chi-square distribution CDF inversion", () => {
  // chi2(3) = 8.12, p ≈ 0.0436
  const p = computeChiSquarePValue(8.12, 3);
  assert.ok(Math.abs(p - 0.0436) < 0.005, `Expected p ≈ 0.0436, got ${p}`);
});

test("Statcheck: Pearson r distribution CDF inversion", () => {
  // r(50) = 0.28, p ≈ 0.0489
  const p = computePearsonRPValue(0.28, 50);
  assert.ok(Math.abs(p - 0.0489) < 0.005, `Expected p ≈ 0.0489, got ${p}`);
});

test("Statcheck: Gross inconsistency detection", () => {
  const manuscriptSample = `
    Berdasarkan pengujian hipotesis, ditemukan nilai t(28) = 2.20, p = 0.001.
    Selain itu, uji perbedaan antar kelompok menghasilkan F(2, 45) = 3.55, p = 0.037.
  `;
  const tests = extractStatisticalTests(manuscriptSample);
  assert.equal(tests.length, 2);

  const report = analyzeStatisticalInferences(tests);
  assert.equal(report.totalEvaluated, 2);
  // t(28) = 2.20 with reported p = 0.001 should be flagged as discrepancy because true p ≈ 0.036
  assert.ok(report.roundingErrorsCount > 0 || report.grossInconsistencies.length > 0);
});
