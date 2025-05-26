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
  max-width: 900px;
  margin: 0 auto;
}
</style>
