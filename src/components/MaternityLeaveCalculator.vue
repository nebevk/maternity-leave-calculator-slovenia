<template>
  <PrimeCard class="maternity-calculator">
    <template #title>
      <h2 class="calc-title">{{ $t("appName") }}</h2>
    </template>

    <template #content>
      <PrimeFieldset
        :legend="$t('calculator.sectionDates')"
        class="calc-section"
      >
        <div class="grid-2">
          <PrimeIftaLabel>
            <PrimeDatePicker
              v-model="edd"
              inputId="edd"
              dateFormat="dd/mm/yy"
              showIcon
              fluid
              appendTo="body"
              :placeholder="$t('calculator.selectEDD')"
            />
            <label for="edd">{{ $t("calculator.edd") }}</label>
          </PrimeIftaLabel>

          <PrimeIftaLabel>
            <PrimeDatePicker
              v-model="birthDate"
              inputId="birthDate"
              dateFormat="dd/mm/yy"
              showIcon
              fluid
              appendTo="body"
              :placeholder="$t('calculator.selectBirthDate')"
            />
            <label for="birthDate">{{ $t("calculator.birthDate") }}</label>
          </PrimeIftaLabel>
        </div>
      </PrimeFieldset>

      <PrimeFieldset
        :legend="$t('calculator.sectionFamily')"
        class="calc-section"
      >
        <div class="grid-2">
          <PrimeIftaLabel>
            <PrimeInputNumber
              v-model="newbornsCount"
              inputId="newbornsCount"
              :min="1"
              :max="10"
              fluid
              showButtons
              buttonLayout="horizontal"
            />
            <label for="newbornsCount">
              {{ $t("calculator.newbornsCount") }}
            </label>
          </PrimeIftaLabel>

          <PrimeIftaLabel>
            <PrimeInputNumber
              v-model="existingKidsUnder8"
              inputId="existingKidsUnder8"
              :min="0"
              :max="10"
              fluid
              showButtons
              buttonLayout="horizontal"
            />
            <label for="existingKidsUnder8">
              {{ $t("calculator.existingKidsUnder8") }}
            </label>
          </PrimeIftaLabel>
        </div>

        <div class="checkbox-row">
          <PrimeCheckbox
            v-model="specialNeeds"
            :binary="true"
            inputId="specialNeeds"
          />
          <label for="specialNeeds">
            {{ $t("calculator.specialNeeds") }}
          </label>
        </div>
      </PrimeFieldset>

      <PrimeFieldset
        :legend="$t('calculator.sectionParental')"
        class="calc-section"
      >
        <p class="section-hint">{{ $t("calculator.parentalInfo") }}</p>

        <div class="split-readout">
          <div class="split-readout__side split-readout__side--mother">
            <span class="split-readout__label">
              {{ $t("calculator.motherParental") }}
            </span>
            <span class="split-readout__value">
              {{ motherParental }} {{ $t("calculator.days") }}
            </span>
          </div>
          <div class="split-readout__side split-readout__side--father">
            <span class="split-readout__label">
              {{ $t("calculator.fatherParental") }}
            </span>
            <span class="split-readout__value">
              {{ fatherParental }} {{ $t("calculator.days") }}
            </span>
          </div>
        </div>

        <PrimeSlider
          v-model="motherParental"
          :min="PARENTAL_PER_PARENT_MIN"
          :max="PARENTAL_PER_PARENT_CAP"
          :step="1"
          class="parental-slider"
          :aria-label="$t('calculator.parentalSliderAria')"
        />

        <div class="split-bounds">
          <span>{{ PARENTAL_PER_PARENT_MIN }}</span>
          <span class="split-bounds__hint">
            {{ $t("calculator.parentalTotal") }}: {{ PARENTAL_TOTAL }}
            {{ $t("calculator.days") }}
          </span>
          <span>{{ PARENTAL_PER_PARENT_CAP }}</span>
        </div>

        <div class="split-actions">
          <PrimeButton
            text
            size="small"
            :label="$t('calculator.parentalReset')"
            icon="pi pi-refresh"
            @click="motherParental = 160"
          />
        </div>
      </PrimeFieldset>

      <div class="calc-actions">
        <PrimeButton
          :label="$t('calculator.calculate')"
          icon="pi pi-calculator"
          @click="calculateLeave"
        />
      </div>

      <PrimePanel
        v-if="results"
        :header="$t('calculator.results')"
        class="calc-results"
      >
        <div class="result-grid">
          <div class="result-card">
            <h4>
              <i class="pi pi-heart" />
              {{ $t("calculator.maternityLeave") }}
            </h4>
            <p class="result-row">
              <span>{{ $t("calculator.maternityStart") }}</span>
              <strong>{{ results.maternityStart }}</strong>
            </p>
            <p class="result-row">
              <span>{{ $t("calculator.maternityEnd") }}</span>
              <strong>{{ results.maternityEnd }}</strong>
            </p>
            <p class="result-meta">{{ $t("calculator.maternityInfo") }}</p>
          </div>

          <div class="result-card">
            <h4>
              <i class="pi pi-user" />
              {{ $t("calculator.paternityLeave") }}
            </h4>
            <p class="result-row">
              <span>{{ $t("calculator.paternityDuration") }}</span>
              <strong>
                {{ results.paternityLeave }} {{ $t("calculator.days") }}
              </strong>
            </p>
            <p class="result-meta">{{ $t("calculator.paternityInfo") }}</p>
          </div>

          <div class="result-card">
            <h4>
              <i class="pi pi-users" />
              {{ $t("calculator.parentalLeave") }}
            </h4>
            <p class="result-row">
              <span>{{ $t("calculator.motherParental") }}</span>
              <strong>
                {{ motherParental }} {{ $t("calculator.days") }}
              </strong>
            </p>
            <p class="result-row">
              <span>{{ $t("calculator.fatherParental") }}</span>
              <strong>
                {{ fatherParental }} {{ $t("calculator.days") }}
              </strong>
            </p>
          </div>

          <div class="result-card">
            <h4>
              <i class="pi pi-plus-circle" />
              {{ $t("calculator.extensions") }}
            </h4>
            <ul v-if="results.extensions.length" class="result-list">
              <li v-for="(ext, i) in results.extensions" :key="i">{{ ext }}</li>
            </ul>
            <p v-else class="result-meta">{{ $t("calculator.extNone") }}</p>
          </div>
        </div>

        <h3 class="timeline-heading">{{ $t("calculator.timeline") }}</h3>
        <PrimeTimeline
          :value="results.timeline"
          align="alternate"
          class="leave-timeline"
        >
          <template #marker="slotProps">
            <span
              class="timeline-marker"
              :class="`timeline-marker--${slotProps.item.parent}`"
            >
              <i :class="slotProps.item.icon" />
            </span>
          </template>
          <template #opposite="slotProps">
            <small class="timeline-date">{{ slotProps.item.dateLabel }}</small>
          </template>
          <template #content="slotProps">
            <div class="timeline-content">
              <strong>{{ $t(slotProps.item.titleKey) }}</strong>
              <small v-if="slotProps.item.subtitleKey">
                {{
                  $t(
                    slotProps.item.subtitleKey,
                    slotProps.item.subtitleParams || {}
                  )
                }}
              </small>
            </div>
          </template>
        </PrimeTimeline>
      </PrimePanel>
    </template>
  </PrimeCard>
