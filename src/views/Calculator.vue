<template>
  <div class="calculator">
    <Card>
      <template #title>
        <div class="flex align-items-center justify-content-between">
          Calculator
          <Button icon="pi pi-refresh" @click="clearAll" />
        </div>
      </template>
      <template #content>
        <div class="calculator-grid">
          <InputText v-model="display" readonly class="col-12 mb-3" />
          <div class="grid">
            <Button
              v-for="n in ['7', '8', '9', '+']"
              :key="n"
              @click="appendValue(n)"
              class="col-3 p-button-outlined"
            >
              {{ n }}
            </Button>
            <Button
              v-for="n in ['4', '5', '6', '-']"
              :key="n"
              @click="appendValue(n)"
              class="col-3 p-button-outlined"
            >
              {{ n }}
            </Button>
            <Button
              v-for="n in ['1', '2', '3', '*']"
              :key="n"
              @click="appendValue(n)"
              class="col-3 p-button-outlined"
            >
              {{ n }}
            </Button>
            <Button
              v-for="n in ['0', '.', '=', '/']"
              :key="n"
              @click="n === '=' ? calculate() : appendValue(n)"
              class="col-3 p-button-outlined"
            >
              {{ n }}
            </Button>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
export default {
  name: "CalculatorView",
  data() {
    return {
      display: "",
    };
  },
  methods: {
    appendValue(value) {
      this.display += value;
    },
    clearAll() {
      this.display = "";
    },
    calculate() {
      try {
        this.display = eval(this.display).toString();
      } catch (e) {
        this.display = "Error";
      }
    },
  },
};
</script>

<style scoped>
.calculator {
  padding: 2rem;
  max-width: 400px;
  margin: 0 auto;
}

.calculator-grid {
  width: 100%;
}

.calculator-grid :deep(.p-inputtext) {
  text-align: right;
  font-size: 1.5rem;
}

.calculator-grid .p-button {
  margin: 0.2rem;
  height: 3rem;
}
</style>
