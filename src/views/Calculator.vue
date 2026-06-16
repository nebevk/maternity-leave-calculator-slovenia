<template>
  <div class="calculator">
    <MaternityLeaveCalculator />
  </div>
</template>

<script>
import MaternityLeaveCalculator from "../components/MaternityLeaveCalculator.vue";

export default {
  name: "CalculatorView",
  components: {
    MaternityLeaveCalculator,
  },
};
</script>

<style scoped>
.calculator {
  max-width: none;
  margin: 0;
  padding: 1.5rem 2rem;
}

@media (max-width: 640px) {
  .calculator {
    padding: 1rem;
  }
}
</style>