</template>

<script>
const MATERNITY_DAYS = 105;
const MATERNITY_LEAD_DAYS = 28;
const PATERNITY_BASE_DAYS = 15;
const PATERNITY_PER_EXTRA_NEWBORN = 10;
const PARENTAL_TOTAL = 320;
const PARENTAL_PER_PARENT_CAP = 260;
const PARENTAL_PER_PARENT_MIN = PARENTAL_TOTAL - PARENTAL_PER_PARENT_CAP;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

export default {
  name: "MaternityLeaveCalculator",
  data() {
    return {
      edd: null,
      birthDate: null,
      newbornsCount: 1,
      existingKidsUnder8: 0,
      specialNeeds: false,
      motherParental: 160,
      results: null,
      PARENTAL_TOTAL,
      PARENTAL_PER_PARENT_CAP,
      PARENTAL_PER_PARENT_MIN,
    };
  },
  computed: {
    fatherParental() {
      return PARENTAL_TOTAL - this.motherParental;
    },
  },
  methods: {
    showError(detailKey) {
      this.$toast.add({
        severity: "error",
        summary: this.$t("calculator.errorTitle"),
        detail: this.$t(detailKey),
        life: 4000,
      });
    },
    addDays(date, days) {
      const next = new Date(date);
      next.setDate(next.getDate() + days);
      return next;
    },
    calculateLeave() {
      if (!this.edd) {
        this.showError("calculator.errorEDD");
        return;
      }

      const edd = new Date(this.edd);
      const plannedStart = this.addDays(edd, -MATERNITY_LEAD_DAYS);
      const birth = this.birthDate ? new Date(this.birthDate) : null;

      let maternityStart = plannedStart;
      if (birth && birth < plannedStart) {
        maternityStart = birth;
      }
      const maternityEnd = this.addDays(maternityStart, MATERNITY_DAYS);

      const isMultiple = this.newbornsCount > 1;
      const extraNewborns = Math.max(0, this.newbornsCount - 1);
      const paternityLeave =
        PATERNITY_BASE_DAYS + extraNewborns * PATERNITY_PER_EXTRA_NEWBORN;

      const totalKidsUnder8 = this.existingKidsUnder8 + this.newbornsCount;
      const extensions = [];
      if (this.specialNeeds) {
        extensions.push(this.$t("calculator.extSpecialNeeds"));
      }
      if (isMultiple) {
        extensions.push(this.$t("calculator.extMultiples"));
      }
      if (birth && birth < edd) {
        const daysEarly = Math.round((edd - birth) / MS_PER_DAY);
        if (daysEarly > 0) {
          extensions.push(
            this.$t("calculator.extPremature", { days: daysEarly })
          );
        }
      }
      if (totalKidsUnder8 === 2) {
        extensions.push(this.$t("calculator.ext2kids"));
      } else if (totalKidsUnder8 === 3) {
        extensions.push(this.$t("calculator.ext3kids"));
      } else if (totalKidsUnder8 >= 4) {
        extensions.push(this.$t("calculator.ext4kids"));
      }

      const format = (d) =>
        d.toLocaleDateString(this.$i18n.locale, {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

      const motherParentalEnd = this.addDays(maternityEnd, this.motherParental);
      const paternityAnchor = birth ?? maternityStart;
      const paternityEnd = this.addDays(paternityAnchor, paternityLeave);
      const fatherParentalEnd = this.addDays(maternityEnd, this.fatherParental);

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
          subtitleParams: { days: this.motherParental },
        },
        {
          date: fatherParentalEnd,
          parent: "father",
          icon: "pi pi-flag",
          titleKey: "calculator.tlFatherParentalEnd",
          subtitleKey: "calculator.tlParentalSpan",
          subtitleParams: { days: this.fatherParental },
        },
      ]
        .sort((a, b) => a.date - b.date)
        .map((e) => ({ ...e, dateLabel: format(e.date) }));

      this.results = {
        maternityStart: format(maternityStart),
        maternityEnd: format(maternityEnd),
        paternityLeave,
        extensions,
        timeline,
      };
    },
  },
};
</script>

