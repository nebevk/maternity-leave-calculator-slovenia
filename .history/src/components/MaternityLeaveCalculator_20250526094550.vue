<template>
  <PrimeCard class="maternity-calculator">
    <template #title>
      <h2>Maternity Leave Calculator - Slovenia</h2>
    </template>
    <template #content>
      <div class="p-fluid">
        <div class="field">
          <label for="startDate">Start Date of Maternity Leave</label>
          <PrimeCalendar
            v-model="startDate"
            dateFormat="dd/mm/yy"
            :showIcon="true"
            :minDate="new Date()"
            placeholder="Select start date"
          />
        </div>

        <PrimeDivider />

        <div class="field">
          <label>Mother's Leave Duration</label>
          <div class="p-inputgroup">
            <PrimeInputNumber
              v-model="motherLeaveDays"
              :min="0"
              :max="365"
              :step="1"
              suffix=" days"
            />
            <span class="p-inputgroup-addon"> (Standard: 105 days) </span>
          </div>
        </div>

        <div class="field">
          <label>Father's Leave Duration</label>
          <div class="p-inputgroup">
            <PrimeInputNumber
              v-model="fatherLeaveDays"
              :min="0"
              :max="90"
              :step="1"
              suffix=" days"
            />
            <span class="p-inputgroup-addon"> (Standard: 30 days) </span>
          </div>
        </div>

        <div class="field">
          <label>Mixed Parent Leave Duration</label>
          <div class="p-inputgroup">
            <PrimeInputNumber
              v-model="mixedLeaveDays"
              :min="0"
              :max="130"
              :step="1"
              suffix=" days"
            />
            <span class="p-inputgroup-addon"> (Standard: 130 days) </span>
          </div>
        </div>

        <PrimeButton
          label="Calculate End Date"
          @click="calculateEndDate"
          class="p-button-primary"
        />

        <PrimeDivider />

        <PrimePanel v-if="endDate" header="Results" class="mt-4">
          <div class="results">
            <p><strong>Total Leave Duration:</strong> {{ totalDays }} days</p>
            <p><strong>End Date:</strong> {{ formattedEndDate }}</p>
            <p><strong>Breakdown:</strong></p>
            <ul>
              <li>Mother's Leave: {{ motherLeaveDays }} days</li>
              <li>Father's Leave: {{ fatherLeaveDays }} days</li>
              <li>Mixed Parent Leave: {{ mixedLeaveDays }} days</li>
            </ul>
          </div>
        </PrimePanel>
      </div>
    </template>
  </PrimeCard>
</template>

<script>
export default {
  name: "MaternityLeaveCalculator",
  data() {
    return {
      startDate: null,
      motherLeaveDays: 105,
      fatherLeaveDays: 30,
      mixedLeaveDays: 130,
      endDate: null,
    };
  },
  computed: {
    totalDays() {
      return this.motherLeaveDays + this.fatherLeaveDays + this.mixedLeaveDays;
    },
    formattedEndDate() {
      if (!this.endDate) return "";
      return this.endDate.toLocaleDateString("sl-SI", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
  methods: {
    calculateEndDate() {
      if (!this.startDate) {
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Please select a start date",
          life: 3000,
        });
        return;
      }

      const endDate = new Date(this.startDate);
      endDate.setDate(endDate.getDate() + this.totalDays);
      this.endDate = endDate;
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

.results ul {
  list-style-type: none;
  padding-left: 0;
}

.results li {
  margin: 0.5rem 0;
}

.p-inputgroup-addon {
  background-color: var(--surface-ground);
  color: var(--text-color-secondary);
  font-size: 0.875rem;
}
</style>
