import test from "node:test";
import assert from "node:assert/strict";
import { evaluatePCurveEvidentialValue } from "../src/scholar-lint.js";

test("p-Curve: High evidential value detection (Right-skewed distribution)", () => {
  // Real statistical effects show a strong right skew (many p < .025)
  const trueEffects = [0.002, 0.005, 0.008, 0.012, 0.015, 0.022];
  const evaluation = evaluatePCurveEvidentialValue(trueEffects);

  assert.equal(evaluation.significantTestCount, 6);
  assert.equal(evaluation.evidentialVerdict, "HIGH_EVIDENTIAL_VALUE");
  assert.ok(evaluation.fullCurveTest.isSignificantRightSkew);
});

test("p-Curve: p-Hacking & Selective reporting detection (Marginal concentration)", () => {
  // P-hacked findings cluster tightly just below the .05 significance threshold (0.040 - 0.049)
  const pHackedEffects = [0.041, 0.043, 0.045, 0.047, 0.048, 0.049];
  const evaluation = evaluatePCurveEvidentialValue(pHackedEffects);

  assert.equal(evaluation.significantTestCount, 6);
  assert.equal(evaluation.evidentialVerdict, "INADEQUATE_EVIDENTIAL_VALUE_OR_P_HACKED");
  assert.ok(evaluation.binomialTest.kUpperHalf > evaluation.binomialTest.kLowerHalf);
});

test("p-Curve: Insufficient data handling", () => {
  // Fewer than 3 significant tests cannot form a conclusive p-curve
  const smallSample = [0.035, 0.042];
  const evaluation = evaluatePCurveEvidentialValue(smallSample);

  assert.equal(evaluation.evidentialVerdict, "INSUFFICIENT_DATA");
});