<style scoped>
.maternity-calculator {
  max-width: 880px;
  margin: 2rem auto;
}

.calc-title {
  margin: 0;
  font-weight: 800;
  letter-spacing: 0.3px;
}

.calc-section {
  margin-bottom: 1.5rem;
}

.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

@media (max-width: 640px) {
  .grid-2 {
    grid-template-columns: 1fr;
  }
}

.checkbox-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 1rem;
}

.checkbox-row label {
  cursor: pointer;
  user-select: none;
}

.section-hint {
  margin: 0 0 1rem;
  color: var(--p-text-muted-color);
  font-size: 0.9rem;
}

.split-readout {
  display: flex;
  align-items: stretch;
  gap: 0.75rem;
  margin: 0.25rem 0 1.25rem;
}

.split-readout__side {
  flex: 1 1 0;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  border: 1px solid transparent;
}

.split-readout__side--mother {
  background: rgba(236, 72, 153, 0.08);
  border-color: rgba(236, 72, 153, 0.25);
}

.split-readout__side--father {
  background: rgba(59, 130, 246, 0.08);
  border-color: rgba(59, 130, 246, 0.25);
  text-align: right;
}

.split-readout__label {
  font-size: 0.8rem;
  color: var(--p-text-muted-color);
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

.split-readout__value {
  font-size: 1.4rem;
  font-weight: 700;
}

.parental-slider {
  margin: 0.25rem 0.25rem 0.5rem;
}

.parental-slider :deep(.p-slider-range) {
  background: linear-gradient(
    90deg,
    rgba(236, 72, 153, 0.85) 0%,
    rgba(236, 72, 153, 0.85) 100%
  );
}

.parental-slider :deep(.p-slider) {
  background: rgba(59, 130, 246, 0.35);
}

.parental-slider :deep(.p-slider-handle) {
  border-color: var(--p-surface-0);
  background: var(--p-surface-0);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

.split-bounds {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: var(--p-text-muted-color);
  margin: 0.5rem 0.25rem 0;
}

.split-bounds__hint {
  font-weight: 600;
}

.split-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
}

.calc-actions {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.5rem;
}

.calc-results {
  margin-top: 0.5rem;
}

.result-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

.result-card {
  background: var(--p-surface-50);
  border: 1px solid var(--p-surface-200);
  border-radius: 10px;
  padding: 1rem 1.1rem;
}

.result-card h4 {
  margin: 0 0 0.75rem;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--p-primary-color);
}

.result-row {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  margin: 0.35rem 0;
  font-size: 0.95rem;
}

.result-meta {
  margin: 0.5rem 0 0;
  color: var(--p-text-muted-color);
  font-size: 0.85rem;
}

.result-list {
  margin: 0;
  padding-left: 1.1rem;
  font-size: 0.95rem;
}

.result-list li {
  margin: 0.25rem 0;
}

.timeline-heading {
  margin: 2rem 0 1rem;
  font-size: 1.05rem;
  font-weight: 700;
}

.leave-timeline {
  margin-top: 0.5rem;
}

.timeline-marker {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  color: #fff;
  box-shadow: 0 0 0 4px var(--p-surface-0);
}

.timeline-marker--mother {
  background: #ec4899;
}

.timeline-marker--father {
  background: #3b82f6;
}

.timeline-marker--birth {
  background: #f59e0b;
}

.timeline-content {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding: 0.25rem 0;
}

.timeline-content small {
  color: var(--p-text-muted-color);
  font-size: 0.8rem;
}

.timeline-date {
  color: var(--p-text-muted-color);
  font-size: 0.85rem;
}

@media (max-width: 640px) {
  .leave-timeline :deep(.p-timeline) {
    align-items: flex-start;
  }
}
</style>
