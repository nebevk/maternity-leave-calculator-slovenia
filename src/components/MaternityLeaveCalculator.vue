<template>
  <PrimeCard class="maternity-calculator">
    <template #title>
      <h2>{{ $t("appName") }}</h2>
    </template>
    <template #content>
      <div class="p-fluid">
        <div class="field">
          <label for="edd">{{ $t("calculator.edd") }}</label>
          <PrimeDatePicker
            v-model="edd"
            inputId="edd"
            dateFormat="dd/mm/yy"
            :showIcon="true"
            :placeholder="$t('calculator.selectEDD')"
            class="mb-3"
          />
        </div>
        <div class="field">
          <label for="birthDate">{{ $t("calculator.birthDate") }}</label>
          <PrimeDatePicker
            v-model="birthDate"
            inputId="birthDate"
            dateFormat="dd/mm/yy"
            :showIcon="true"
            :placeholder="$t('calculator.selectBirthDate')"
            class="mb-3"
          />
        </div>
        <PrimeDivider />
        <div class="field">
          <label for="newbornsCount">
            {{ $t("calculator.newbornsCount") }}
          </label>
          <PrimeInputNumber
            v-model="newbornsCount"
            inputId="newbornsCount"
            :min="1"
            :max="10"
            class="mb-3"
          />
        </div>
        <div class="field">
          <label for="existingKidsUnder8">
            {{ $t("calculator.existingKidsUnder8") }}
          </label>
          <PrimeInputNumber
            v-model="existingKidsUnder8"
            inputId="existingKidsUnder8"
            :min="0"
            :max="10"
            class="mb-3"
          />
        </div>
        <div class="field flex align-items-center mb-3">
          <PrimeCheckbox
            v-model="specialNeeds"
            :binary="true"
            inputId="specialNeeds"
          />
          <label for="specialNeeds" class="ml-2">
            {{ $t("calculator.specialNeeds") }}
          </label>
        </div>
        <PrimeDivider />
        <div class="field">
          <PrimeTag severity="info" class="mb-2">
            {{ $t("calculator.parentalInfo") }}
          </PrimeTag>
          <div class="p-inputgroup mb-2">
            <span class="p-inputgroup-addon">
              {{ $t("calculator.motherParental") }}
            </span>
            <PrimeInputNumber
              v-model="motherParental"
              inputId="motherParental"
              :min="60"
              :max="260"
            />
            <span class="p-inputgroup-addon">{{ $t("calculator.days") }}</span>
          </div>
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              {{ $t("calculator.fatherParental") }}
            </span>
            <PrimeInputNumber
              v-model="fatherParental"
              inputId="fatherParental"
              :min="60"
              :max="260"
            />
            <span class="p-inputgroup-addon">{{ $t("calculator.days") }}</span>
          </div>
        </div>
        <PrimeDivider />
        <PrimeButton
          :label="$t('calculator.calculate')"
          @click="calculateLeave"
          class="p-button-primary mb-3"
        />
        <PrimeDivider />
        <PrimePanel
          v-if="results"
          :header="$t('calculator.results')"
          class="mt-4"
        >
          <div class="results">
            <PrimeTag severity="info" class="mb-2">
              {{ $t("calculator.maternityInfo") }}
            </PrimeTag>
            <p>
              <strong>{{ $t("calculator.maternityStart") }}:</strong>
              {{ results.maternityStart }}
            </p>
            <p>
              <strong>{{ $t("calculator.maternityEnd") }}:</strong>
              {{ results.maternityEnd }}
            </p>
            <PrimeTag severity="info" class="mb-2">
              {{ $t("calculator.paternityInfo") }}
            </PrimeTag>
            <p>
              <strong>{{ $t("calculator.paternityDuration") }}:</strong>
              {{ results.paternityLeave }} {{ $t("calculator.days") }}
            </p>
            <p>
              <strong>{{ $t("calculator.motherParental") }}:</strong>
              {{ motherParental }} {{ $t("calculator.days") }}
            </p>
            <p>
              <strong>{{ $t("calculator.fatherParental") }}:</strong>
              {{ fatherParental }} {{ $t("calculator.days") }}
            </p>
            <p>
              <strong>{{ $t("calculator.extensions") }}:</strong>
              {{ results.extensions }}
            </p>
          </div>
        </PrimePanel>
      </div>
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
      fatherParental: 160,
      results: null,
    };
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
      const total = this.motherParental + this.fatherParental;
      if (total !== PARENTAL_TOTAL) {
        this.showError("calculator.errorParentalTotal");
        return;
      }
      if (
        this.motherParental > PARENTAL_PER_PARENT_CAP ||
        this.fatherParental > PARENTAL_PER_PARENT_CAP
      ) {
        this.showError("calculator.errorParentalCap");
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

      this.results = {
        maternityStart: format(maternityStart),
        maternityEnd: format(maternityEnd),
        paternityLeave,
        extensions: extensions.length
          ? extensions.join(", ")
          : this.$t("calculator.extNone"),
      };
    },
  },
};
</script>

<style scoped>
.maternity-calculator {
  max-width: 800px;
  margin: 2rem auto;
}

.field {
  margin-bottom: 1.5rem;
}

.field label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.results {
  padding: 1rem;
}

.p-inputgroup-addon {
  background-color: var(--surface-ground);
  color: var(--text-color-secondary);
  font-size: 0.875rem;
}

.mb-2 {
  margin-bottom: 0.75rem;
}

.mb-3 {
  margin-bottom: 1.5rem;
}
</style>
