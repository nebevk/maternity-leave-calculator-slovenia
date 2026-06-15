import { describe, it, expect } from "vitest";
import {
  calculateLeave,
  diffDays,
  MATERNITY_DAYS,
  MATERNITY_LEAD_DAYS,
  PARENTAL_TOTAL,
} from "../../src/lib/leaveCalculator";

const EDD = new Date(2025, 6, 15); // 15 July 2025
const d = (y, m, day) => new Date(y, m, day);

describe("maternity dates", () => {
  it("starts 28 days before the EDD", () => {
    const r = calculateLeave({ edd: EDD });
    expect(diffDays(EDD, r.maternityStart)).toBe(MATERNITY_LEAD_DAYS);
    expect(r.maternityStart).toEqual(d(2025, 5, 17)); // 17 June 2025
  });

  it("spans exactly 105 calendar days (inclusive last day, no off-by-one)", () => {
    const r = calculateLeave({ edd: EDD });
    expect(diffDays(r.maternityEnd, r.maternityStart)).toBe(MATERNITY_DAYS - 1);
    expect(r.maternityEnd).toEqual(d(2025, 8, 29)); // 29 Sept 2025
  });

  it("starts on the birth date when the baby arrives before the planned start", () => {
    const birthDate = d(2025, 5, 10); // 10 June 2025, before 17 June
    const r = calculateLeave({ edd: EDD, birthDate });
    expect(r.maternityStart).toEqual(birthDate);
    expect(diffDays(r.maternityEnd, r.maternityStart)).toBe(MATERNITY_DAYS - 1);
  });

  it("throws when the EDD is missing", () => {
    expect(() => calculateLeave({})).toThrow();
  });
});

describe("paternity leave", () => {
  it("is 15 days for a single birth", () => {
    expect(calculateLeave({ edd: EDD }).paternityLeave).toBe(15);
  });

  it("adds 10 days per additional newborn (twins 25, triplets 35)", () => {
    expect(calculateLeave({ edd: EDD, newbornsCount: 2 }).paternityLeave).toBe(
      25
    );
    expect(calculateLeave({ edd: EDD, newbornsCount: 3 }).paternityLeave).toBe(
      35
    );
  });
});

describe("parental-leave extensions (Art. 29)", () => {
  it("scales the multiples extension by +90 per additional child", () => {
    const twins = calculateLeave({ edd: EDD, newbornsCount: 2 });
    const triplets = calculateLeave({ edd: EDD, newbornsCount: 3 });
    expect(twins.extensionDays).toBe(90);
    expect(triplets.extensionDays).toBe(180);
  });

  it("adds 90 days for a child with special needs", () => {
    const r = calculateLeave({ edd: EDD, specialNeeds: true });
    expect(r.extensionDays).toBe(90);
    expect(r.parentalCombinedTotal).toBe(PARENTAL_TOTAL + 90);
  });

  it("grants premature days only below the 260-day gestation threshold", () => {
    // ~30 days early => gestation ~250 days => 10 extra days
    const early = calculateLeave({ edd: EDD, birthDate: d(2025, 5, 15) }); // 15 June, 30 days early
    expect(early.extensionDays).toBe(10);
    // 15 days early => gestation ~265 days => no extension
    const slightly = calculateLeave({ edd: EDD, birthDate: d(2025, 5, 30) }); // 30 June, 15 days early
    const premature = slightly.extensions.find(
      (e) => e.key === "calculator.extPremature"
    );
    expect(premature).toBeUndefined();
  });

  it("counts only pre-existing children for the under-8 tier (not the newborn)", () => {
    // 1 existing child + twins must NOT trip the '2 children' tier.
    const r = calculateLeave({
      edd: EDD,
      existingKidsUnder8: 1,
      newbornsCount: 2,
    });
    expect(r.extensions.some((e) => e.key === "calculator.ext2kids")).toBe(
      false
    );
    expect(r.extensionDays).toBe(90); // twins only

    const withTwoExisting = calculateLeave({ edd: EDD, existingKidsUnder8: 2 });
    expect(withTwoExisting.extensionDays).toBe(30);
  });

  it("reports a combined entitlement of base 320 plus extensions", () => {
    const r = calculateLeave({
      edd: EDD,
      existingKidsUnder8: 4,
      specialNeeds: true,
    });
    expect(r.parentalBaseTotal).toBe(PARENTAL_TOTAL);
    expect(r.parentalCombinedTotal).toBe(PARENTAL_TOTAL + r.extensionDays);
    expect(r.extensionDays).toBe(90 + 90); // 4+ kids + special needs
  });
});

describe("parental split", () => {
  it("derives the father's share from the mother's allocation", () => {
    const r = calculateLeave({ edd: EDD, motherParental: 200 });
    expect(r.motherParental).toBe(200);
    expect(r.fatherParental).toBe(PARENTAL_TOTAL - 200);
  });
});
