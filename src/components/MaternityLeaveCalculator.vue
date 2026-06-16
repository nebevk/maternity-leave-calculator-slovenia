<template>
  <div class="calc-layout">
    <!-- ============ Kalkulator (form) ============ -->
    <PrimeCard class="calc-card calc-form-card">
      <template #title>
        <span class="card-title">
          <i class="pi pi-calculator" aria-hidden="true" />
          {{ $t("menu.calculator") }}
        </span>
      </template>
      <template #content>
        <PrimeMessage
          severity="warn"
          :closable="false"
          icon="pi pi-info-circle"
          class="calc-disclaimer"
        >
          {{ $t("calculator.disclaimer") }}
        </PrimeMessage>

        <section class="form-section">
          <h3 class="form-section-title">
            {{ $t("calculator.sectionDates") }}
          </h3>
          <div class="grid-2">
            <div class="field">
              <label for="edd" class="field-label">
                {{ $t("calculator.edd") }}
              </label>
              <PrimeDatePicker
                v-model="edd"
                inputId="edd"
                dateFormat="dd/mm/yy"
                showIcon
                fluid
                appendTo="body"
                :placeholder="$t('calculator.selectEDD')"
              />
            </div>

            <div class="field">
              <label for="birthDate" class="field-label">
                {{ $t("calculator.birthDate") }}
              </label>
              <PrimeDatePicker
                v-model="birthDate"
                inputId="birthDate"
                dateFormat="dd/mm/yy"
                showIcon
                fluid
                appendTo="body"
                :minDate="birthMinDate"
                :maxDate="birthMaxDate"
                :placeholder="$t('calculator.selectBirthDate')"
              />
            </div>
          </div>
        </section>

        <section class="form-section">
          <h3 class="form-section-title">
            {{ $t("calculator.sectionFamily") }}
          </h3>
          <div class="grid-2">
            <div class="field">
              <label for="newbornsCount" class="field-label">
                {{ $t("calculator.newbornsCount") }}
              </label>
              <PrimeInputNumber
                v-model="newbornsCount"
                inputId="newbornsCount"
                :min="1"
                :max="10"
                fluid
                showButtons
                buttonLayout="horizontal"
              />
            </div>

            <div class="field">
              <label for="existingKidsUnder8" class="field-label">
                {{ $t("calculator.existingKidsUnder8") }}
              </label>
              <PrimeInputNumber
                v-model="existingKidsUnder8"
                inputId="existingKidsUnder8"
                :min="0"
                :max="10"
                fluid
                showButtons
                buttonLayout="horizontal"
              />
            </div>
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
        </section>

        <section class="form-section">
          <h3 class="form-section-title">
            {{ $t("calculator.sectionParental") }}
          </h3>
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
              @click="resetParental"
            />
          </div>
        </section>

        <div class="calc-actions">
          <PrimeButton
            severity="secondary"
            variant="outlined"
            :label="$t('calculator.reset')"
            icon="pi pi-times"
            @click="resetAll"
          />
          <PrimeButton
            :label="$t('calculator.calculate')"
            icon="pi pi-calculator"
            @click="calculateLeave"
          />
        </div>
      </template>
    </PrimeCard>

    <!-- ============ Rezultati (results) ============ -->
    <PrimeCard ref="results" class="calc-card calc-results-card">
      <template #title>
        <span class="card-title">
          <i class="pi pi-chart-bar" aria-hidden="true" />
          {{ $t("calculator.results") }}
        </span>
      </template>
      <template #content>
        <template v-if="results">
          <div class="metric-grid">
            <div class="metric">
              <h4 class="metric__title">
                <i class="pi pi-heart" aria-hidden="true" />
                {{ $t("calculator.maternityLeave") }}
              </h4>
              <div class="metric__stats">
                <div class="stat">
                  <span class="stat__label">
                    {{ $t("calculator.maternityStart") }}
                  </span>
                  <span class="stat__value">
                    {{ fmtDate(results.maternityStart) }}
                  </span>
                </div>
                <div class="stat">
                  <span class="stat__label">
                    {{ $t("calculator.maternityEnd") }}
                  </span>
                  <span class="stat__value">
                    {{ fmtDate(results.maternityEnd) }}
                  </span>
                </div>
              </div>
              <p class="metric__meta">{{ $t("calculator.maternityInfo") }}</p>
            </div>

            <div class="metric">
              <h4 class="metric__title">
                <i class="pi pi-user" aria-hidden="true" />
                {{ $t("calculator.paternityLeave") }}
              </h4>
              <div class="metric__stats">
                <div class="stat">
                  <span class="stat__label">
                    {{ $t("calculator.paternityDuration") }}
                  </span>
                  <span class="stat__value">
                    {{ results.paternityLeave }} {{ $t("calculator.days") }}
                  </span>
                </div>
              </div>
              <p class="metric__meta">{{ $t("calculator.paternityInfo") }}</p>
            </div>

            <div class="metric">
              <h4 class="metric__title">
                <i class="pi pi-users" aria-hidden="true" />
                {{ $t("calculator.parentalLeave") }}
              </h4>
              <div class="metric__stats">
                <div class="stat">
                  <span class="stat__label">
                    {{ $t("calculator.motherParental") }}
                  </span>
                  <span class="stat__value">
                    {{ results.motherParental }} {{ $t("calculator.days") }}
                  </span>
                </div>
                <div class="stat">
                  <span class="stat__label">
                    {{ $t("calculator.fatherParental") }}
                  </span>
                  <span class="stat__value">
                    {{ results.fatherParental }} {{ $t("calculator.days") }}
                  </span>
                </div>
                <div v-if="results.extensionDays" class="stat">
                  <span class="stat__label">
                    {{ $t("calculator.parentalCombined") }}
                  </span>
                  <span class="stat__value stat__value--accent">
                    {{ results.parentalCombinedTotal }}
                    {{ $t("calculator.days") }}
                  </span>
                </div>
              </div>
              <p v-if="results.extensionDays" class="metric__meta">
                {{
                  $t("calculator.parentalCombinedInfo", {
                    base: results.parentalBaseTotal,
                    ext: results.extensionDays,
                  })
                }}
              </p>
            </div>

            <div class="metric">
              <h4 class="metric__title">
                <i class="pi pi-plus-circle" aria-hidden="true" />
                {{ $t("calculator.extensions") }}
              </h4>
              <ul v-if="results.extensions.length" class="metric__list">
                <li v-for="(ext, i) in results.extensions" :key="i">
                  {{ $t(ext.key, ext.params) }}
                </li>
              </ul>
              <p v-else class="metric__meta">{{ $t("calculator.extNone") }}</p>
              <p v-if="results.extensionDays" class="metric__meta">
                {{ $t("calculator.extTotal", { days: results.extensionDays }) }}
              </p>
            </div>
          </div>

          <div class="timeline-section">
            <h4 class="metric__title">
              <i class="pi pi-clock" aria-hidden="true" />
              {{ $t("calculator.timeline") }}
            </h4>
            <PrimeTimeline
              :value="results.timeline"
              :layout="timelineLayout"
              :align="timelineAlign"
              class="leave-timeline"
            >
              <template #marker="slotProps">
                <span
                  class="timeline-marker"
                  :class="`timeline-marker--${slotProps.item.parent}`"
                >
                  <i :class="slotProps.item.icon" aria-hidden="true" />
                  <span class="sr-only">
                    {{ $t(`calculator.markers.${slotProps.item.parent}`) }}
                  </span>
                </span>
              </template>
              <template #opposite="slotProps">
                <small class="timeline-date">
                  {{ fmtDate(slotProps.item.date) }}
                </small>
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
          </div>
        </template>

        <div v-else class="placeholder-inner">
          <i class="pi pi-calculator" aria-hidden="true" />
          <p>{{ $t("calculator.resultsPlaceholder") }}</p>
        </div>
      </template>
    </PrimeCard>
  </div>
