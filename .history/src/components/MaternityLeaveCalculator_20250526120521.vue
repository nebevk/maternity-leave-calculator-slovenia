<template>
  <PrimeCard class="maternity-calculator">
    <template #title>
      <h2>{{ $t("appName") }}</h2>
    </template>
    <template #content>
      <div class="p-fluid">
        <!-- Expected Due Date -->
        <div class="field">
          <label for="edd">{{ $t("calculator.edd") }}</label>
          <PrimeDatePicker
            v-model="edd"
            dateFormat="dd/mm/yy"
            :showIcon="true"
            placeholder="{{$t('calculator.selectEDD')}}"
          />
        </div>
        <!-- Actual Birth Date (optional) -->
        <div class="field">
          <label for="birthDate">{{ $t("calculator.birthDate") }}</label>
          <PrimeDatePicker
            v-model="birthDate"
            dateFormat="dd/mm/yy"
            :showIcon="true"
            placeholder="{{$t('calculator.selectBirthDate')}}"
          />
        </div>
        <PrimeDivider />
        <!-- Multiple children, twins, special needs -->
        <div class="field">
          <label>{{ $t("calculator.childrenCount") }}</label>
          <PrimeInputNumber v-model="childrenCount" :min="1" :max="10" />
        </div>
        <div class="field">
          <PrimeCheckbox v-model="isTwins" :binary="true" inputId="twins" />
          <label for="twins" class="ml-2">{{ $t("calculator.twins") }}</label>
        </div>
        <div class="field">
          <PrimeCheckbox
            v-model="specialNeeds"
            :binary="true"
            inputId="specialNeeds"
          />
          <label for="specialNeeds" class="ml-2">{{
            $t("calculator.specialNeeds")
          }}</label>
        </div>
        <PrimeDivider />
        <!-- Parental leave allocation -->
        <div class="field">
          <PrimeTag severity="info" class="mb-2">{{
            $t("calculator.parentalInfo")
          }}</PrimeTag>
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">{{
              $t("calculator.motherParental")
            }}</span>
            <PrimeInputNumber v-model="motherParental" :min="60" :max="260" />
            <span class="p-inputgroup-addon">{{ $t("calculator.days") }}</span>
          </div>
          <div class="p-inputgroup mt-2">
            <span class="p-inputgroup-addon">{{
              $t("calculator.fatherParental")
            }}</span>
            <PrimeInputNumber v-model="fatherParental" :min="60" :max="260" />
            <span class="p-inputgroup-addon">{{ $t("calculator.days") }}</span>
          </div>
        </div>
        <PrimeDivider />
        <PrimeButton
          label="{{$t('calculator.calculate')}}"
          @click="calculateLeave"
          class="p-button-primary"
        />
        <PrimeDivider />
        <PrimePanel
          v-if="results"
          header="{{$t('calculator.results')}}"
          class="mt-4"
        >
          <div class="results">
            <PrimeTag severity="info" class="mb-2">{{
              $t("calculator.maternityInfo")
            }}</PrimeTag>
            <p>
              <strong>{{ $t("calculator.maternityStart") }}:</strong>
              {{ results.maternityStart }}
            </p>
            <p>
              <strong>{{ $t("calculator.maternityEnd") }}:</strong>
              {{ results.maternityEnd }}
            </p>
            <PrimeTag severity="info" class="mb-2">{{
              $t("calculator.paternityInfo")
            }}</PrimeTag>
            <p>
              <strong>{{ $t("calculator.paternityDuration") }}:</strong>
              {{ results.paternityLeave }} {{ $t("calculator.days") }}
            </p>
            <PrimeTag severity="info" class="mb-2">{{
              $t("calculator.parentalInfo")
            }}</PrimeTag>
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
import PrimeCheckbox from "primevue/checkbox";
import PrimeTag from "primevue/tag";

export default {
  name: "MaternityLeaveCalculator",
  components: { PrimeCheckbox, PrimeTag },
  data() {
    return {
      edd: null,
      birthDate: null,
      childrenCount: 1,
      isTwins: false,
      specialNeeds: false,
      motherParental: 160,
      fatherParental: 160,
      results: null,
    };
  },
  methods: {
    calculateLeave() {
      if (!this.edd) {
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: this.$t("calculator.selectEDD"),
          life: 3000,
        });
        return;
      }
      // Maternity leave logic
      let maternityStart = new Date(this.edd);
      maternityStart.setDate(maternityStart.getDate() - 28);
      let maternityEnd;
      if (this.birthDate && new Date(this.birthDate) < maternityStart) {
        maternityStart = new Date(this.birthDate);
        maternityEnd = new Date(maternityStart);
        maternityEnd.setDate(maternityStart.getDate() + 105);
      } else {
        maternityEnd = new Date(maternityStart);
        maternityEnd.setDate(maternityStart.getDate() + 105);
      }
      // Paternity leave logic
      let paternityLeave = 15;
      if (this.isTwins) paternityLeave += 10;
      if (this.childrenCount > 1)
        paternityLeave += (this.childrenCount - 1) * 10;
      // Parental leave allocation
      let motherParental = this.motherParental;
      let fatherParental = this.fatherParental;
      // Extensions
      let extensions = [];
      if (this.specialNeeds)
        extensions.push(this.$t("calculator.extSpecialNeeds"));
      if (this.isTwins) extensions.push(this.$t("calculator.extTwins"));
      if (this.childrenCount === 2)
        extensions.push(this.$t("calculator.ext2kids"));
      if (this.childrenCount === 3)
        extensions.push(this.$t("calculator.ext3kids"));
      if (this.childrenCount >= 4)
        extensions.push(this.$t("calculator.ext4kids"));
      // Format dates
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
        motherParental,
        fatherParental,
        extensions: extensions.join(", "),
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
