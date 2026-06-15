// Slovenian parental-leave calculation logic (ZSDP-1, post-1-April-2023 regime).
// Pure functions only — no Vue, no i18n, no date formatting — so the rules can be
// unit-tested in isolation. The caller is responsible for formatting dates and for
// translating the i18n keys returned in `extensions` and `timeline`.

export const MATERNITY_DAYS = 105; // ZSDP-1 Art. 19(1)
export const MATERNITY_LEAD_DAYS = 28; // prescribed start: EDD - 28 (Art. 21)
export const MATERNITY_MANDATORY_DAYS = 15; // Art. 19(2) — informational

export const PATERNITY_BASE_DAYS = 15; // Art. 25(1)
export const PATERNITY_PER_EXTRA_NEWBORN = 10; // Art. 25(2): +10 per additional child

export const PARENTAL_TOTAL = 320; // 160 per parent, two parents
export const PARENTAL_PER_PARENT_CAP = 260; // 160 own + 100 transferred
export const PARENTAL_PER_PARENT_MIN = PARENTAL_TOTAL - PARENTAL_PER_PARENT_CAP; // 60 non-transferable
export const PARENTAL_DEFAULT = PARENTAL_TOTAL / 2; // 160

// Extensions to PARENTAL leave (ZSDP-1 Art. 29) — cumulative ("se seštevajo").
export const EXT_SPECIAL_NEEDS_DAYS = 90;
export const EXT_MULTIPLE_PER_EXTRA_CHILD_DAYS = 90; // per additional child (twins +90, triplets +180…)

// Premature: extra days = how much the gestation fell short of 260 days.
// An EDD corresponds to ~280 days of gestation (Naegele), so the 260-day threshold
// sits 20 days before the EDD. A baby born within 20 days of the EDD gets nothing.
export const FULL_TERM_GESTATION_DAYS = 280;
export const PREMATURE_THRESHOLD_GESTATION_DAYS = 260;
export const PREMATURE_FREE_DAYS =
  FULL_TERM_GESTATION_DAYS - PREMATURE_THRESHOLD_GESTATION_DAYS; // 20

export const MS_PER_DAY = 24 * 60 * 60 * 1000;

export function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function diffDays(later, earlier) {
  return Math.round((later - earlier) / MS_PER_DAY);
}

// Inclusive last day of a span of `days` days that starts on `start`.
// e.g. a 105-day leave starting on day D ends on D+104.
export function lastDayOf(start, days) {
  return addDays(start, days - 1);
}

/**
 * Compute leave dates and entitlements from user input.
 * @returns raw Dates + numeric durations + i18n keys (no formatting/translation).
 */
export function calculateLeave({
  edd,
  birthDate = null,
  newbornsCount = 1,
  existingKidsUnder8 = 0,
  specialNeeds = false,
  motherParental = PARENTAL_DEFAULT,
}) {
  if (!edd) throw new Error("EDD_REQUIRED");

  const eddDate = new Date(edd);
  const plannedStart = addDays(eddDate, -MATERNITY_LEAD_DAYS);
  const birth = birthDate ? new Date(birthDate) : null;

  // Maternity starts on the prescribed day, or earlier if the baby arrives first.
  let maternityStart = plannedStart;
  if (birth && birth < plannedStart) maternityStart = birth;
  const maternityEnd = lastDayOf(maternityStart, MATERNITY_DAYS);

  const extraNewborns = Math.max(0, newbornsCount - 1);
  const isMultiple = newbornsCount > 1;
  const paternityLeave =
    PATERNITY_BASE_DAYS + extraNewborns * PATERNITY_PER_EXTRA_NEWBORN;

  // ----- Parental-leave extensions (Art. 29) — these add to the parental entitlement.
  const extensions = [];
  let extensionDays = 0;

  if (specialNeeds) {
    extensions.push({
      key: "calculator.extSpecialNeeds",
      params: { days: EXT_SPECIAL_NEEDS_DAYS },
    });
    extensionDays += EXT_SPECIAL_NEEDS_DAYS;
  }

  if (isMultiple) {
    const days = extraNewborns * EXT_MULTIPLE_PER_EXTRA_CHILD_DAYS;
    extensions.push({ key: "calculator.extMultiples", params: { days } });
    extensionDays += days;
  }

  let prematureDays = 0;
  if (birth && birth < eddDate) {
    const daysEarly = diffDays(eddDate, birth);
    prematureDays = Math.max(0, daysEarly - PREMATURE_FREE_DAYS);
    if (prematureDays > 0) {
      extensions.push({
        key: "calculator.extPremature",
        params: { days: prematureDays },
      });
      extensionDays += prematureDays;
    }
  }

  // "More children under 8" tier — counts only children the parents ALREADY raise
  // at the time of this birth; the newborn(s) are NOT counted (Art. 29).
  let kidsExtensionDays = 0;
  let kidsKey = null;
  if (existingKidsUnder8 >= 4) {
    kidsExtensionDays = 90;
    kidsKey = "calculator.ext4kids";
  } else if (existingKidsUnder8 === 3) {
    kidsExtensionDays = 60;
    kidsKey = "calculator.ext3kids";
  } else if (existingKidsUnder8 === 2) {
    kidsExtensionDays = 30;
    kidsKey = "calculator.ext2kids";
  }
  if (kidsKey) {
    extensions.push({ key: kidsKey, params: { days: kidsExtensionDays } });
    extensionDays += kidsExtensionDays;
  }

  const fatherParental = PARENTAL_TOTAL - motherParental;
  const parentalBaseTotal = PARENTAL_TOTAL;
  const parentalCombinedTotal = parentalBaseTotal + extensionDays;

  // Parental leave runs after maternity; both ends are inclusive last days.
  const motherParentalEnd = addDays(maternityEnd, motherParental);
  const fatherParentalEnd = addDays(maternityEnd, fatherParental);
  const paternityAnchor = birth ?? maternityStart;
  const paternityEnd = lastDayOf(paternityAnchor, paternityLeave);

  const timeline = [
    {
      date: maternityStart,
      parent: "mother",
      icon: "pi pi-calendar-plus",
      titleKey: "calculator.tlMaternityStart",
    },
    ...(birth
      ? [
          {
            date: birth,
            parent: "birth",
            icon: "pi pi-heart-fill",
            titleKey: "calculator.tlBirth",
          },
        ]
      : []),
    {
      date: paternityEnd,
      parent: "father",
      icon: "pi pi-user",
      titleKey: "calculator.tlPaternityEnd",
      subtitleKey: "calculator.tlPaternityWindow",
      subtitleParams: { days: paternityLeave },
    },
    {
      date: maternityEnd,
      parent: "mother",
      icon: "pi pi-calendar-minus",
      titleKey: "calculator.tlMaternityEnd",
    },
    {
      date: motherParentalEnd,
      parent: "mother",
      icon: "pi pi-flag",
      titleKey: "calculator.tlMotherParentalEnd",
      subtitleKey: "calculator.tlParentalSpan",
      subtitleParams: { days: motherParental },
    },
    {
      date: fatherParentalEnd,
      parent: "father",
      icon: "pi pi-flag",
      titleKey: "calculator.tlFatherParentalEnd",
      subtitleKey: "calculator.tlParentalSpan",
      subtitleParams: { days: fatherParental },
    },
  ].sort((a, b) => a.date - b.date);

  return {
    maternityStart,
    maternityEnd,
    paternityLeave,
    motherParental,
    fatherParental,
    extensions,
    extensionDays,
    parentalBaseTotal,
    parentalCombinedTotal,
    timeline,
  };
}