</template>

<script>
import {
  calculateLeave as computeLeave,
  addDays,
  MS_PER_DAY,
  MATERNITY_LEAD_DAYS,
  PARENTAL_TOTAL,
  PARENTAL_PER_PARENT_CAP,
  PARENTAL_PER_PARENT_MIN,
  PARENTAL_DEFAULT,
} from "../lib/leaveCalculator";

export default {
  name: "MaternityLeaveCalculator",
  data() {
    return {
      edd: null,
      birthDate: null,
      newbornsCount: 1,
      existingKidsUnder8: 0,
      specialNeeds: false,
      motherParental: PARENTAL_DEFAULT,
      results: null,
      isWide: false,
      PARENTAL_TOTAL,
      PARENTAL_PER_PARENT_CAP,
      PARENTAL_PER_PARENT_MIN,
      PARENTAL_DEFAULT,
    };
  },
  computed: {
    fatherParental() {
      return PARENTAL_TOTAL - this.motherParental;
    },
    timelineLayout() {
      // Horizontal on the desktop dashboard (keeps results short, avoids scroll),
      // vertical when stacked on mobile.
      return this.isWide ? "horizontal" : "vertical";
    },
    timelineAlign() {
      // Non-alternate horizontally so the connector line stays on one straight
      // line; alternate reads fine in the vertical (mobile) layout.
      return this.isWide ? "top" : "alternate";
    },
    birthMinDate() {
      // Allow markedly premature births (up to ~10 weeks before the EDD).
      return this.edd ? addDays(new Date(this.edd), -70) : null;
    },
    birthMaxDate() {
      // A birth more than 4 weeks after the EDD is implausible.
      return this.edd ? addDays(new Date(this.edd), MATERNITY_LEAD_DAYS) : null;
    },
  },
  watch: {
    edd() {
      // Drop a previously chosen birth date that no longer fits the new EDD.
      if (!this.birthDate) return;
      const birth = new Date(this.birthDate);
      if (
        (this.birthMinDate && birth < this.birthMinDate) ||
        (this.birthMaxDate && birth > this.birthMaxDate)
      ) {
        this.birthDate = null;
      }
    },
  },
  mounted() {
    if (typeof window !== "undefined" && window.matchMedia) {
      this._mq = window.matchMedia("(min-width: 1200px)");
      this.isWide = this._mq.matches;
      this._mqHandler = (e) => {
        this.isWide = e.matches;
      };
      this._mq.addEventListener("change", this._mqHandler);
    }
  },
  beforeUnmount() {
    if (this._mq && this._mqHandler) {
      this._mq.removeEventListener("change", this._mqHandler);
    }
  },
  methods: {
    fmtDate(date) {
      if (!date) return "";
      return new Date(date).toLocaleDateString(this.$i18n.locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    showError(detailKey) {
      this.$toast.add({
        severity: "error",
        summary: this.$t("calculator.errorTitle"),
        detail: this.$t(detailKey),
        life: 4000,
      });
    },
    resetParental() {
      this.motherParental = PARENTAL_DEFAULT;
    },
    resetAll() {
      this.edd = null;
      this.birthDate = null;
      this.newbornsCount = 1;
      this.existingKidsUnder8 = 0;
      this.specialNeeds = false;
      this.motherParental = PARENTAL_DEFAULT;
      this.results = null;
    },
    calculateLeave() {
      if (!this.edd) {
        this.showError("calculator.errorEDD");
        return;
      }
      if (this.birthDate) {
        const daysAfterEdd =
          (new Date(this.birthDate) - new Date(this.edd)) / MS_PER_DAY;
        if (daysAfterEdd > MATERNITY_LEAD_DAYS) {
          this.showError("calculator.errorBirthAfterEDD");
          return;
        }
      }

      this.results = computeLeave({
        edd: this.edd,
        birthDate: this.birthDate,
        newbornsCount: this.newbornsCount,
        existingKidsUnder8: this.existingKidsUnder8,
        specialNeeds: this.specialNeeds,
        motherParental: this.motherParental,
      });

      this.$nextTick(() => {
        const el = this.$refs.results;
        (el?.$el ?? el)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    },
  },
};
</script>

<style scoped>
/* Mobile-first: form then results, stacked in one column. */
.calc-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  align-items: start;
}

.calc-card {
  margin: 0;
  min-width: 0;
}

.card-title {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--p-primary-color);
}

/* Desktop: dashboard split - form on the left, results on the right. */
@media (min-width: 1200px) {
  .calc-layout {
    grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
    align-items: stretch;
    min-height: calc(100vh - 3rem);
  }

  /* Both cards fill the available height. */
  .calc-card :deep(.p-card-body) {
    height: 100%;
  }

  .calc-results-card :deep(.p-card-content) {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .placeholder-inner {
    flex: 1;
  }
}

/* ---- Form sections (plain titles instead of fieldsets) ---- */
.form-section {
  margin-bottom: 1.75rem;
}

.form-section-title {
  margin: 0 0 1rem;
  font-size: 1.05rem;
  font-weight: 700;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--p-surface-200);
}

.calc-disclaimer {
  margin-bottom: 1.5rem;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
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

.field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  min-width: 0;
}

.field-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--p-text-muted-color);
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
  gap: 0.5rem;
  margin-bottom: 0;
}

/* ---- Result metrics (sub-sections inside the single results card) ---- */
.metric-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  align-items: stretch;
}

.metric {
  background: var(--p-surface-50);
  border: 1px solid var(--p-surface-200);
  border-radius: 10px;
  padding: 1rem 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.metric__title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  font-size: 1rem;
  color: var(--p-primary-color);
}

.metric__stats {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.stat__label {
  font-size: 0.8rem;
  color: var(--p-text-muted-color);
}

.stat__value {
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--p-text-color);
}

.stat__value--accent {
  color: var(--p-primary-color);
}

.metric__meta {
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.45;
  color: var(--p-text-muted-color);
}

.metric__list {
  margin: 0;
  padding-left: 1.1rem;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

/* ---- Timeline ---- */
.timeline-section {
  margin-top: 1.75rem;
}

.leave-timeline {
  margin-top: 1rem;
}

/* Horizontal, single-line timeline on the desktop dashboard. */
@media (min-width: 1200px) {
  .leave-timeline {
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }

  .leave-timeline :deep(.p-timeline-event) {
    flex: 1;
    min-width: 9.5rem;
  }

  /*
   * Don't let the two sides absorb the row's stretch space (flex: 1 would push
   * each marker down by a different amount). Pin the date row to a fixed height
   * so every marker sits at the same offset -> one straight connector line.
   */
  .leave-timeline :deep(.p-timeline-event-opposite) {
    flex: 0 0 auto;
    min-height: 1.75rem;
    padding: 0 0.85rem;
    text-align: left;
  }

  .leave-timeline :deep(.p-timeline-event-content) {
    flex: 0 0 auto;
    padding: 0.5rem 0.85rem 0;
    text-align: left;
  }

  .leave-timeline .timeline-content {
    align-items: flex-start;
  }
}

.timeline-marker {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 2rem;
  height: 2rem;
  min-width: 2rem;
  min-height: 2rem;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  color: #fff;
  box-shadow: 0 0 0 4px var(--p-surface-0);
}

/* Safety net in case PrimeVue keeps a marker wrapper around the slot. */
.leave-timeline :deep(.p-timeline-event-marker) {
  border-radius: 50%;
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

/* ---- Results placeholder (before calculating) ---- */
.placeholder-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  text-align: center;
  color: var(--p-text-muted-color);
  padding: 3rem 1.5rem;
  min-height: 260px;
}

.placeholder-inner i {
  font-size: 2.5rem;
  opacity: 0.45;
}

.placeholder-inner p {
  margin: 0;
  max-width: 28ch;
}

@media (max-width: 640px) {
  .leave-timeline :deep(.p-timeline) {
    align-items: flex-start;
  }
}
</style>
